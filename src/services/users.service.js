import { getUsersDao } from "../dao/factory.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Users = getUsersDao();
const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;

const registerUser = async ({
  first_name,
  last_name,
  email,
  password,
  age,
}) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return await Users.createUser({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    age,
  });
};

const loginUser = async ({ email, password }) => {
  const user = await Users.getUserByEmail(email);
  if (!user) throw new Error("Invalid email or password");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error("Invalid email or password");

  return jwt.sign({ email: user.email, role: user.role }, secretKey, {
    expiresIn: "1h",
  });
};

const getCurrentUser = async (userData) => {
  return userData;
};

const usersService = {
  registerUser,
  loginUser,
  getCurrentUser,
};

export default usersService;
