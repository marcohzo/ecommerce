import {
  initializeDaosAndRepositories,
  UserDao,
  ProductDao,
  CartDao,
  TicketDao,
} from "../dao/factory.js";
import UserRepository from "./users/user.repository.js";
import ProductRepository from "./products/product.repository.js";
import CartRepository from "./carts/cart.repository.js";
import TicketRepository from "./tickets/ticket.repository.js";

await initializeDaosAndRepositories();

export const usersService = new UserRepository(UserDao);
export const productsService = new ProductRepository(ProductDao);
export const cartsService = new CartRepository(CartDao);
export const ticketsService = new TicketRepository(TicketDao);
