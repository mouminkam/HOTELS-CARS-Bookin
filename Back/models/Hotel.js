// backend/Models/Hotel.js
import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    coordinates: {
      lat: { type: Number,  },
      lng: { type: Number, }
  },
    address: {
      type: String,
      trim: true
    },
    governorate: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['hotel', 'resort', 'apartment'],
      default: 'hotel'
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    images: {
      type: [String],
      default: []
    },
    amenities: {
      type: [String],
      default: []
    },
    services: {
      type: [String],
      default: []
    },
    taxes:{
      type: Number,
      min: 0
    } 
  },
  { timestamps: true }
);

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;

/**postman
 * {
  "name": "Ocean Breeze Resort",
  "description": "A luxurious beachfront resort with stunning views and premium services.",
  "location": "Latakia",
  "address": "123 Seaside Ave, Latakia",
  "governorate": "اللاذقية",
  "type": "resort",
  "price": 75000,
  "rating": 4.8,
  "images": [
    "https://example.com/images/resort1.jpg",
    "https://example.com/images/resort2.jpg"
  ],
  "amenities": ["Pool", "Spa", "Gym", "WiFi"],
  "services": ["Room Service", "Airport Shuttle", "Laundry"]
}
 */