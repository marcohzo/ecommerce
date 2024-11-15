import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../dao/mongo/models/user.model.js";

const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;

export const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      age: req.body.age,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ email: user.email, role: user.role }, secretKey, {
      expiresIn: "1h",
    });
    res.cookie("authToken", token, { httpOnly: true });
    res.redirect("/current");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCurrentUser = (req, res) => {
  res.render("current", {
    message: "User authenticated",
    user: req.user,
  });
};
