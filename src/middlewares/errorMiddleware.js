// errorMiddleware.js
import errorDictionary from "../utils/errorDictionary.js";

const errorMiddleware = (err, req, res, next) => {
  if (err.code && errorDictionary[err.code]) {
    const error = errorDictionary[err.code];
    res.status(error.statusCode).json({ error: error.message });
  } else {
    // Si el código de error no está en el diccionario, envía un error genérico
    res.status(500).json({ error: "An unexpected error occurred." });
  }
  next();
};

export default errorMiddleware;
