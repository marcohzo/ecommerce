import "dotenv/config.js";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.cookies?.authToken;

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? "Token has expired"
        : "Token is invalid";
    return res.status(401).json({ error: message });
  }
};

export default authenticateJWT;
