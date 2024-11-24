import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let UserDao;
let ProductDao;
let CartDao;

const entorno = (process.env.PERSISTENCE || "MONGO").toUpperCase().trim();
const MONGODB = process.env.MONGODB_URI;

const initializeDaosAndRepositories = async () => {
  console.log(`Initializing DAOs and Repositories for ${entorno}...`);
  switch (entorno) {
    case "MONGO":
      try {
        await mongoose.connect(MONGODB);
        console.log("Connected to MongoDB.");
        const { default: UsersMongo } = await import("./mongo/users.mongo.js");
        UserDao = UsersMongo;
        // Productos
        const { default: ProductsMongo } = await import(
          "./mongo/products.mongo.js"
        );
        ProductDao = ProductsMongo;
        // Carrito
        const { default: CartMongo } = await import("./mongo/carts.mongo.js");
        CartDao = CartMongo;
      } catch (error) {
        console.error(
          "Error initializing DAOs and Repositories for MongoDB:",
          error
        );
        throw error;
      }
      break;

    case "MEMORY":
      try {
        // Usuarios
        const { default: UsersMemory } = await import(
          "./memory/users.memory.js"
        );
        UserDao = UsersMemory;

        // Productos
        const { default: ProductsMemory } = await import(
          "./memory/products.memory.js"
        );
        ProductDao = ProductsMemory;

        // Carrito
        const { default: CartMemory } = await import(
          "./memory/carts.memory.js"
        );
        CartDao = CartMemory;
      } catch (error) {
        console.error(
          "Error initializing DAOs and Repositories for Memory:",
          error
        );
        throw error;
      }
      break;

    default:
      throw new Error(`Persistence option '${entorno}' is not supported`);
  }
};

export { initializeDaosAndRepositories, UserDao, ProductDao, CartDao };
