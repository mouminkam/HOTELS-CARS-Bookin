// models/carReservation.js
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    PickupDate: {
      type: Date,
      required: true,
    },
    DropoffDate: {
      type: Date,
      required: true,
    },
    taxes: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// دالة لحساب المجموع تلقائيًا
reservationSchema.methods.calculateTotal = async function (carPrice) {
  const days =
    (new Date(this.DropoffDate) - new Date(this.PickupDate)) /
    (1000 * 60 * 60 * 24);
  const basePrice = carPrice * days;
  const total = basePrice + this.taxes;
  return total;
};

const CarReservation = mongoose.model("CarReservation", reservationSchema);
export default CarReservation;
