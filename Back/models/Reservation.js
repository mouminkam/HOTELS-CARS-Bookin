// models/Reservation.js
import mongoose from "mongoose";
import Car from "./Car.js";

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      default: null,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
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
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// 🔹 حساب عدد الليالي
reservationSchema.virtual("nights").get(function () {
  if (!this.checkIn || !this.checkOut) return 0;
  const diff = this.checkOut.getTime() - this.checkIn.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// 🔹 حساب السعر الإجمالي
reservationSchema.methods.calculateTotal = async function (hotelPrice) {
  let carPrice = 0;
  if (this.car) {
    const carDoc = await Car.findById(this.car);
    if (carDoc?.price) carPrice = carDoc.price;
  }

  return hotelPrice * this.nights * this.guests + this.taxes + carPrice;
};

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", reservationSchema);

export default Reservation;

// import mongoose from "mongoose";
// import Car from './Car.js';

// const reservationSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     hotel: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Hotel",
//       required: true,
//     },
//     car: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Car",
//       default: null,
//     },
//     guests: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 10,
//     },
//     checkIn: {
//       type: Date,
//       required: true,
//     },
//     checkOut: {
//       type: Date,
//       required: true,
//     },
//     taxes: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     total: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     bookedAt: {
//       type: Date,
//       default: Date.now,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
// );

// //  calculating nights
// reservationSchema.virtual("nights").get(function () {
//   if (!this.checkIn || !this.checkOut) return 0;
//   const diff = this.checkOut.getTime() - this.checkIn.getTime();
//   const night = Math.ceil(diff / (1000 * 60 * 60 * 24));
//   return night;
// });

// reservationSchema.methods.calculateTotal = async function (hotelPrice) {
//   let carPrice = 0;
//   if (this.car) {
//     const carDoc = await Car.findById(this.car);
//     if (carDoc) carPrice = carDoc.price || 0;
//   }
//   return hotelPrice * this.nights * this.guests + this.taxes + carPrice;
// };

// const Reservation =
//   mongoose.models.Reservation ||
//   mongoose.model("Reservation", reservationSchema);
// export default Reservation;

/**postman
 * {
  "user": "662f8b97ddf9a742a7d1b999",
  "hotel": "662f8c74ed3fdd8136fa4333",
  "car": "662f8c95ed3fdd8136fa4341",
  "guests": 2,
  "checkIn": "2025-08-10",
  "checkOut": "2025-08-13",
  "taxes": 60,
  "total": 480,
  "status": "confirmed"
}
  {
  "user": "662f8b97ddf9a742a7d1b999",
  "hotel": "662f8d44ba8ac9c55f90b21a",
  "guests": 4,
  "checkIn": "2025-09-01",
  "checkOut": "2025-09-05",
  "taxes": 100,
  "total": 860,
  "status": "pending"
}
 */

// // backend/Models/Reservation.js
// import mongoose from 'mongoose';

// const reservationSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     hotel: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Hotel',
//       required: true
//     },
//     car: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Car',
//       default: null
//     },
//     guests: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 10
//     },
//     startDate: {
//       type: Date,
//       required: true
//     },
//     endDate: {
//       type: Date,
//       required: true
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'confirmed', 'cancelled'],
//       default: 'pending'
//     },
//     total: {
//       type: Number,
//       required: true,
//       min: 0
//     }
//   },
//   { timestamps: true }
// );

// const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);

// export default Reservation;
