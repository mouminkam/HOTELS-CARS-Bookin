import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Access Denied: No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const liveuser = await User.findById(decoded.id).select("-password");

    if (!liveuser) {
      return res.status(404).send("User not found");
    }

    req.user = liveuser;
    next();
  } catch (error) {
    return res.status(401).send("Invalid or expired token");
  }
};
