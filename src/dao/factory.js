import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let UserDao;
/* let Product; */

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
        /*      const { default: ProductsMongo } = await import(
          "./mongo/products.mongo.js"
        );
        ProductDao = new ProductsMongo(); */
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
        /*   const { default: ProductsMemory } = await import(
          "./memory/products.memory.js"
        );
        ProductDao = new ProductsMemory(); */
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

export { initializeDaosAndRepositories, UserDao };
