import CarReservation from "../models/carReservation.js";
import Car from "../models/Car.js";

// console.log("carBookingController loaded");

// Get all car bookings
export const getAllCarBookings = async (req, res) => {
  try {
    const bookings = await CarReservation.find()
      .populate("user", "fullname")
      .populate("car", "name type price images");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get car bookings by user ID
export const getCarBookingsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const bookings = await CarReservation.find({ user: userId }).populate(
      "car",
      "name type price images"
    ) .populate("user", "fullname");

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No car bookings found for this user" });
    }

    res.json(bookings);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching car bookings", error: err.message });
  }
};

// Get car booking by booking ID
export const getCarBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await CarReservation.findById(bookingId)
      .populate("user", "fullname")
      .populate("car", "name type price images");
    if (!booking) {
      return res.status(404).json({ message: "Car booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching car booking", error: err.message });
  }
};

// create booking

// export const createCarBooking = async (req, res) => {
//   try {
//     const car = await Car.findById(req.body.car);
//     if (!car) return res.status(404).json({ message: "Car not found" });

//     const newBooking = new CarReservation(req.body);
//     newBooking.total = await newBooking.calculateTotal(car.price);

//     const saved = await newBooking.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
//+++++
export const createCarBooking = async (req, res) => {
  try {
    const { carId, userId, startDate, endDate, taxes, totalPrice ,bookedAt} = req.body;

    if (!carId || !userId || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    const reservation = new CarReservation({
      user: userId,
      car: carId,
      PickupDate: startDate,
      DropoffDate: endDate,
      taxes,
      bookedAt,
      total: totalPrice,
      status: "pending",
    });
    
    await reservation.save();
    res.status(201).json({ message: "Booking created successfully", reservation });
    console.log(reservation);

  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateCarBooking = async (req, res) => {
  try {
    const updated = await CarReservation.findByIdAndUpdate(
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

export const deleteCarBooking = async (req, res) => {
  try {
    const deleted = await CarReservation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted" });
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
