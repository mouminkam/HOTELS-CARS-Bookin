import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  X,
  Star,
  Car,
  Hotel,
  ArrowRight,
  Clock,
  ChevronRight,
  BadgeCheck,
  Clock as PendingIcon,
  Ban as CancelledIcon,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../Auth/AuthContext";

export default function UserOrdersPage() {
  const { userdata } = useAuth();
  const [activeTab, setActiveTab] = useState("hotel");
  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [carBookings, setCarBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [cancelType, setCancelType] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchBookings = async () => {
      if (location.state?.tab === "car") {
        setActiveTab("car");
      }
      console.log(userdata?.id);

      try {
        setLoading(true);
        if (userdata?.id) {
          const [hotelRes, carRes] = await Promise.all([
            axios.get(
              `http://localhost:5000/booking/hotel/byUser/${userdata.id}`
            ),
            axios.get(
              `http://localhost:5000/booking/car/byUser/${userdata.id}`
            ),
          ]);

          setHotelBookings(Array.isArray(hotelRes.data) ? hotelRes.data : []);
          setCarBookings(Array.isArray(carRes.data) ? carRes.data : []);
        }
      } catch (err) {
        setError(err.message);
        setHotelBookings([]);
        setCarBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userdata, location.state]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: {
        color: "bg-emerald-50 text-emerald-800",
        icon: <BadgeCheck className="w-4 h-4 mr-1" />,
      },
      pending: {
        color: "bg-amber-50 text-amber-800",
        icon: <PendingIcon className="w-4 h-4 mr-1" />,
      },
      cancelled: {
        color: "bg-rose-50 text-rose-800",
        icon: <CancelledIcon className="w-4 h-4 mr-1" />,
      },
      default: {
        color: "bg-gray-100 text-gray-800",
        icon: null,
      },
    };

    const config = statusConfig[status] || statusConfig.default;

    return (
      <motion.span
        className={`text-xs font-medium px-3 py-1.5 rounded-full ${config.color} flex items-center`}
        whileHover={{ scale: 1.03 }}
      >
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </motion.span>
    );
  };

  const handleCancelClick = (bookingId, type) => {
    setBookingToCancel(bookingId);
    setCancelType(type);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!bookingToCancel) return;

    setCancellingBooking(bookingToCancel);
    setShowCancelModal(false);

    try {
      const endpoint =
        cancelType === "hotel"
          ? `/api/bookings/booking/hotel/delete/${bookingToCancel}`
          : `/api/bookings/booking/car/delete/${bookingToCancel}`;

      await axios.delete(endpoint);

      if (cancelType === "hotel") {
        setHotelBookings((prev) =>
          prev.filter((b) => b._id !== bookingToCancel)
        );
      } else {
        setCarBookings((prev) => prev.filter((b) => b._id !== bookingToCancel));
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCancellingBooking(null);
      setBookingToCancel(null);
      setCancelType("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-xl shadow-sm max-w-md text-center">
          <div className="text-rose-500 mb-4">
            <X className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Error Loading Bookings
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                  My Bookings
                </h1>
                <p className="text-gray-600 mt-1.5 tracking-wide">
                  Welcome back,{" "}
                  <span className="text-blue-600 font-medium">
                    {userdata?.name}
                  </span>
                </p>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center text-sm text-gray-500 tracking-wide">
                  <span>Account</span>
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-gray-700 font-medium">Bookings</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("hotel")}
                className={`relative py-3 px-6 font-medium text-sm md:text-base transition-colors tracking-wide ${
                  activeTab === "hotel"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Hotel Bookings
                {activeTab === "hotel" && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab("car")}
                className={`relative py-3 px-6 font-medium text-sm md:text-base transition-colors tracking-wide ${
                  activeTab === "car"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Car Rentals
                {activeTab === "car" && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            </div>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              {/* Hotel Bookings Content */}
              {activeTab === "hotel" && (
                <div className="space-y-5">
                  {hotelBookings.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100"
                    >
                      <div className="w-20 h-20 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center">
                        <Hotel className="text-blue-500 w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 tracking-tight">
                        No Hotel Bookings Yet
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto tracking-wide leading-relaxed">
                        You haven't made any hotel bookings. Start exploring our
                        curated selection of accommodations.
                      </p>
                      <Link
                        to="/hotels"
                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all tracking-wide"
                      >
                        Browse Hotels
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </motion.div>
                  ) : (
                    hotelBookings.map((booking) => (
                      <motion.div
                        key={booking._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
                      >
                        <div className="p-5 md:p-6">
                          {/* Booking Header */}
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
                            <div className="flex items-center space-x-3 mb-3 md:mb-0">
                              <div className="bg-blue-50 p-2 rounded-lg">
                                <Clock className="text-blue-600 w-5 h-5" />
                              </div>
                              <div className="m-3">
                                <h3 className="font-semibold text-gray-900 tracking-tight">
                                  Booking #{booking._id.slice(-6).toUpperCase()}
                                </h3>
                                <p className="  font-semibold text-gray-700 tracking-tight">
                                  <span className="font-semibold text-gray-700 tracking-tight"> Booked on{" "}</span>
                                  {new Date(
                                    booking.createdAt
                                  ).toLocaleDateString()}
                               </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              {getStatusBadge(booking.status)}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Hotel Info */}
                            <div>
                              <div className="flex items-start space-x-4 mb-5">
                                <div className="flex-shrink-0 relative">
                                  <img
                                    src={
                                      booking.hotel?.images?.[0] ||
                                      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                    }
                                    alt={booking.hotel?.name || "Hotel"}
                                    className="w-20 h-20 rounded-lg object-cover shadow-sm"
                                  />
                                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-100">
                                    <Hotel className="w-4 h-4 text-blue-600" />
                                  </div>
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-semibold text-gray-900 mb-1 tracking-tight truncate">
                                    {booking.hotel?.name || "Hotel Booking"}
                                  </h4>
                                  <div className="flex items-center text-sm text-gray-600 mb-2 tracking-wide">
                                    <MapPin className="mr-1.5 w-4 h-4 flex-shrink-0 text-gray-400" />
                                    <span className="truncate">
                                      {booking.hotel?.location ||
                                        "Location not specified"}
                                    </span>
                                  </div>
                                  {booking.hotel?.rating && (
                                    <div className="flex items-center">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < Math.floor(booking.hotel.rating)
                                              ? "text-amber-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                      <span className="ml-1 text-sm font-medium text-gray-700 tracking-wide">
                                        {booking.hotel.rating.toFixed(1)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-3 text-sm text-gray-700 tracking-wide">
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                  <span className="flex items-center text-gray-600">
                                    <Calendar className="mr-2 w-4 h-4 text-blue-500" />
                                    Check-in
                                  </span>
                                  <span className="font-medium">
                                    {new Date(
                                      booking.checkIn
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                  <span className="flex items-center text-gray-600">
                                    <Calendar className="mr-2 w-4 h-4 text-blue-500" />
                                    Check-out
                                  </span>
                                  <span className="font-medium">
                                    {new Date(
                                      booking.checkOut
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                  <span className="flex items-center text-gray-600">
                                    <Users className="mr-2 w-4 h-4 text-blue-500" />
                                    Guests
                                  </span>
                                  <span className="font-medium">
                                    {booking.guests}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Price Summary */}
                            <div>
                              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 h-full">
                                <h4 className="font-medium text-gray-900 mb-3 flex items-center tracking-tight">
                                  <span className="bg-blue-100 p-1.5 rounded-lg mr-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 text-blue-600"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                  Payment Summary
                                </h4>
                                <div className="space-y-3 text-sm tracking-wide">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Accommodation
                                    </span>
                                    <span className="font-medium">
                                      $
                                      {(booking.total - booking.taxes).toFixed(
                                        2
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-gray-600">
                                    <span>Taxes & Fees</span>
                                    <span>${booking.taxes.toFixed(2)}</span>
                                  </div>
                                  <div className="border-t border-gray-200 my-2"></div>
                                  <div className="flex justify-between font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${booking.total.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {/* Car Bookings Content */}
              {activeTab === "car" && (
                <div className="space-y-5">
                  {carBookings.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100"
                    >
                      <div className="w-20 h-20 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center">
                        <Car className="text-blue-500 w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 tracking-tight">
                        No Car Rentals Yet
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto tracking-wide leading-relaxed">
                        You haven't rented any cars yet. Explore our selection
                        of vehicles for your next trip.
                      </p>
                      <Link
                        to="/cars"
                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all tracking-wide"
                      >
                        Browse Cars
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </motion.div>
                  ) : (
                    carBookings.map((booking) => (
                      <motion.div
                        key={booking._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
                      >
                        <div className="p-5 md:p-6">
                          {/* Booking Header */}
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
                            <div className="flex items-center space-x-3 mb-3 md:mb-0">
                              <div className="bg-blue-50 p-2 rounded-lg">
                                <Clock className="text-blue-600 w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 tracking-tight">
                                  Booking #{booking._id.slice(-6).toUpperCase()}
                                </h3>
                                <p className="text-xs text-gray-500 tracking-wide">
                                  Booked on{" "}
                                  {new Date(
                                    booking.bookedAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              {getStatusBadge(booking.status)}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Car Info */}
                            <div>
                              <div className="flex items-start space-x-4 mb-5">
                                <div className="flex-shrink-0 relative">
                                  <img
                                    src={
                                      booking.car?.images?.[0] ||
                                      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                    }
                                    alt={booking.car?.model || "Car Rental"}
                                    className="w-20 h-20 rounded-lg object-cover shadow-sm"
                                  />
                                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-100">
                                    <Car className="w-4 h-4 text-blue-600" />
                                  </div>
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-semibold text-gray-900 mb-1 tracking-tight truncate">
                                    {booking.car?.model || "Car Rental"}
                                  </h4>
                                  <div className="flex items-center text-sm text-gray-600 mb-2 tracking-wide">
                                    <MapPin className="mr-1.5 w-4 h-4 flex-shrink-0 text-gray-400" />
                                    <span className="truncate">
                                      {booking.car?.location ||
                                        "Location not specified"}
                                    </span>
                                  </div>
                                  {booking.car?.type && (
                                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded tracking-wide">
                                      {booking.car.type}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-3 text-sm text-gray-700 tracking-wide">
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                  <span className="flex items-center text-gray-600">
                                    <Calendar className="mr-2 w-4 h-4 text-blue-500" />
                                    Pickup Date
                                  </span>
                                  <span className="font-medium">
                                    {new Date(
                                      booking.PickupDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                  <span className="flex items-center text-gray-600">
                                    <Calendar className="mr-2 w-4 h-4 text-blue-500" />
                                    Dropoff Date
                                  </span>
                                  <span className="font-medium">
                                    {new Date(
                                      booking.DropoffDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Price Summary */}
                            <div>
                              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 h-full">
                                <h4 className="font-medium text-gray-900 mb-3 flex items-center tracking-tight">
                                  <span className="bg-blue-100 p-1.5 rounded-lg mr-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 text-blue-600"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                  Payment Summary
                                </h4>
                                <div className="space-y-3 text-sm tracking-wide">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Rental Cost
                                    </span>
                                    <span className="font-medium">
                                      $
                                      {(booking.total - booking.taxes).toFixed(
                                        2
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-gray-600">
                                    <span>Taxes & Fees</span>
                                    <span>${booking.taxes.toFixed(2)}</span>
                                  </div>
                                  <div className="border-t border-gray-200 my-2"></div>
                                  <div className="flex justify-between font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${booking.total.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-rose-100 rounded-full mx-auto mb-4">
                  <X className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2 text-gray-900 tracking-tight">
                  Cancel Booking?
                </h3>
                <p className="text-gray-600 text-center mb-6 tracking-wide leading-relaxed">
                  Are you sure you want to cancel this{" "}
                  {cancelType === "hotel" ? "hotel booking" : "car rental"}?
                  This action cannot be undone.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setShowCancelModal(false);
                      setBookingToCancel(null);
                    }}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 tracking-wide"
                  >
                    No, Keep It
                  </button>
                  <button
                    onClick={confirmCancel}
                    className="px-5 py-2.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium tracking-wide"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
