import {
  initializeDaosAndRepositories,
  UserDao,
  ProductDao,
} from "../dao/factory.js";
import UserRepository from "./users/user.repository.js";
import ProductRepository from "./products/product.repository.js";

await initializeDaosAndRepositories();
export const usersService = new UserRepository(new UserDao());
export const productsService = new ProductRepository(new ProductDao());
