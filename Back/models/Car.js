import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    name:{  
     type: String,
     required: true,
     trim: true
    },

    type: { 
      type: String,
      required: true,
      trim: true },

    price: {
      type: Number,
      required: true, 
       min: 0 },

    rating: {
       type: Number,
        default: 0,
         min: 0,
          max: 5 },

    // reviews: {
    //    type: Number,
    //     default: 0 },

    description: { 
      type: String, 
      trim: true },

    location: { 
      type: String,
       trim: true },

    pickupLocation: { 
      type: String,
       trim: true },

    dropoffLocation: {
       type: String,
        trim: true },

    capacity: { 
      type: Number,
       required: true,
        min: 1 },

    // features: {
    //    type: [String],
    //     default: [] },

    images: { 
      type: [String],
       default: [] },

    // included: {
    //    type: [String], 
    //    default: [] },

    // requirements: { 
    //   type: [String], 
    //   default: [] },

    specifications: {
      seats: Number,
      transmission: String,
      fuelType: String,
      fuelEfficiency: String,
      engine: String,
      horsepower: Number,
      luggageCapacity: String,
      year: Number,
      color: String
    }
  },
  { timestamps: true }
);

const Car = mongoose.model('Car', carSchema);
export default Car;
/**test
 * {
  "name": "Tesla Model X",
  "type": "SUV",
  "price": 200,
  "rating": 4.9,
  "reviews": 120,
  "description": "Futuristic all-electric SUV with Falcon Wing doors, autopilot capabilities, and spacious interior. Ideal for eco-conscious luxury travelers.",
  "location": "Dubai, UAE",
  "pickupLocation": "Dubai International Airport, Terminal 1",
  "dropoffLocation": "Downtown Dubai",
  "capacity": 7,
  "features": ["electric", "autopilot", "bluetooth", "panoramicRoof", "heatedSeats", "touchscreen"],
  "images": [
    "https://example.com/images/modelx-front.jpg",
    "https://example.com/images/modelx-side.jpg",
    "https://example.com/images/modelx-interior.jpg"
  ],
  "included": [
    "Free Supercharging",
    "Roadside assistance",
    "GPS navigation",
    "Third-party insurance"
  ],
  "requirements": [
    "Valid driver’s license",
    "Credit card in renter's name",
    "Minimum age: 25 years"
  ],
  "specifications": {
    "seats": 7,
    "transmission": "Automatic",
    "fuelType": "Electric",
    "fuelEfficiency": "0L/100km (electric)",
    "engine": "Dual Motor AWD",
    "horsepower": 670,
    "luggageCapacity": "2 large + 2 medium bags",
    "year": 2024,
    "color": "Pearl White"
  }
}
 */



// backend/Models/Car.js
// import mongoose from 'mongoose';

// // const carSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     type: {
//       type: String,
//       enum: ['sedan', 'suv', 'van', 'luxury'],
//       default: 'sedan'
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0
//     },
//     capacity: {
//       type: Number,
//       required: true,
//       min: 1
//     },
//     rating: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 5
//     },
//     features: {
//       type: [String],
//       default: []
//     },
//     image: {
//       type: String,
//       required: true
//     }
//   },
//   { timestamps: true }
// );

// const Car = mongoose.model('Car', carSchema);
// export default Car;


/*postman
{
  "name": "Toyota Camry",
  "type": "sedan",
  "price": 25000,
  "capacity": 5,
  "rating": 4.5,
  "features": ["Bluetooth", "Navigation", "Heated seats"],
  "image": "https://example.com/images/camry.jpg"
}*/
