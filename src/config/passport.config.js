import passport from "passport";
import local from "passport-local";
import { getDaoUsers } from "../daos/users/users.dao.js"
import { isValidPassword } from "../utils/hashing.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        console.log(`Attempting to log in with email: ${username}`); // Log de intento de inicio de sesión
        try {
          const usersDao = getDaoUsers();
          const user = await usersDao.readOne({ email: username });
          console.log("User found by email:", user); // Log del usuario encontrado

          if (!user) {
            console.log("User does not exist for email:", username);
            return done(null, false, { message: "User does not exist" });
          }

          if (!isValidPassword(password, user.password)) {
            console.log("Invalid password for user:", username);
            return done(null, false, { message: "Invalid password" });
          }

          console.log("Login successful for user:", username);
          return done(null, user);
        } catch (error) {
          console.error("Error during login process:", error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("serializing started user:",user)
    // @ts-ignore
    console.log(`Serializing user: ${user._id}`);
    // @ts-ignore
    done(null, user._id)
  });

  passport.deserializeUser(async (id, done) => {
    console.log(`Deserializing user with ID: ${id}`);
    try {
      const usersDao = getDaoUsers();
      const user = await usersDao.readOne({ _id: id });
      console.log("User found by ID during deserialization:", user);
      done(null, user);
    } catch (error) {
      console.error("Error during deserialization:", error);
      done(error);
    }
  });
};

export default initializePassport;
