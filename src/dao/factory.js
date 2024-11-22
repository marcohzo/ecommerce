// factory.js

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let Users;

const entorno = (process.env.PERSISTENCE || "MONGO").toUpperCase().trim();
const MONGODB = process.env.MONGODB_URI;

const initializeUsers = async () => {
  switch (entorno) {
    case "MONGO":
      try {
        await mongoose.connect(MONGODB, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB.");

        const { default: UsersMongo } = await import("./mongo/users.mongo.js");
        Users = new UsersMongo();
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
      }
      break;

    case "MEMORY":
      const { default: UsersMemory } = await import("./memory/users.memory.js");
      Users = new UsersMemory();
      break;

    default:
      throw new Error(`Persistence option '${entorno}' is not supported`);
  }
};

const getUsersDao = () => {
  if (!Users) {
    throw new Error(
      "Users DAO not initialized. Please call initializeUsers() first."
    );
  }
  return Users;
};

export { initializeUsers, getUsersDao };
