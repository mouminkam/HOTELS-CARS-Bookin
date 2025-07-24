import express from "express";
import {
  getAllBookings,
  getBookingsByUserId,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

import {
  getAllCarBookings,
  getCarBookingsByUserId,
  getCarBookingById,
  createCarBooking,
  updateCarBooking,
  deleteCarBooking,
} from "../controllers/carBookingController.js";

const BookingRouter = express.Router();

/* ========== HOTEL BOOKINGS ========== */
BookingRouter.get("/hotel/all", getAllBookings);
BookingRouter.get("/hotel/byUser/:id", getBookingsByUserId);
BookingRouter.get("/hotel/byId/:id", getBookingById);
BookingRouter.post("/hotel/new", createBooking);
BookingRouter.patch("/hotel/update/:id", updateBooking);
BookingRouter.delete("/hotel/delete/:id", deleteBooking);

/* ========== CAR BOOKINGS ========== */
BookingRouter.get("/car/all", getAllCarBookings);
BookingRouter.get("/car/byUser/:id", getCarBookingsByUserId);
BookingRouter.get("/car/byId/:id", getCarBookingById);
BookingRouter.post("/car/new", createCarBooking);
BookingRouter.patch("/car/update/:id", updateCarBooking);
BookingRouter.delete("/car/delete/:id", deleteCarBooking);

export default BookingRouter;
