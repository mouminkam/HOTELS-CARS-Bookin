import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  MapPin,
  Car,
  Snowflake,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  X,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  Shield,
  Sparkles,
  MessageSquare,
  Mail,
  Twitter,
  Gauge,
  Fuel,
  Wifi,
  ShieldCheck,
  Smartphone,
  Music,
  Sun,
  Droplets,
  Luggage,
} from "lucide-react";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";
//++
import CarBookingSummaryModal from "./bookingCar-summary";
import { jwtDecode } from "jwt-decode";
import { useCars } from "../cars/CarContext";
//
export default function CarDetailsPage() {
  const { id } = useParams();
  // const [car, setCar] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();
  //++
  const { cars, loadingCars } = useCars();
  //
  // Car data
  // const car = {
  //   id: 1,
  //   name: "BMW 5 Series",
  //   location: "Cairo, Egypt",
  //   type: "Luxury Sedan",
  //   price: 120,
  //   rating: 4.7,
  //   reviews: 85,
  //   description:
  //     "Premium luxury sedan with leather seats, advanced navigation, and powerful engine. Perfect for business trips or comfortable long-distance travel with all the modern amenities you need.",
  //   features: ["ac", "gps", "premium", "bluetooth", "sunroof", "heatedSeats"],
  //   specifications: {
  //     seats: 5,
  //     transmission: "Automatic",
  //     fuelType: "Gasoline",
  //     fuelEfficiency: "8.5L/100km",
  //     engine: "2.0L Turbocharged I4",
  //     horsepower: 248,
  //     luggageCapacity: "530L",
  //     year: 2023,
  //     color: "Black Sapphire Metallic"
  //   },
  //   images: [
  //     "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  //     "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  //     "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  //     "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  //   ],
  //   pickupLocation: "Cairo International Airport, Terminal 3",
  //   dropoffLocation: "Same as pickup location",
  //   included: [
  //     "Unlimited mileage",
  //     "24/7 roadside assistance",
  //     "Collision damage waiver",
  //     "Theft protection",
  //     "Third-party liability"
  //   ],
  //   requirements: [
  //     "Valid driver's license",
  //     "Credit card in driver's name",
  //     "Minimum age: 25 years",
  //     "International driving permit (if required)"
  //   ]
  // };

  // Similar cars
  const similarCars = [
    {
      id: 2,
      name: "Mercedes-Benz E-Class",
      type: "Luxury Sedan",
      price: 140,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Audi A6",
      type: "Luxury Sedan",
      price: 130,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Lexus ES",
      type: "Luxury Sedan",
      price: 110,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    },
  ];

  // Reviews
  const reviews = [
    {
      id: 1,
      name: "Ahmed K.",
      rating: 5,
      date: "2024-03-15",
      comment:
        "Fantastic car with excellent handling and comfort. The BMW 5 Series made our trip across Egypt incredibly smooth. The fuel efficiency was better than expected for a luxury sedan.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Sarah M.",
      rating: 4,
      date: "2024-02-28",
      comment:
        "Great car overall, very comfortable for long drives. The only minor issue was some difficulty connecting my phone via Bluetooth initially, but the support team helped resolve it quickly.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Olivier P.",
      rating: 5,
      date: "2024-04-02",
      comment:
        "Perfect rental experience from start to finish. The car was in pristine condition with all features working flawlessly. Will definitely rent this model again on my next visit to Egypt.",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  // State
  const [currentImage, setCurrentImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
const car = cars.find((c) => c._id === id);
  // useEffect(() => {
  //   const fetchCar = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:5000/car/${id}`);
  //       setCar(res.data);
  //     } catch (err) {
  //       console.error("error data car fetching:", err);
  //     }
  //   };

  //   fetchCar();
  // }, [id]);
  if (loadingCars) return <p> Loading...</p>;

  // Helper functions
  const nextImage = () =>
    setCurrentImage((prev) => (prev === car.images.length - 1 ? 0 : prev + 1));
  const prevImage = () =>
    setCurrentImage((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));

  const getFeatureIcon = (feature) => {
    const icons = {
      ac: <Snowflake className="w-5 h-5 text-blue-600" />,
      gps: <MapPin className="w-5 h-5 text-blue-600" />,
      premium: <Sparkles className="w-5 h-5 text-blue-600" />,
      bluetooth: <Smartphone className="w-5 h-5 text-blue-600" />,
      sunroof: <Sun className="w-5 h-5 text-blue-600" />,
      heatedSeats: <Droplets className="w-5 h-5 text-blue-600" />,
      wifi: <Wifi className="w-5 h-5 text-blue-600" />,
      audio: <Music className="w-5 h-5 text-blue-600" />,
      safety: <ShieldCheck className="w-5 h-5 text-blue-600" />,
    };
    return icons[feature] || <span className="w-5 h-5"></span>;
  };

  const calculateDays = () => {
    if (!pickupDate || !dropoffDate) return 0;
    const diff = new Date(dropoffDate) - new Date(pickupDate);
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) || 1;
  };

  const totalPrice = () => {
    const days = calculateDays();
    return car.price * days + Math.round(car.price * days * 0.1);
  };
  //old version
    // const handleBookNow = () => {
    //   console.log("Booking details:", {
    //     pickupDate,
    //     dropoffDate,
    //     totalPrice: totalPrice(),
    //   });
    //   // In a real app, this would navigate to booking confirmation
    //   window.location.href = "/booking-summary";
    // };

//+ + + +
const handleBookNow = () => {
  const days = calculateDays();
    const basePrice = car.price * days;
  const taxes = Math.round(car.price * days * 0.1);
  const totalPrice = basePrice + taxes;//+
  setBookingDetails({
    car: car,
    pickupDate: pickupDate,
    dropoffDate: dropoffDate,
    days: days,
    taxes: taxes,
    totalPrice: totalPrice //+
  });
  
  setShowBookingModal(true);
};

//+ + + + + + + + +
const handleBookingConfirmation = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }
    const decoded = jwtDecode(token);
    const userId = decoded.id; 
    const response = await axios.post(
      'http://localhost:5000/booking/car/new',
      {
        carId: bookingDetails.car._id,
        userId: userId,
        startDate: bookingDetails.pickupDate,
        endDate: bookingDetails.dropoffDate,
        taxes: bookingDetails.taxes,
        totalPrice: bookingDetails.totalPrice
      }
    );
    console.log("Booking confirmed:", response.data);
     navigate("/user-orders", { state: { tab: "car" } });
  } catch (err) {
    console.error("Booking failed:", err.response?.data || err.message);
    alert("Failed to confirm reservation. Please try again.");
  } finally {
    setShowBookingModal(false);
  }
};
  const shareOptions = [
    { name: "Copy Link", icon: <Link className="w-5 h-5" /> },
    { name: "WhatsApp", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "Email", icon: <Mail className="w-5 h-5" /> },
    { name: "Twitter", icon: <Twitter className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Floating Header */}
      <div
        className={`fixed top-0 left-0 right-0 bg-white shadow-sm z-50 transition-all duration-300 ${
          isScrolled ? "py-3" : "py-0 h-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            to="/cars"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="font-medium">Back to listings</span>
          </Link>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium">{car.rating}</span>
              <span className="text-gray-500">({car.reviews})</span>
            </div>
            <div className="text-xl font-bold text-blue-600">
              ${car.price}
              <span className="text-sm font-normal text-gray-500">/day</span>
            </div>
            <button
              onClick={() => setSaved(!saved)}
              className={`p-2 rounded-full ${
                saved
                  ? "text-red-500 bg-red-50"
                  : "text-gray-600 hover:bg-gray-100"
              } transition-colors`}
            >
              <Heart className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              {showShareOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-200">
                  {shareOptions.map((option,i) => (
                    <button
                      // key={option.name}
                      key={i}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <span className="mr-3">{option.icon}</span>
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-8 pb-16 max-w-7xl">
        {/* Back and Action Buttons */}
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/cars"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to listings</span>
          </Link>

          <div className="flex space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Share2 className="w-5 h-5 mr-1" />
                <span className="font-medium">Share</span>
                {showShareOptions ? (
                  <ChevronUp className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-1" />
                )}
              </button>
              {showShareOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-200">
                  {shareOptions.map((option) => (
                    <button
                      key={option.name}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <span className="mr-3">{option.icon}</span>
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center ${
                saved ? "text-red-500" : "text-gray-600"
              } hover:text-red-500 transition-colors`}
            >
              <Heart
                className={`w-5 h-5 mr-1 ${saved ? "fill-current" : ""}`}
              />
              <span className="font-medium">{saved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-[500px] mb-8 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10"></div>

          <img
            src={car.images[currentImage]}
            alt={car.name}
            className="object-cover w-full h-full absolute inset-0 transition-opacity duration-500"
          />

          {/* Navigation Arrows */}
          {car.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
            {car.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentImage
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Badge */}
          <span className="absolute top-6 left-6 bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm flex items-center">
            <Sparkles className="w-4 h-4 mr-1" />
            {car.type}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Car Info */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {car.name}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-5 h-5 mr-1.5 text-blue-500" />
                  <span>{car.location}</span>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(car.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">
                    {car.rating}
                  </span>
                  <span className="text-gray-500">({car.reviews} reviews)</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  ${car.price}
                </div>
                <div className="text-gray-500">per day</div>
              </div>
            </div>

            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              {car.description}
            </p>

            {/* Tabs */}
            <div className="mb-8">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-6 py-3 font-medium text-sm flex items-center ${
                    activeTab === "overview"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`px-6 py-3 font-medium text-sm flex items-center ${
                    activeTab === "specs"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span>Specifications</span>
                </button>
                <button
                  onClick={() => setActiveTab("features")}
                  className={`px-6 py-3 font-medium text-sm flex items-center ${
                    activeTab === "features"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span>Features</span>
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-6 py-3 font-medium text-sm flex items-center ${
                    activeTab === "reviews"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span>Reviews</span>
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                    {reviews.length}
                  </span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="py-8">
                {activeTab === "overview" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <h3 className="font-semibold text-xl mb-5 text-gray-900">
                        Rental Details
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                            <span>Pickup Location</span>
                          </div>
                          <span className="font-medium">
                            {car.pickupLocation}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                            <span>Dropoff Location</span>
                          </div>
                          <span className="font-medium">
                            {car.dropoffLocation}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-5 h-5 mr-2 text-blue-500" />
                            <span>Pickup Time</span>
                          </div>
                          <span className="font-medium">9:00 AM - 5:00 PM</span>
                        </div>

                        {/* modified. */}
                        {/* <div className="flex justify-between items-center">
                          <div className="flex items-center text-gray-600">
                            <X className="w-5 h-5 mr-2 text-blue-500" />
                            <span>Cancellation</span>
                          </div>
                          <span className="font-medium text-green-600">
                            Free cancellation up to 24 hours before pickup
                          </span>
                        </div> */}
                        <div className="flex justify-between items-start gap-4 py-3">
                        <div className="flex items-start">
                          <X className="w-5 h-5 mt-0.5 text-blue-500 flex-shrink-0" />
                          <span className="text-gray-600 ml-2">Cancellation</span>
                        </div>
                        <span className="font-medium text-green-600 text-right">
                          Free cancellation up to 24 hours before pickup
                        </span>
                      </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-xl mb-5 text-gray-900">
                        Included in Rental
                      </h3>
                      <div className="space-y-3">
                        {Array.isArray(car?.included) &&
                          car.included.map((item, index) => (
                            <div key={index} className="flex items-start">
                              <ShieldCheck className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <h3 className="font-semibold text-lg mb-4 text-gray-900">
                        Technical Specifications
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Seats</span>
                          <span className="font-medium">
                            {car.specifications.seats}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Transmission</span>
                          <span className="font-medium capitalize">
                            {car.specifications.transmission}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fuel Type</span>
                          <span className="font-medium">
                            {car.specifications.fuelType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fuel Efficiency</span>
                          <span className="font-medium">
                            {car.specifications.fuelEfficiency}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Engine</span>
                          <span className="font-medium">
                            {car.specifications.engine}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Horsepower</span>
                          <span className="font-medium">
                            {car.specifications.horsepower} HP
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Luggage Capacity
                          </span>
                          <span className="font-medium">
                            {car.specifications.luggageCapacity}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Year</span>
                          <span className="font-medium">
                            {car.specifications.year}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Color</span>
                          <span className="font-medium">
                            {car.specifications.color}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4 text-gray-900">
                        Rental Requirements
                      </h3>
                      <div className="space-y-4">
                        {car.requirements.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <Shield className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {car.features.map((feature,i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-white transition-colors"
                      >
                        {getFeatureIcon(feature)}
                        <span className="font-medium capitalize">
                          {feature.replace(/([A-Z])/g, " $1").toLowerCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-8">
                    {reviews.map((review,i) => (
                      <div
                        key={i}
                        // key={review.id}
                        className="border-b border-gray-200 pb-8 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {review.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full">
                            <span className="font-medium">{review.rating}</span>
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Similar Cars */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Similar Vehicles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {similarCars.map((car,index) => (
                  <Link
                    key={index}
                    // key={car.id}
                    to={`/cars/${car.id}`}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">
                        {car.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span className="capitalize">{car.type}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium text-gray-900 mr-1">
                            {car.rating}
                          </span>
                        </div>
                        <div className="text-blue-600 font-bold">
                          ${car.price}
                          <span className="text-sm font-normal text-gray-500">
                            /day
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="sticky top-4 h-fit">
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                Book Your Vehicle
              </h2>

              <div className="space-y-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dropoff Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={dropoffDate}
                      onChange={(e) => setDropoffDate(e.target.value)}
                      min={pickupDate || new Date().toISOString().split("T")[0]}
                    />
                   
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-200 pt-5">
                <h3 className="font-semibold text-lg mb-5 text-gray-900">
                  Price Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      ${car.price} × {calculateDays()} day
                      {calculateDays() !== 1 ? "s" : ""}
                    </span>
                    <span className="font-medium">
                      ${car.price * calculateDays()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes & fees</span>
                    <span className="font-medium">
                      ${Math.round(car.price * calculateDays() * 0.1)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-xl mt-5 pt-5 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-blue-600">${totalPrice()}</span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookNow}
                disabled={!pickupDate || !dropoffDate}
                className={`w-full mt-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center ${
                  pickupDate && dropoffDate
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Book Now
              </button>
              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-1.5 text-gray-400" />
                Secure booking with SSL encryption
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* +++++++ */}
      {showBookingModal && (
      <CarBookingSummaryModal
        bookingDetails={bookingDetails}
        onClose={() => setShowBookingModal(false)}
        onConfirm={handleBookingConfirmation}
      />
      )}
    </div>
  );
}
