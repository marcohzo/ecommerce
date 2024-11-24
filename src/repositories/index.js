import { initializeDaosAndRepositories, UserDao } from "../dao/factory.js";
import UserRepository from "./users/user.repository.js";

await initializeDaosAndRepositories();
export const usersService = new UserRepository(new UserDao());
