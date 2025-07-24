import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { login, register } from "../controllers/login_controller.js";
import {
  validatename,
  validateEmail,
  validatePassword,
} from "../middlewares/login_variebales_middleware.js";

const trouter = Router();

trouter.post(
  "/register",
  validatename,
  validateEmail,
  validatePassword,
  register
);

trouter.post("/login", validateEmail, validatePassword, login);

trouter.get("/profile", verifyToken, async (req, res) => {
  try {
    //
    res.status(200).json(req.user);
    //
  } catch (error) {
    //
    res.status(500).send("Error fetching profile data");
    //
  }
});

trouter.get("/admin/dashboard", verifyToken, verifyAdmin, (req, res) => {
  res.send("Welcome to Admin Dashboard");
});

export default trouter;
