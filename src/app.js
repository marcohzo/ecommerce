import "dotenv/config.js";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "../src/config/passport.config.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import createUsersRouter from "./routes/users.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const MONGODB = process.env.MONGODB_URI;

// Configuración de handlebars
app.engine("hbs", engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", _dirname + "/views");

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Configurar sesión
app.use(
  session({
    store: MongoStore.create({ mongoUrl: MONGODB, ttl: 600 }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Inicializar Passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

const startServer = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGODB);
    console.log("Connected to MongoDB.");

    // Inicializar el router de usuarios
    const userRouter = await createUsersRouter();
    app.use("/", userRouter);

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Finaliza el proceso si ocurre un error crítico
  }
};

// Llama a la función de inicio
startServer();
