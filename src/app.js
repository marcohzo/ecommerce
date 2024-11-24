// app.js

import "dotenv/config.js";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "../src/config/passport.config.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";

/* import productRouter from "./routes/product.routes.js"; */
/* import cartRouter from "./routes/cart.routes.js"; */
import { initializeDaosAndRepositories } from "./dao/factory.js";

const app = express();
const PORT = process.env.PORT || 3000;

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const SECRET_KEY = process.env.SECRET_KEY;

// Configurar sesión
const sessionConfig = {
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false,
};

// Aplicar el middleware de sesión
app.use(session(sessionConfig));

// Configuración de handlebars
app.engine("hbs", engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", _dirname + "/views");

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Función de inicio
const startServer = async () => {
  try {
    // Inicializar los DAOs y conectarse a la base de datos
    //await initializeDaosAndRepositories();

    /*  // Configurar sesión (después de que la conexión a MongoDB esté establecida)
    app.use(
      session({
        store: MongoStore.create({ mongoUrl: MONGODB, ttl: 600 }),
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: false,
      })
    ); */

    // Inicializar Passport
    initializePassport(passport);
    app.use(passport.initialize());
    app.use(passport.session());
    const route = await import("./routes/users.router.js");
    /* const productRouter = await import("./routes/product.routes.js");
    const cartRouter = await import("./routes/cart.routes.js"); */
    // Configurar las rutas
    app.use("/", route.default);
    /*   app.use("/products", productRouter.default);
    app.use("/cart", cartRouter.default); */

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

// Llama a la función de inicio
//startServer();
initializeDaosAndRepositories().then(() => {
  startServer();
});
