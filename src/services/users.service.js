import PrivatedUserDTO from "../dao/DTOs/user.dto.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { usersService } from "../repositories/index.js";

const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;

const registerUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  const newUser = await usersService.createUser({
    ...userData,
    password: hashedPassword,
  });
  return newUser;
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) throw new Error("Email and password are required");

  const user = await usersService.getUserByEmail(email);
  if (!user) throw new Error("Invalid email or password1");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error("Invalid email or password2");

  // Generar el token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secretKey,
    {
      expiresIn: "1h",
    }
  );

  return { token };
};

const getCurrentUser = async (userData) => {
  return new PrivatedUserDTO(userData);
};

const usersServices = {
  registerUser,
  loginUser,
  getCurrentUser,
};

export default usersServices;
