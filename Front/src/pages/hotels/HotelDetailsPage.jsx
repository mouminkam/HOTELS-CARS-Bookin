import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import BookingSummaryModal from "./booking-summary-hotel";
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
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
} from "lucide-react";
//+ +
import { jwtDecode } from "jwt-decode";
import HotelMap from "../../components/HotelMap";
import { useCars } from "../cars/CarContext";
import CarSelectionModal from "../../components/CarSelectionModal";



export default function HotelDetailsPage() {
//+
const { cars } = useCars();
const [showMoreCarsModal, setShowMoreCarsModal] = useState(false);
const [modalFilters, setModalFilters] = useState({ type: "all", feature: "" });
const [modalSort, setModalSort] = useState("none");
//
  const { id } = useParams();
  const [hotel, sethotel] = useState(null);
  const [showBookingSummary, setShowBookingSummary] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const navigate = useNavigate();
  // Hotel data
  // const hotel = {
  //   name: "Azure Sands Resort & Spa",
  //   location: "Palm Jumeirah, Dubai, UAE",
  //   rating: 4.8,
  //   reviews: 1245,
  //   price: 350,
  //   description:
  //     "Experience unparalleled luxury at our beachfront resort with panoramic Arabian Gulf views. Our award-winning property features world-class amenities including a private beach, infinity pools, and a Michelin-starred restaurant. The spacious suites blend contemporary design with Arabian influences, offering floor-to-ceiling windows and private balconies.",
  //   amenities: [
  //     "wifi",
  //     "parking",
  //     "restaurant",
  //     "gym",
  //     "pool",
  //     "airConditioning",
  //     "spa",
  //     "beachAccess",
  //     "concierge",
  //     "roomService",
  //   ],
  //   images: [
  //     "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  //     "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  //     "https://images.unsplash.com/photo-1582719471386-3a067800a1d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  //     "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  //   ],
  //   checkIn: "3:00 PM",
  //   checkOut: "11:00 AM",
  //   maxGuests: 4,
  //   cancellation: "Free cancellation up to 48 hours before check-in",
  // };

  // Transport options
  // const transports = [
  //   {
  //     id: 1,
  //     name: "Premium Sedan",
  //     type: "sedan",
  //     price: 120,
  //     capacity: 4,
  //     rating: 4.7,
  //     features: ["AC", "Bottled Water", "WiFi", "Phone Chargers"],
  //     image:
  //       "https://images.unsplash.com/photo-1549317661-bd32f8d27f2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  //   },
  //   {
  //     id: 2,
  //     name: "Luxury SUV",
  //     type: "suv",
  //     price: 180,
  //     capacity: 6,
  //     rating: 4.9,
  //     features: ["AC", "Charging Ports", "Premium WiFi", "Refreshments"],
  //     image:
  //       "https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  //   },
  // ];

  // Reviews
  const reviews = [
    {
      id: 1,
      name: "Ahmed K.",
      rating: 5,
      date: "2024-03-15",
      comment:
        "Absolutely stunning property with exceptional service. The infinity pool overlooking the Gulf was breathtaking. Staff went above and beyond to make our anniversary special with rose petals and champagne in our suite!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Sarah M.",
      rating: 4,
      date: "2024-02-28",
      comment:
        "Beautiful location and extremely comfortable rooms. The pool area was fantastic, though the beach could use more shade umbrellas. Breakfast buffet was outstanding with so many options.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Olivier P.",
      rating: 5,
      date: "2024-04-02",
      comment:
        "The spa treatments were world-class - best massage I've ever had. Our butler service made everything effortless. Location is perfect with amazing views of the Dubai skyline.",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  // State
  const [currentImage, setCurrentImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [selectedTransport, setSelectedTransport] = useState(null);
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

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/hotels/hotel/${id}`);
        sethotel(res.data);
      } catch (err) {
        console.error("error data hotel fetching", err);
      }
    };

    fetchHotel();
  }, [id]);

  if (!hotel) return <p>Loading...</p>;

  // Helper functions
  const nextImage = () =>
    setCurrentImage((prev) =>
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );

  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: <Wifi className="w-5 h-5 text-blue-600" />,
      parking: <Car className="w-5 h-5 text-blue-600" />,
      restaurant: <Utensils className="w-5 h-5 text-blue-600" />,
      gym: <Dumbbell className="w-5 h-5 text-blue-600" />,
      pool: <Waves className="w-5 h-5 text-blue-600" />,
      airConditioning: <Snowflake className="w-5 h-5 text-blue-600" />,
      spa: <Sparkles className="w-5 h-5 text-blue-600" />,
      beachAccess: <Waves className="w-5 h-5 text-blue-600" />,
      concierge: <Shield className="w-5 h-5 text-blue-600" />,
      roomService: <Clock className="w-5 h-5 text-blue-600" />,
    };
    return icons[amenity] || <span className="w-5 h-5"></span>;
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut) - new Date(checkIn);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const totalPrice = () => {
    const nights = calculateNights();
    const basePrice = hotel.price * nights;
    const transportPrice = selectedTransport?.price || 0;
    return (
      basePrice +
      transportPrice +
      Math.round((basePrice + transportPrice) * 0.1)
    );
  };

  const handleBookNow = () => {
    if (!checkIn || !checkOut || guests < 1) return;

    const nights = calculateNights();
    const bookingDetails = {
      hotel: {
        ...hotel,
        price: hotel.price,
      },
      transport: selectedTransport,
      checkIn,
      checkOut,
      guests,
      nights,
      total: totalPrice(),
      taxes: Math.round(
        (hotel.price * nights + (selectedTransport?.price || 0)) * 0.1
      ),
    };

    setBookingData(bookingDetails);
    setShowBookingSummary(true);
  };

  const handleConfirmBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/login');
        return;
      }
      const decoded = jwtDecode(token);
      const userId = decoded.id; 
      const payload = {
        hotel: hotel._id, 
        checkIn,
        checkOut,
        guests,
        transport: selectedTransport?.id, 
        nights: calculateNights(),
        taxes: Math.round((hotel.price * calculateNights() + (selectedTransport?.price || 0)) * 0.1),
        total: totalPrice(),
        user: userId,
      };

      const res = await axios.post("http://localhost:5000/booking/hotel/new", payload);
      console.log("📥 Booking saved:", res.data);
      navigate("/user-orders");
    } catch (err) {
      console.error("❌ Error saving booking:", err);
    } finally {
      setShowBookingSummary(false);
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
            to="/hotels"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="font-medium">Back to listings</span>
          </Link>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium">{hotel.rating}</span>
              <span className="text-gray-500">({hotel.reviews})</span>
            </div>
            <div className="text-xl font-bold text-blue-600">
              ${hotel.price}
              <span className="text-sm font-normal text-gray-500">/night</span>
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-8 pb-16 max-w-7xl">
        {/* Back and Action Buttons */}
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/hotels"
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
            src={hotel.images[currentImage]}
            alt={hotel.name}
            className="object-cover w-full h-full absolute inset-0 transition-opacity duration-500"
          />

          {/* Navigation Arrows */}
          {hotel.images.length > 1 && (
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
            {hotel.images.map((_, i) => (
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
            Luxury Resort
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Hotel Info */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {hotel.name}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-5 h-5 mr-1.5 text-blue-500" />
                  <span>{hotel.location}</span>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(hotel.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">
                    {hotel.rating}
                  </span>
                  <span className="text-gray-500">
                    ({hotel.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  ${hotel.price}
                </div>
                <div className="text-gray-500">per night</div>
              </div>
            </div>

            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              {hotel.description}
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
                  onClick={() => setActiveTab("amenities")}
                  className={`px-6 py-3 font-medium text-sm flex items-center ${
                    activeTab === "amenities"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span>Amenities</span>
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
                        Details
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-5 h-5 mr-2 text-blue-500" />
                            <span>Check-in</span>
                          </div>
                          <span className="font-medium">{hotel.checkIn}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-5 h-5 mr-2 text-blue-500" />
                            <span>Check-out</span>
                          </div>
                          <span className="font-medium">{hotel.checkOut}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-gray-600">
                            <Users className="w-5 h-5 mr-2 text-blue-500" />
                            <span>Max Guests</span>
                          </div>
                          <span className="font-medium">{hotel.maxGuests}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-gray-600">
                            <X className="w-5 h-5 mr-2 text-blue-500" />
                            <span>Cancellation</span>
                          </div>
                          <span className="font-medium text-green-600">
                            {hotel.cancellation}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-5 text-gray-900">Location</h3>
                      <div className="h-64 rounded-xl overflow-hidden border border-gray-200 relative z-0">
                        <HotelMap
                          coordinates={hotel.coordinates}
                          hotelName={hotel.name}
                          location={hotel.location}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "amenities" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {hotel.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-white transition-colors"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="font-medium capitalize">
                          {amenity.replace(/([A-Z])/g, " $1").toLowerCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-8">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
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
          </div>

          {/* Booking Card */}
          <div className="sticky top-4 h-fit">
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                Book Your Stay
              </h2>

              <div className="space-y-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <select
                    className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} guest{num !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Transportation Section */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 flex items-center text-gray-900">
                  <Car className="w-5 h-5 mr-2 text-blue-500" />
                  Transportation
                </h3>
                <div className="space-y-4">
                  {cars.slice(0, 2).map((car) => (
                    <div
                      key={car._id}
                      onClick={() => setSelectedTransport(car)}
                      className={`
                        flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all
                        ${
                          selectedTransport?._id === car._id
                            ? "border-2 border-blue-500 bg-blue-50"
                            : "border border-gray-200 hover:border-blue-300"
                        }
                      `}
                    >
                      <img
                        src={car.images[0]}
                        alt={car.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4
                          className={`font-medium ${
                            selectedTransport?._id === car._id
                              ? "text-blue-600"
                              : "text-gray-900 group-hover:text-blue-600"
                          }`}
                        >
                          {car.name}
                        </h4>
                        <p className="text-sm text-gray-600 capitalize">{car.type}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-600 space-x-4">
                          <Users className="w-4 h-4" />
                          <span>{car.specifications?.seats || "N/A"} seats</span>
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{car.rating}</span>
                        </div>
                      </div>
                      <div
                        className={`font-bold text-lg ${
                          selectedTransport?._id === car._id
                            ? "text-blue-600"
                            : "text-gray-900"
                        }`}
                      >
                        ${car.price}
                      </div>
                    </div>
                  ))}

                  {cars.length > 2 && (
                    <button
                      onClick={() => setShowMoreCarsModal(true)}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Show More Cars
                    </button>
                  )}
                </div>
              </div>
              {/* modified. */}
              {/* Transport Options
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 flex items-center text-gray-900">
                  <Car className="w-5 h-5 mr-2 text-blue-500" />
                  Transportation
                </h3>

                {selectedTransport ? (
                  <div className="border-2 border-blue-200 bg-blue-50 rounded-xl p-5 relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-100 rounded-full opacity-20"></div>
                    <button
                      onClick={() => setSelectedTransport(null)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-start gap-4 relative z-10">
                      <img
                        src={selectedTransport.image}
                        alt={selectedTransport.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {selectedTransport.name}
                            </h4>
                            <p className="text-sm text-gray-600 capitalize">
                              {selectedTransport.type}
                            </p>
                          </div>
                          <div className="text-blue-600 font-bold">
                            ${selectedTransport.price}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {selectedTransport.features.map((feature) => (
                            <span
                              key={feature}
                              className="text-xs bg-white px-2.5 py-1 rounded-full border border-blue-100 text-blue-800"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transports.map((transport) => (
                      <div
                        key={transport.id}
                        onClick={() => setSelectedTransport(transport)}
                        className="border border-gray-200 hover:border-blue-300 rounded-xl p-4 cursor-pointer transition-all hover:shadow-sm group"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={transport.image}
                            alt={transport.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                                  {transport.name}
                                </h4>
                                <p className="text-sm text-gray-600 capitalize">
                                  {transport.type}
                                </p>
                              </div>
                              <div className="text-blue-600 font-bold">
                                ${transport.price}
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                <span>{transport.capacity} seats</span>
                              </div>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                <span>{transport.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div> */}

              {/* Price Summary */}
              <div className="border-t border-gray-200 pt-5">
                <h3 className="font-semibold text-lg mb-5 text-gray-900">
                  Price Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      ${hotel.price} × {calculateNights()} night
                      {calculateNights() !== 1 ? "s" : ""}
                    </span>
                    <span className="font-medium">
                      ${hotel.price * calculateNights()}
                    </span>
                  </div>
                  {selectedTransport && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transportation</span>
                      <span className="font-medium">
                        ${selectedTransport.price}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes & fees</span>
                    <span className="font-medium">
                      $
                      {Math.round(
                        (hotel.price * calculateNights() +
                          (selectedTransport?.price || 0)) *
                          0.1
                      )}
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
                disabled={!checkIn || !checkOut || guests < 1}
                className={`w-full mt-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center ${
                  checkIn && checkOut && guests > 0
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
      {showBookingSummary && (
        <BookingSummaryModal
          bookingDetails={bookingData}
          onClose={() => setShowBookingSummary(false)}
          onConfirm={handleConfirmBooking}
        />
      )}
      {showMoreCarsModal && (
     <CarSelectionModal
      onClose={() => setShowMoreCarsModal(false)}
      onSelectCar={(car) => setSelectedTransport(car)}
      cars={cars}
      filters={modalFilters}
     setFilters={setModalFilters}
      sort={modalSort}
     setSort={setModalSort}
    />
    )}
    </div>
  );
}