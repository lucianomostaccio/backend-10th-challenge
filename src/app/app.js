import express from "express";
import { webRouter } from "../routers/web/web.router.js";
import { apiRouter } from "../routers/api/api.router.js";
import { engine } from "express-handlebars";
// import cors from 'cors';
import { sessions } from "../middlewares/sessions.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import passport from "passport";
import initializePassport from "../config/passport.config.js";
import initializeGithubPassport from "../config/githubpassport.config.js";
import errorMiddleware from '../middlewares/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// @ts-ignore
export const app = express();

// handlebars engine & templates:
app.engine("handlebars", engine());
const appViewsPath = path.join(__dirname, "..", "views");
app.set("views", appViewsPath);

app.set("view engine", "handlebars");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "static"))); //specify static folder
app.use(sessions);
initializePassport();
initializeGithubPassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(errorMiddleware);
// app.use(cors())

// routers
app.use(cookieParser());
app.use("/", webRouter);
app.use("/api", apiRouter);
