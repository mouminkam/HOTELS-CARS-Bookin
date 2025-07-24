import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 


// LOG-IN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email doesn't exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: `Welcome ${user.fullname}`,
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



// register
export const register = async (req, res) => {
  try {
    const { fullname, email, phone, password, agreeToTerms } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      phone,
      password: hashedPassword,
      agreeToTerms
    });

    await newUser.save();
    return res.status(201).json({
      message: `Account created successfully. Welcome, ${newUser.fullname}!`,
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
