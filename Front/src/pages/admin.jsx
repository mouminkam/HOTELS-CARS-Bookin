import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Edit,
  Trash2,
  Eye,
  Star,
  Plus,
  ChevronRight,
  Hotel,
  Car,
  User,
  CreditCard,
  ArrowUpRight,
  X,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTable, setActiveTable] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);
  const [SelectedBookinnglItem, setSelectedBookinnglItem] = useState(null);
  const [SelectedCarBookinnglItem, setSelectedCarBookinnglItem] =
    useState(null);
  const [SelectedHotelItem, setSelectedHotelItem] = useState(null);
  const [SelectedUser, setSelectedUser] = useState(null);
  const [SelectedCar, setSelectedCar] = useState(null);
  const [hotelsData, sethotelsData] = useState([]);
  const [bookingsData, setbookingsData] = useState([]);
  const [carBookingsData, setCarBookingsData] = useState([]);
  const [usersData, setusersData] = useState([]);
  const [CarsData, setCarsData] = useState([]);
  const [ShowEditHotel, setShowEditHotel] = useState(false);
  const [ShowAddHotel, setShowAddHotel] = useState(false);
  const [ShowEditCar, setShowEditCar] = useState(false);
  const [ShowAddCar, setShowAddCar] = useState(false);
  const [ShowEditUser, setShowEditUser] = useState(false);
  const [stats2, setstats2] = useState();
  //
  //
  //
  //

  useEffect(() => {
    const fetchHotels = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/hotels/allHotels"
        );
        sethotelsData(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);
  //
  //
  //
  //

  useEffect(() => {
    const fetchBooking = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          "http://localhost:5000/booking/hotel/all"
        );
        console.log(response.data);
        setbookingsData(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, []);

  //
  //
  //
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get("http://localhost:5000/user/allUsers");
        setusersData(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  //
  //
  //
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get("http://localhost:5000/car/allCar");
        setCarsData(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  //
  //
  useEffect(() => {
    const fetchCarBookings = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/booking/car/all"
        );
        setCarBookingsData(response.data);
      } catch (error) {
        console.error("Error fetching car bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarBookings();
  }, []);

  //
  //
  useEffect(() => {
    const fetchstats = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/overview/stats"
        );
        setstats2(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchstats();
  }, []);
  //
  //

  const handleActionhotels = (action, hotel) => {
    if (action === "edit") {
      setSelectedHotelItem(hotel);
      setShowEditHotel(true);
    } else if (action === "delete") {
      if (confirm(`Are you sure you want to delete "${hotel.name}"?`)) {
        setIsLoading(true);
        axios
          .delete(`http://localhost:5000/hotels/delete/${hotel._id}`)
          .then(() => {
            sethotelsData((prev) =>
              prev.filter((item) => item._id !== hotel._id)
            );
          })
          .catch((err) => console.error("Delete error:", err))
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  };
  //
  //
  //
  const handleBookingAction = (action, booking) => {
    setIsLoading(true);
    setSelectedBookinnglItem(booking);
    if (action === "delete") {
      if (confirm(`Are you sure you want to delete "${booking.name}"?`)) {
        setIsLoading(true);
        axios
          .delete(`http://localhost:5000/booking/hotel/delete/${booking._id}`)
          .then(() => {
            setbookingsData((prev) =>
              prev.filter((item) => item._id !== booking._id)
            );
          })
          .catch((err) => console.error("Delete error:", err))
          .finally(() => {
            setIsLoading(false);
          });
      }
      setTimeout(() => {
        setIsLoading(false);
        setSelectedBookinnglItem(null);
      }, 1000);
    }
  };
  //
  //
  const handlecarBookingAction = (action, carbooking) => {
    setIsLoading(true);
    setSelectedCarBookinnglItem(carbooking);
    if (action === "delete") {
      if (confirm(`Are you sure you want to delete "${carbooking.name}"?`)) {
        setIsLoading(true);
        axios
          .delete(`http://localhost:5000/booking/car/delete/${carbooking._id}`)
          .then(() => {
            setCarBookingsData((prev) =>
              prev.filter((item) => item._id !== carbooking._id)
            );
          })
          .catch((err) => console.error("Delete error:", err))
          .finally(() => {
            setIsLoading(false);
          });
      }
      setTimeout(() => {
        setIsLoading(false);
        setSelectedBookinnglItem(null);
      }, 1000);
    }
  };
  //
  //
  const handleUserAction = (action, User) => {
    if (action === "edit") {
      setSelectedUser(User);
      setShowEditUser(true);
    } else if (action === "delete") {
      if (confirm(`Are you sure you want to delete "${User.name}"?`)) {
        setIsLoading(true);
        axios
          .delete(`http://localhost:5000/user/delete/${User._id}`)
          .then(() => {
            setusersData((prev) =>
              prev.filter((item) => item._id !== User._id)
            );
          })
          .catch((err) => console.error("Delete error:", err))
          .finally(() => {
            setIsLoading(false);
          });
      }
      setTimeout(() => {
        setIsLoading(false);
        setSelectedUser(null);
      }, 1000);
    }
  };
  //
  //
  const handleCarAction = (action, car) => {
    if (action === "edit") {
      setSelectedCar(car);
      setShowEditCar(true);
    } else if (action === "delete") {
      if (confirm(`Are you sure you want to delete "${car.name}"?`)) {
        setIsLoading(true);
        axios
          .delete(`http://localhost:5000/car/delete/${car._id}`)
          .then(() => {
            setCarsData((prev) => prev.filter((item) => item._id !== car._id));
          })
          .catch((err) => console.error("Delete error:", err))
          .finally(() => {
            setIsLoading(false);
          });
      }
      setTimeout(() => {
        setIsLoading(false);
        setSelectedCar(null);
      }, 1000);
    }
  };
  //
  //
  //
  //
  //
  //

  const stats = [
    {
      title: "Total Properties",
      value: stats2?.totalProperties || 0,
      change: "+12%",
      icon: <Building className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Bookings",
      value: stats2?.totalBookings || 0,
      change: "+23%",
      icon: <Calendar className="w-5 h-5" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Users",
      value: stats2?.totalUsers || 0,
      change: "+8%",
      icon: <Users className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total Revenue",
      value: stats2?.totalRevenue || 0,
      change: "+15%",
      icon: <DollarSign className="w-5 h-5" />,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      guest: "Ahmed Hassan",
      hotel: "Grand Hotel Cairo",
      checkIn: "2024-01-20",
      amount: "$450",
      status: "confirmed",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      guest: "Sarah Johnson",
      hotel: "Nile View Resort",
      checkIn: "2024-01-22",
      amount: "$680",
      status: "pending",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      guest: "Mohamed Ali",
      hotel: "Alexandria Beach Hotel",
      checkIn: "2024-01-25",
      amount: "$320",
      status: "confirmed",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  const topHotels = [
    {
      name: "Grand Hotel Cairo",
      bookings: 45,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Nile View Resort",
      bookings: 38,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Alexandria Beach Hotel",
      bookings: 32,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1600107687933-8a371d5a9144?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ];

  const getStatusBadge = (status) => {
    let colorClass = "bg-gray-100 text-gray-800";
    if (status === "confirmed") colorClass = "bg-green-100 text-green-800";
    if (status === "pending") colorClass = "bg-yellow-100 text-yellow-800";
    if (status === "cancelled") colorClass = "bg-red-100 text-red-800";

    return (
      <span
        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colorClass}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="mt-10 min-h-screen flex bg-gray-50">
      <main className="flex-1 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage properties, bookings, users, and transport
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[
              { id: "dashboard", label: "Overview", icon: <Eye size={16} /> },
              { id: "hotels", label: "Hotels", icon: <Hotel size={16} /> },
              {
                id: "bookings",
                label: "Hotels Bookings",
                icon: <CreditCard size={16} />,
              },
              { id: "users", label: "Users", icon: <User size={16} /> },
              { id: "transport", label: "Cars", icon: <Car size={16} /> },
              {
                id: "carBookings",
                label: "Car Bookings",
                icon: <Car size={16} />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTable(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTable === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTable}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dashboard Overview */}
            {activeTable === "dashboard" && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat) => (
                    <motion.div
                      key={stat.title}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">
                            {stat.title}
                          </p>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {stat.value}
                          </h3>
                          <div className="flex items-center mt-2 text-xs">
                            <TrendingUp className="mr-1 text-green-500 w-3 h-3" />
                            <span className="text-green-600">
                              {stat.change}
                            </span>
                            <span className="text-gray-500 ml-1">
                              from last month
                            </span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                          {stat.icon}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Bookings & Top Hotels */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Recent Bookings
                      </h3>
                      <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                        View all <ChevronRight className="ml-1 w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <motion.div
                          key={booking.id}
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={booking.image}
                              alt={booking.guest}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {booking.guest}
                              </div>
                              <div className="text-sm text-gray-600">
                                {booking.hotel}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              {booking.amount}
                            </div>
                            {getStatusBadge(booking.status)}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Top Performing Hotels
                      </h3>
                      <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                        View all <ChevronRight className="ml-1 w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {topHotels.map((hotel, index) => (
                        <motion.div
                          key={hotel.name}
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="absolute -top-2 -left-2 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                {index + 1}
                              </div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {hotel.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {hotel.bookings} bookings
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="text-yellow-400 fill-current w-4 h-4" />
                            <span className="font-medium text-gray-900">
                              {hotel.rating}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hotels Management */}
            {activeTable === "hotels" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Hotels Management
                  </h3>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                    onClick={() => setShowAddHotel(true)}
                  >
                    <Plus className="mr-2 w-4 h-4" />
                    Add Hotel
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* hotel Management */}
                      {hotelsData.map((hotel, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  src={hotel.images[0]}
                                  alt={hotel.name}
                                  className="h-10 w-10 rounded-md object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {hotel.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {hotel.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                              {hotel.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            ${hotel.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Star className="text-yellow-400 fill-current w-4 h-4" />
                              <span className="ml-1 text-sm font-medium text-gray-700">
                                {hotel.rating}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  handleActionhotels("edit", hotel)
                                }
                                className="text-blue-600 hover:text-blue-900"
                                disabled={
                                  isLoading &&
                                  SelectedHotelItem?.id === hotel.id
                                }
                              >
                                {isLoading &&
                                SelectedHotelItem?.id === hotel.id ? (
                                  <svg
                                    className="animate-spin h-4 w-4 text-blue-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                ) : (
                                  <Edit className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() =>
                                  handleActionhotels("delete", hotel)
                                }
                                className="text-red-600 hover:text-red-900"
                                disabled={
                                  isLoading &&
                                  SelectedHotelItem?.id === hotel.id
                                }
                              >
                                {isLoading &&
                                SelectedHotelItem?.id === hotel.id ? (
                                  <svg
                                    className="animate-spin h-4 w-4 text-red-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {/*  */}
                    {/*  */}
                  </table>
                  {ShowAddHotel && (
                    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex items-center justify-center p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-100"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">
                              Add New Hotel
                            </h2>
                            <button
                              onClick={() => setShowAddHotel(false)}
                              className="text-gray-400 hover:text-gray-500 transition-colors"
                            >
                              <X size={20} />
                            </button>
                          </div>

                          <form
                            onSubmit={async (e) => {
                              e.preventDefault();
                              setIsLoading(true);

                              const newHotel = {
                                name: e.target.name.value,
                                description: e.target.description.value,
                                location: e.target.location.value,
                                address: e.target.address.value,
                                governorate: e.target.governorate.value,
                                type: e.target.type.value.toLowerCase(),
                                price: parseFloat(e.target.price.value),
                                rating: parseFloat(e.target.rating.value),
                                images: e.target.image.value
                                  ? e.target.image.value
                                      .split(",")
                                      .map((img) => img.trim())
                                  : [],
                                amenities: [],
                                services: [],
                                taxes: 0,
                              };

                              try {
                                const res = await axios.post(
                                  "http://localhost:5000/hotels/newHotel",
                                  newHotel
                                );
                                console.log(newHotel);
                                sethotelsData((prev) => [...prev, res.data]);
                                setShowAddHotel(false);
                              } catch (error) {
                                console.error("Error adding hotel:", error);
                              } finally {
                                setIsLoading(false);
                              }
                            }}
                            className="space-y-4"
                          >
                            {/* Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hotel Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Hotel Name"
                                required
                              />
                            </div>

                            {/* Location */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                              </label>
                              <input
                                type="text"
                                name="location"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Location"
                                required
                              />
                            </div>

                            {/* Type */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type
                              </label>
                              <select
                                name="type"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                required
                              >
                                <option value="">Select type</option>
                                <option value="Hotel">Hotel</option>
                                <option value="Resort">Resort</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Villa">Villa</option>
                                <option value="Guest House">Guest House</option>
                              </select>
                            </div>

                            {/* Price */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price
                              </label>
                              <div className="relative">
                                <span className="absolute left-3 top-2 text-gray-500">
                                  $
                                </span>
                                <input
                                  type="number"
                                  name="price"
                                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  placeholder="Price per night"
                                  required
                                />
                              </div>
                            </div>
                            {/* Description */}
                            <div>
                              <label>Description</label>
                              <textarea
                                name="description"
                                required
                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Description of the hotel"
                              />
                            </div>

                            {/* Address */}
                            <div>
                              <label>Address</label>
                              <input
                                type="text"
                                name="address"
                                required
                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Hotel Address"
                              />
                            </div>

                            {/* Governorate */}
                            <div>
                              <label>Governorate</label>
                              <input
                                type="text"
                                name="governorate"
                                required
                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Governorate"
                              />
                            </div>

                            {/* Rating */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rating
                              </label>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  name="rating"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  placeholder="Rating (0-5)"
                                  step="0.1"
                                  min="0"
                                  max="5"
                                  required
                                />
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={18}
                                      className="text-gray-300"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Image */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image URL
                              </label>
                              <input
                                type="text"
                                name="image"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="https://example.com/image.jpg"
                              />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                              <button
                                type="button"
                                onClick={() => setShowAddHotel(false)}
                                className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-4 py-2 text-white font-medium rounded-lg transition-colors ${
                                  isLoading
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                              >
                                {isLoading ? (
                                  <span className="flex items-center justify-center">
                                    <svg
                                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    Adding...
                                  </span>
                                ) : (
                                  "Add Hotel"
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/*  */}
                  {/*  */}
                  {ShowEditHotel && SelectedHotelItem && (
                    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex items-center justify-center p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-xl shadow-xl w-full max-h max-w-md overflow-scroll border border-gray-100"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">
                              Edit Hotel
                            </h2>
                            <button
                              onClick={() => setShowEditHotel(false)}
                              className="text-gray-400 hover:text-gray-500 transition-colors"
                            >
                              <X size={20} />
                            </button>
                          </div>

                          <form
                            onSubmit={async (e) => {
                              e.preventDefault();
                              setIsLoading(true);
                              try {
                                await axios.patch(
                                  `http://localhost:5000/hotels/edit/${SelectedHotelItem._id}`,
                                  SelectedHotelItem
                                );
                                sethotelsData((prev) =>
                                  prev.map((hotel) =>
                                    hotel._id === SelectedHotelItem._id
                                      ? SelectedHotelItem
                                      : hotel
                                  )
                                );
                                setShowEditHotel(false);
                              } catch (error) {
                                console.error("Error updating hotel:", error);
                              } finally {
                                setIsLoading(false);
                              }
                            }}
                            className="space-y-4"
                          >
                            {/* Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hotel Name
                              </label>
                              <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                value={SelectedHotelItem.name}
                                onChange={(e) =>
                                  setSelectedHotelItem({
                                    ...SelectedHotelItem,
                                    name: e.target.value,
                                  })
                                }
                                placeholder="Hotel Name"
                              />
                            </div>

                            {/* Location */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                              </label>
                              <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                value={SelectedHotelItem.location}
                                onChange={(e) =>
                                  setSelectedHotelItem({
                                    ...SelectedHotelItem,
                                    location: e.target.value,
                                  })
                                }
                                placeholder="Location"
                              />
                            </div>

                            {/* Price */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price
                              </label>
                              <div className="relative">
                                <span className="absolute left-3 top-2 text-gray-500">
                                  $
                                </span>
                                <input
                                  type="number"
                                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  value={SelectedHotelItem.price}
                                  onChange={(e) =>
                                    setSelectedHotelItem({
                                      ...SelectedHotelItem,
                                      price: e.target.value,
                                    })
                                  }
                                  placeholder="Price"
                                />
                              </div>
                            </div>

                            {/* Rating */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rating
                              </label>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  value={SelectedHotelItem.rating}
                                  onChange={(e) =>
                                    setSelectedHotelItem({
                                      ...SelectedHotelItem,
                                      rating: e.target.value,
                                    })
                                  }
                                  placeholder="Rating"
                                  step="0.1"
                                  min="0"
                                  max="5"
                                />
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={18}
                                      className={`${
                                        i < Math.floor(SelectedHotelItem.rating)
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                              <button
                                type="button"
                                onClick={() => setShowEditHotel(false)}
                                className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-4 py-2 text-white font-medium rounded-lg transition-colors ${
                                  isLoading
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                              >
                                {isLoading ? (
                                  <span className="flex items-center justify-center">
                                    <svg
                                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    Saving...
                                  </span>
                                ) : (
                                  "Save Changes"
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bookings Management */}
            {activeTable === "bookings" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Bookings Management
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Guest
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hotel
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Check-in
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookingsData.map((booking, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{booking.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {booking.guests}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {booking.hotel?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {booking.checkIn}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(booking.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                            ${booking.total}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {/*  */}
                              {/*  */}

                              <button
                                onClick={() =>
                                  handleBookingAction("delete", booking)
                                }
                                className="text-red-600 hover:text-red-900"
                                disabled={
                                  isLoading &&
                                  SelectedBookinnglItem?.id === booking.id
                                }
                              >
                                {isLoading &&
                                SelectedBookinnglItem?.id === booking.id ? (
                                  <svg
                                    className="animate-spin h-4 w-4 text-red-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {/*  */}
                      {/*  */}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users Management */}
            {activeTable === "users" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Users Management
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Full Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {usersData.map((user, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                                  alt={user.fullname}
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.fullname}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {user.email}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {user.phone}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                user.role === "admin"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleUserAction("edit", user)}
                                className="text-blue-600 hover:text-blue-900"
                                disabled={
                                  isLoading && SelectedUser?.id === user._id
                                }
                              >
                                {isLoading && SelectedUser?.id === user._id ? (
                                  <svg
                                    className="animate-spin h-4 w-4 text-blue-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                ) : (
                                  <Edit className="w-4 h-4" />
                                )}
                              </button>

                              <button
                                onClick={() => handleUserAction("delete", user)}
                                className="text-red-600 hover:text-red-900"
                                disabled={
                                  isLoading && SelectedUser?.id === user._id
                                }
                              >
                                {isLoading && SelectedUser?.id === user._id ? (
                                  <svg
                                    className="animate-spin h-4 w-4 text-red-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {ShowEditUser && SelectedUser && (
                    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex items-center justify-center p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">
                              Edit User
                            </h2>
                            <button
                              onClick={() => setShowEditUser(false)}
                              className="text-gray-400 hover:text-gray-500 transition-colors"
                            >
                              <X size={20} />
                            </button>
                          </div>

                          <form
                            onSubmit={async (e) => {
                              e.preventDefault();
                              setIsLoading(true);
                              try {
                                await axios.patch(
                                  `http://localhost:5000/user/update/${SelectedUser._id}`,
                                  SelectedUser
                                );
                                setusersData((prev) =>
                                  prev.map((user) =>
                                    user._id === SelectedUser._id
                                      ? SelectedUser
                                      : user
                                  )
                                );
                                setShowEditUser(false);
                              } catch (err) {
                                console.error("Error updating user:", err);
                              } finally {
                                setIsLoading(false);
                              }
                            }}
                            className="space-y-4"
                          >
                            {/* Full Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                              </label>
                              <input
                                type="text"
                                value={SelectedUser.fullname}
                                onChange={(e) =>
                                  setSelectedUser({
                                    ...SelectedUser,
                                    fullname: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Full Name"
                              />
                            </div>

                            {/* Email */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                              </label>
                              <input
                                type="email"
                                value={SelectedUser.email}
                                onChange={(e) =>
                                  setSelectedUser({
                                    ...SelectedUser,
                                    email: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Email"
                              />
                            </div>

                            {/* Phone */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                              </label>
                              <input
                                type="text"
                                value={SelectedUser.phone}
                                onChange={(e) =>
                                  setSelectedUser({
                                    ...SelectedUser,
                                    phone: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Phone"
                              />
                            </div>

                            {/* Role */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Role
                              </label>
                              <select
                                value={SelectedUser.role}
                                onChange={(e) =>
                                  setSelectedUser({
                                    ...SelectedUser,
                                    role: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                            </div>

                            {/* Agree to Terms */}
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={SelectedUser.agreeToTerms}
                                onChange={(e) =>
                                  setSelectedUser({
                                    ...SelectedUser,
                                    agreeToTerms: e.target.checked,
                                  })
                                }
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                              <label className="text-sm text-gray-700">
                                Agreed to Terms
                              </label>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                              <button
                                type="button"
                                onClick={() => setShowEditUser(false)}
                                className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-4 py-2 text-white font-medium rounded-lg transition-colors ${
                                  isLoading
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                              >
                                {isLoading ? "Saving..." : "Save Changes"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Transport Management */}
            {activeTable === "transport" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Transport Management
                  </h3>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                    onClick={() => setShowAddCar(true)}
                  >
                    <Plus className="mr-2 w-4 h-4" />
                    Add Vehicle
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vehicle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Capacity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {CarsData.map((vehicle, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  src={vehicle.images[0]}
                                  alt={vehicle.name}
                                  className="h-10 w-10 rounded-md object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {vehicle.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                              {vehicle.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {vehicle.capacity} seats
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            ${vehicle.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Star className="text-yellow-400 fill-current w-4 h-4" />
                              <span className="ml-1 text-sm font-medium text-gray-700">
                                {vehicle.rating}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleCarAction("edit", vehicle)}
                                className="text-blue-600 hover:text-blue-900"
                                disabled={
                                  isLoading && SelectedCar?.id === vehicle.id
                                }
                              >
                                {isLoading && SelectedCar?.id === vehicle.id ? (
                                  <svg
                                    className="animate-spin h-4 w-4 text-blue-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                ) : (
                                  <Edit className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() =>
                                  handleCarAction("delete", vehicle)
                                }
                                className="text-red-600 hover:text-red-900"
                                disabled={
                                  isLoading && SelectedCar?.id === vehicle.id
                                }
                              >
                                {isLoading && SelectedCar?.id === vehicle.id ? (
                                  <svg
                                    className="animate-spin h-4 w-4 text-red-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {ShowAddCar && (
                    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex items-center justify-center p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-100"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">
                              Add New Car
                            </h2>
                            <button
                              onClick={() => setShowAddCar(false)}
                              className="text-gray-400 hover:text-gray-500 transition-colors"
                            >
                              <X size={20} />
                            </button>
                          </div>

                          <form
                            onSubmit={async (e) => {
                              e.preventDefault();
                              setIsLoading(true);

                              const newCar = {
                                name: e.target.name.value,
                                type: e.target.type.value,
                                price: parseFloat(e.target.price.value),
                                rating: parseFloat(e.target.rating.value) || 0,
                                description: e.target.description.value,
                                location: e.target.location.value,
                                pickupLocation: e.target.pickupLocation.value,
                                dropoffLocation: e.target.dropoffLocation.value,
                                capacity: parseInt(e.target.capacity.value),
                                images: e.target.images.value
                                  ? e.target.images.value
                                      .split("\n")
                                      .map((img) => img.trim())
                                  : [],
                                specifications: {
                                  seats: parseInt(e.target.seats.value),
                                  transmission: e.target.transmission.value,
                                  fuelType: e.target.fuelType.value,
                                  fuelEfficiency: e.target.fuelEfficiency.value,
                                  engine: e.target.engine.value,
                                  horsepower: parseInt(
                                    e.target.horsepower.value
                                  ),
                                  luggageCapacity:
                                    e.target.luggageCapacity.value,
                                  year: parseInt(e.target.year.value),
                                  color: e.target.color.value,
                                },
                              };

                              try {
                                const res = await axios.post(
                                  "http://localhost:5000/car/newCar",
                                  newCar
                                );
                                setCarsData((prev) => [...prev, res.data]);
                                setShowAddCar(false);
                              } catch (error) {
                                console.error("Error adding car:", error);
                              } finally {
                                setIsLoading(false);
                              }
                            }}
                            className="space-y-4"
                          >
                            {/* Basic Information */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium text-gray-800">
                                Basic Information
                              </h3>

                              {/* Name */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Car Name*
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  placeholder="Tesla Model X"
                                  required
                                />
                              </div>

                              {/* Type */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Type*
                                </label>
                                <input
                                  type="text"
                                  name="type"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  placeholder="SUV, Sedan, etc."
                                  required
                                />
                              </div>

                              {/* Description */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Description
                                </label>
                                <textarea
                                  name="description"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  placeholder="Description of the car"
                                  rows={3}
                                />
                              </div>
                            </div>

                            {/* Pricing and Rating */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium text-gray-800">
                                Pricing & Rating
                              </h3>

                              {/* Price */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Price per day*
                                </label>
                                <div className="relative">
                                  <span className="absolute left-3 top-2 text-gray-500">
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    name="price"
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="200"
                                    required
                                    min="0"
                                    step="0.01"
                                  />
                                </div>
                              </div>

                              {/* Rating */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Rating
                                </label>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="number"
                                    name="rating"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="4.5"
                                    step="0.1"
                                    min="0"
                                    max="5"
                                  />
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        size={18}
                                        className="text-gray-300"
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Location Information */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium text-gray-800">
                                Location
                              </h3>

                              {/* Location */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  General Location
                                </label>
                                <input
                                  type="text"
                                  name="location"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  placeholder="Dubai, UAE"
                                />
                              </div>

                              {/* Pickup Location */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Pickup Location
                                </label>
                                <input
                                  type="text"
                                  name="pickupLocation"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  placeholder="Dubai International Airport, Terminal 1"
                                />
                              </div>

                              {/* Dropoff Location */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Dropoff Location
                                </label>
                                <input
                                  type="text"
                                  name="dropoffLocation"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  placeholder="Downtown Dubai"
                                />
                              </div>
                            </div>

                            {/* Capacity */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Capacity (seats)*
                              </label>
                              <input
                                type="number"
                                name="capacity"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="5"
                                required
                                min="1"
                              />
                            </div>

                            {/* Specifications */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium text-gray-800">
                                Specifications
                              </h3>

                              <div className="grid grid-cols-2 gap-4">
                                {/* Seats */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Seats
                                  </label>
                                  <input
                                    type="number"
                                    name="seats"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="5"
                                    min="1"
                                  />
                                </div>

                                {/* Transmission */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Transmission
                                  </label>
                                  <select
                                    name="transmission"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  >
                                    <option value="">Select</option>
                                    <option value="Automatic">Automatic</option>
                                    <option value="Manual">Manual</option>
                                    <option value="CVT">CVT</option>
                                  </select>
                                </div>

                                {/* Fuel Type */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fuel Type
                                  </label>
                                  <select
                                    name="fuelType"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  >
                                    <option value="">Select</option>
                                    <option value="Gasoline">Gasoline</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="Hybrid">Hybrid</option>
                                  </select>
                                </div>

                                {/* Fuel Efficiency */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fuel Efficiency
                                  </label>
                                  <input
                                    type="text"
                                    name="fuelEfficiency"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="30 mpg"
                                  />
                                </div>

                                {/* Engine */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Engine
                                  </label>
                                  <input
                                    type="text"
                                    name="engine"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="2.0L Turbo"
                                  />
                                </div>

                                {/* Horsepower */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Horsepower
                                  </label>
                                  <input
                                    type="number"
                                    name="horsepower"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="250"
                                    min="0"
                                  />
                                </div>

                                {/* Luggage Capacity */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Luggage Capacity
                                  </label>
                                  <input
                                    type="text"
                                    name="luggageCapacity"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="2 large + 2 medium bags"
                                  />
                                </div>

                                {/* Year */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Year
                                  </label>
                                  <input
                                    type="number"
                                    name="year"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="2024"
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                  />
                                </div>

                                {/* Color */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Color
                                  </label>
                                  <input
                                    type="text"
                                    name="color"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Pearl White"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Images */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image URLs (one per line)
                              </label>
                              <textarea
                                name="images"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="https://example.com/image1.jpg\nhttps://example.com/image2.jpg"
                                rows={3}
                              />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                              <button
                                type="button"
                                onClick={() => setShowAddCar(false)}
                                className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-4 py-2 text-white font-medium rounded-lg transition-colors ${
                                  isLoading
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                              >
                                {isLoading ? (
                                  <span className="flex items-center justify-center">
                                    <svg
                                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    Adding...
                                  </span>
                                ) : (
                                  "Add Car"
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/*  */}
                  {/*  */}
                  {ShowEditCar && SelectedCar && (
                    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex items-center justify-center p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-100"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">
                              Edit car
                            </h2>
                            <button
                              onClick={() => setShowEditCar(false)}
                              className="text-gray-400 hover:text-gray-500 transition-colors"
                            >
                              <X size={20} />
                            </button>
                          </div>

                          <form
                            onSubmit={async (e) => {
                              e.preventDefault();
                              setIsLoading(true);
                              try {
                                await axios.patch(
                                  `http://localhost:5000/car/update/${SelectedCar._id}`,
                                  SelectedCar
                                );
                                setCarsData((prev) =>
                                  prev.map((car) =>
                                    car._id === SelectedCar._id
                                      ? SelectedCar
                                      : car
                                  )
                                );
                                setShowEditCar(false);
                              } catch (error) {
                                console.error("Error updating car:", error);
                              } finally {
                                setIsLoading(false);
                              }
                            }}
                            className="space-y-4"
                          >
                            {/* Basic Information */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium text-gray-800">
                                Basic Information
                              </h3>

                              {/* Name */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Car Name
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  value={SelectedCar.name}
                                  onChange={(e) =>
                                    setSelectedCar({
                                      ...SelectedCar,
                                      name: e.target.value,
                                    })
                                  }
                                  placeholder="Car Name"
                                  required
                                />
                              </div>

                              {/* Type */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Type
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  value={SelectedCar.type}
                                  onChange={(e) =>
                                    setSelectedCar({
                                      ...SelectedCar,
                                      type: e.target.value,
                                    })
                                  }
                                  placeholder="SUV, Sedan, etc."
                                  required
                                />
                              </div>

                              {/* Description */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Description
                                </label>
                                <textarea
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  value={SelectedCar.description}
                                  onChange={(e) =>
                                    setSelectedCar({
                                      ...SelectedCar,
                                      description: e.target.value,
                                    })
                                  }
                                  placeholder="Description"
                                  rows={3}
                                />
                              </div>
                            </div>

                            {/* Pricing and Rating */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium text-gray-800">
                                Pricing & Rating
                              </h3>

                              {/* Price */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Price
                                </label>
                                <div className="relative">
                                  <span className="absolute left-3 top-2 text-gray-500">
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    value={SelectedCar.price}
                                    onChange={(e) =>
                                      setSelectedCar({
                                        ...SelectedCar,
                                        price: e.target.value,
                                      })
                                    }
                                    placeholder="Price per day"
                                    required
                                    min="0"
                                  />
                                </div>
                              </div>

                              {/* Rating */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Rating
                                </label>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    value={SelectedCar.rating}
                                    onChange={(e) =>
                                      setSelectedCar({
                                        ...SelectedCar,
                                        rating: e.target.value,
                                      })
                                    }
                                    placeholder="Rating"
                                    step="0.1"
                                    min="0"
                                    max="5"
                                  />
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        size={18}
                                        className={`${
                                          i < Math.floor(SelectedCar.rating)
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Location Information */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium text-gray-800">
                                Location
                              </h3>

                              {/* Location */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  General Location
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  value={SelectedCar.location}
                                  onChange={(e) =>
                                    setSelectedCar({
                                      ...SelectedCar,
                                      location: e.target.value,
                                    })
                                  }
                                  placeholder="City, Country"
                                />
                              </div>

                              {/* Pickup Location */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Pickup Location
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  value={SelectedCar.pickupLocation}
                                  onChange={(e) =>
                                    setSelectedCar({
                                      ...SelectedCar,
                                      pickupLocation: e.target.value,
                                    })
                                  }
                                  placeholder="Specific pickup address"
                                />
                              </div>

                              {/* Dropoff Location */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Dropoff Location
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  value={SelectedCar.dropoffLocation}
                                  onChange={(e) =>
                                    setSelectedCar({
                                      ...SelectedCar,
                                      dropoffLocation: e.target.value,
                                    })
                                  }
                                  placeholder="Specific dropoff address"
                                />
                              </div>
                            </div>

                            {/* Capacity */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Capacity (seats)
                              </label>
                              <input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                value={SelectedCar.capacity}
                                onChange={(e) =>
                                  setSelectedCar({
                                    ...SelectedCar,
                                    capacity: e.target.value,
                                  })
                                }
                                placeholder="Number of seats"
                                required
                                min="1"
                              />
                            </div>

                            {/* Specifications */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium text-gray-800">
                                Specifications
                              </h3>

                              <div className="grid grid-cols-2 gap-4">
                                {/* Seats */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Seats
                                  </label>
                                  <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    value={
                                      SelectedCar.specifications?.seats || ""
                                    }
                                    onChange={(e) =>
                                      setSelectedCar({
                                        ...SelectedCar,
                                        specifications: {
                                          ...SelectedCar.specifications,
                                          seats: e.target.value,
                                        },
                                      })
                                    }
                                    placeholder="Number of seats"
                                    min="1"
                                  />
                                </div>

                                {/* Transmission */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Transmission
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    value={
                                      SelectedCar.specifications
                                        ?.transmission || ""
                                    }
                                    onChange={(e) =>
                                      setSelectedCar({
                                        ...SelectedCar,
                                        specifications: {
                                          ...SelectedCar.specifications,
                                          transmission: e.target.value,
                                        },
                                      })
                                    }
                                    placeholder="Automatic/Manual"
                                  />
                                </div>

                                {/* Fuel Type */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fuel Type
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    value={
                                      SelectedCar.specifications?.fuelType || ""
                                    }
                                    onChange={(e) =>
                                      setSelectedCar({
                                        ...SelectedCar,
                                        specifications: {
                                          ...SelectedCar.specifications,
                                          fuelType: e.target.value,
                                        },
                                      })
                                    }
                                    placeholder="Gasoline, Electric, etc."
                                  />
                                </div>

                                {/* Fuel Efficiency */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fuel Efficiency
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    value={
                                      SelectedCar.specifications
                                        ?.fuelEfficiency || ""
                                    }
                                    onChange={(e) =>
                                      setSelectedCar({
                                        ...SelectedCar,
                                        specifications: {
                                          ...SelectedCar.specifications,
                                          fuelEfficiency: e.target.value,
                                        },
                                      })
                                    }
                                    placeholder="e.g., 30 mpg"
                                  />
                                </div>

                                {/* Year */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Year
                                  </label>
                                  <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    value={
                                      SelectedCar.specifications?.year || ""
                                    }
                                    onChange={(e) =>
                                      setSelectedCar({
                                        ...SelectedCar,
                                        specifications: {
                                          ...SelectedCar.specifications,
                                          year: e.target.value,
                                        },
                                      })
                                    }
                                    placeholder="Manufacturing year"
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                  />
                                </div>

                                {/* Color */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Color
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    value={
                                      SelectedCar.specifications?.color || ""
                                    }
                                    onChange={(e) =>
                                      setSelectedCar({
                                        ...SelectedCar,
                                        specifications: {
                                          ...SelectedCar.specifications,
                                          color: e.target.value,
                                        },
                                      })
                                    }
                                    placeholder="Car color"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Images */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image URLs (one per line)
                              </label>
                              <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                value={SelectedCar.images?.join("\n") || ""}
                                onChange={(e) =>
                                  setSelectedCar({
                                    ...SelectedCar,
                                    images: e.target.value.split("\n"),
                                  })
                                }
                                placeholder="https://example.com/image1.jpg"
                                rows={3}
                              />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                              <button
                                type="button"
                                onClick={() => setShowEditCar(false)}
                                className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-4 py-2 text-white font-medium rounded-lg transition-colors ${
                                  isLoading
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                              >
                                {isLoading ? (
                                  <span className="flex items-center justify-center">
                                    <svg
                                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    Saving...
                                  </span>
                                ) : (
                                  "Save Changes"
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Car Bookings Management */}

            {activeTable === "carBookings" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Car Bookings Management
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Car Model
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pickup Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {carBookingsData.map((booking, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{booking._id.slice(-6).toUpperCase()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={
                                    booking.user?.image ||
                                    "https://randomuser.me/api/portraits/men/1.jpg"
                                  }
                                  alt={booking.user?.fullname}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {booking.user?.fullname || "Guest User"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-md object-cover"
                                  src={
                                    booking.car?.images?.[0] ||
                                    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                  }
                                  alt={booking.car?.model}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {booking.car?.name || "Unknown Car"}
                                </div>
                                <div className="text-sm text-gray-500 capitalize">
                                  {booking.car?.type || "No type"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {new Date(booking.PickupDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(booking.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                            ${booking.total?.toFixed(2) || "0.00"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  handlecarBookingAction("delete", booking)
                                }
                                className="text-red-600 hover:text-red-900"
                                disabled={
                                  isLoading &&
                                  SelectedCarBookinnglItem?._id === booking._id
                                }
                              >
                                {isLoading &&
                                SelectedCarBookinnglItem?._id ===
                                  booking._id ? (
                                  <svg
                                    className="animate-spin h-4 w-4 text-red-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">
                      {carBookingsData.length}
                    </span>{" "}
                    results
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
