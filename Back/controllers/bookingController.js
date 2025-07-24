// backend/controllers/bookingController.js
// controllers/bookingController.js
import Reservation from "../models/Reservation.js";
import Hotel from "../models/Hotel.js";
import mongoose from "mongoose";
// Get all hotel bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Reservation.find()
      .populate("user", "fullname email")
      .populate("hotel", "name")
      .populate("car", "name");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get bookings by user ID
export const getBookingsByUserId = async (req, res) => {
  try {
    let userId = req.params.id.trim();
    console.log(userId);

    const bookings = await Reservation.find({ user: userId })
      .populate("hotel", "name")
      .populate("car", "name");

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: err.message });
  }
};

// Get single booking by booking ID
export const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Reservation.findById(bookingId)
      .populate("user", "fullname email")
      .populate("hotel", "name")
      .populate("car", "name");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching booking", error: err.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.body.hotel);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    const newBooking = new Reservation(req.body);
    newBooking.total = await newBooking.calculateTotal(hotel.price);

    const saved = await newBooking.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updated) return res.status(404).json({ message: "Booking not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting booking" });
  }
};

/****const BookingDetails = ({ bookingId }) => {
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`/api/bookings/${bookingId}`);
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    };
    fetchBooking();
  }, [bookingId]);
 */
