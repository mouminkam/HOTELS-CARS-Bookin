import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import trouter from "./routes/login_route.js";
import hotelrouter from "./routes/hotelRoutes.js";
import BookingRouter from "./routes/bookingRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import CarRouter from "./routes/carRoutes.js";
import OverviewRouter from "./routes/OverViewRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", trouter);
app.use("/hotels", hotelrouter);
app.use("/booking", BookingRouter);
app.use("/user", UserRouter);
app.use("/car", CarRouter);
app.use("/overview", OverviewRouter);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
      // console.log("Database Info:", mongoose.connection)
      console.log("Connected to DB:", mongoose.connection.name);
    });
  })
  .catch((err) => {
    console.log("❌ Database Error:", err.message);
  });

app.get("/", (req, res) => {
  res.send("<h1>Welcome home</h1>");
});
