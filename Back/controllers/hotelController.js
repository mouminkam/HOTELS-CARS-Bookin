// backend/controllers/hotelController.js
import Hotel from '../models/Hotel.js';

// GET /api/hotels
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching hotels' });
  }
};

// GET /api/hotels/:id
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
      

    }
    console.log("Hotel ID received:", req.params.id);
    res.json(hotel);
  } catch (err) {
    console.error(err);
    console.log("Hotel ID received:", req.params.id);
    res.status(500).json({ message: 'Error fetching hotel' });
  }
};

// POST /api/hotels
export const createHotel = async (req, res) => {
  try { 

    const {
      name,
      description,
      location,
      address,
      governorate,
      type,
      price,
      rating,
      images,
      amenities,
      services
    } = req.body;
    
  const existingHotel = await Hotel.findOne({ name, location });
    
    if (existingHotel) {
      return res.status(400).json({ message: 'Hotel already exists with the same name and location.' });
    }

    const hotel = new Hotel({
      name,
      description,
      location,
      address,
      governorate,
      type,
      price,
      rating,
      images,
      amenities,
      services
    });

    const saved = await hotel.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating hotel'});
  }
};

// PATCH /api/hotels/:id
export const updateHotel = async (req, res) => {
  try {
    const updates = req.body;
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating hotel' });
  }
};

// DELETE /api/hotels/:id
export const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting hotel' });
  }
};
