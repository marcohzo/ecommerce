import {
  initializeDaosAndRepositories,
  UserDao,
  ProductDao,
  CartDao,
} from "../dao/factory.js";
import UserRepository from "./users/user.repository.js";
import ProductRepository from "./products/product.repository.js";
import CartRepository from "./carts/cart.repository.js";

await initializeDaosAndRepositories();
export const usersService = new UserRepository(new UserDao());
export const productsService = new ProductRepository(new ProductDao());
export const cartsService = new CartRepository(new CartDao());
