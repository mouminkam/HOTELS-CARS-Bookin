import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Car,
  Snowflake,
  Heart,
  Filter,
  X,
  Star,
  Search,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Fuel,
  Gauge,
  Users,
  Calendar,
  Shield,
} from "lucide-react";
import axios from "axios";

export default function CarRentalsPage() {
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [activeFilters, setActiveFilters] = useState({
    rating: 0,
    type: "all",
    features: [],
    location: "all",
    seats: null,
    transmission: "",
    fuelType: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/car/allCar");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full mb-4"></div>
          <div className="h-4 bg-blue-100 rounded w-32"></div>
        </div>
      </div>
    );

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const getFeatureIcon = (feature) => {
    switch (feature) {
      case "ac":
        return <Snowflake className="w-4 h-4" />;
      case "gps":
        return <MapPin className="w-4 h-4" />;
      case "premium":
        return <Star className="w-4 h-4" />;
      case "bluetooth":
        return <Shield className="w-4 h-4" />;
      case "4x4":
        return <Car className="w-4 h-4" />;
      case "convertible":
        return <Gauge className="w-4 h-4" />;
      case "massageSeats":
        return <Users className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredCars = cars.filter((car) => {
    if (
      searchQuery &&
      !car.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (car.price < priceRange[0] || car.price > priceRange[1]) {
      return false;
    }

    if (activeFilters.rating > 0 && car.rating < activeFilters.rating) {
      return false;
    }

    if (
      activeFilters.type !== "all" &&
      car.type.toLowerCase() !== activeFilters.type.toLowerCase()
    ) {
      return false;
    }

    if (
      activeFilters.features.length > 0 &&
      (!Array.isArray(car.features) ||
        !activeFilters.features.every((feature) =>
          car.features.includes(feature)
        ))
    ) {
      return false;
    }

    if (
      activeFilters.location !== "all" &&
      !car.location.toLowerCase().includes(activeFilters.location.toLowerCase())
    ) {
      return false;
    }

    if (
      activeFilters.seats &&
      car.specifications?.seats !== activeFilters.seats
    ) {
      return false;
    }

    if (
      activeFilters.transmission &&
      car.specifications?.transmission.toLowerCase() !==
        activeFilters.transmission.toLowerCase()
    ) {
      return false;
    }

    if (
      activeFilters.fuelType &&
      car.specifications?.fuelType.toLowerCase() !==
        activeFilters.fuelType.toLowerCase()
    ) {
      return false;
    }

    return true;
  });

  const handlePriceChange = (e, thumb) => {
    const value = parseInt(e.target.value);
    if (thumb === 0) {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  const toggleFeatureFilter = (feature) => {
    setActiveFilters((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Your Perfect Ride
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl">
            Premium rental cars across Egypt's most beautiful destinations
          </p>
        </div>
      </div>

      <main className="container mx-auto max-w-6xl px-4 py-12">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available Vehicles
            </h2>
            <p className="text-gray-600">
              {filteredCars.length} vehicles found
            </p>
          </div>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5 text-gray-700" />
            <span className="font-medium">Filters</span>
            {showMobileFilters ? (
              <ChevronUp className="w-5 h-5 text-gray-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden md:block lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm sticky top-4 border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center justify-between">
                  <span className="flex items-center">
                    <Filter className="mr-2 w-5 h-5 text-blue-600" />
                    <span className="text-gray-900">Filters</span>
                  </span>
                  <button
                    onClick={() => {
                      setPriceRange([0, 300]);
                      setActiveFilters({
                        rating: 0,
                        type: "all",
                        features: [],
                        location: "all",
                        seats: null,
                        transmission: "",
                        fuelType: "",
                      });
                      setSearchQuery("");
                    }}
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium transition-colors"
                  >
                    <X className="mr-1 w-4 h-4" />
                    Clear all
                  </button>
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transmission
                    </label>
                    <select
                      value={activeFilters.transmission}
                      onChange={(e) =>
                        setActiveFilters({
                          ...activeFilters,
                          transmission: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="">Any</option>
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuel Type
                    </label>
                    <select
                      value={activeFilters.fuelType}
                      onChange={(e) =>
                        setActiveFilters({
                          ...activeFilters,
                          fuelType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="">Any</option>
                      <option value="electric">Electric</option>
                      <option value="gasoline">Gasoline</option>
                      <option value="diesel">Diesel</option>
                      <option value="Petrol">Petrol</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="search"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="search"
                        type="text"
                        placeholder="Search vehicles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <div className="mt-2">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          ${priceRange[0]}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          ${priceRange[1]}
                        </span>
                      </div>
                      <div className="relative h-2 bg-gray-200 rounded-full">
                        <div
                          className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                          style={{
                            left: `${(priceRange[0] / 300) * 100}%`,
                            right: `${100 - (priceRange[1] / 300) * 100}%`,
                          }}
                        ></div>
                        <input
                          type="range"
                          min="0"
                          max="300"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange(e, 0)}
                          className="absolute w-full h-2 opacity-0 cursor-pointer"
                        />
                        <input
                          type="range"
                          min="0"
                          max="300"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(e, 1)}
                          className="absolute w-full h-2 opacity-0 cursor-pointer"
                        />
                        <div
                          className="absolute w-4 h-4 bg-blue-600 rounded-full -ml-2 -mt-1 cursor-pointer shadow-md transition-transform hover:scale-110"
                          style={{ left: `${(priceRange[0] / 300) * 100}%` }}
                        ></div>
                        <div
                          className="absolute w-4 h-4 bg-blue-600 rounded-full -ml-2 -mt-1 cursor-pointer shadow-md transition-transform hover:scale-110"
                          style={{ left: `${(priceRange[1] / 300) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Rating
                    </label>
                    <select
                      value={activeFilters.rating}
                      onChange={(e) =>
                        setActiveFilters({
                          ...activeFilters,
                          rating: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="0">Any Rating</option>
                      <option value="3">3+ Stars</option>
                      <option value="4">4+ Stars</option>
                      <option value="5">5 Stars</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Type
                    </label>
                    <select
                      value={activeFilters.type}
                      onChange={(e) =>
                        setActiveFilters({
                          ...activeFilters,
                          type: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="all">All Types</option>
                      <option value="luxury sedan">Luxury Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="economy sedan">Economy Sedan</option>
                      <option value="compact">Compact</option>
                      <option value="premium luxury">Premium Luxury</option>
                      <option value="off-road">Off-Road</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Features
                    </label>
                    <div className="mt-2 space-y-3">
                      {[
                        "airConditioning",
                        "autopilot",
                        "bluetooth",
                        "cruiseControl",
                        "electric",
                        "heatedSeats",
                        "laneAssist",
                        "leatherSeats",
                        "massageSeats",
                        "navigation",
                        "parkingSensors",
                        "quattro",
                        "premium",
                      ].map((feature) => (
                        <div key={feature} className="flex items-center">
                          <input
                            type="checkbox"
                            id={feature}
                            checked={activeFilters.features.includes(feature)}
                            onChange={() => toggleFeatureFilter(feature)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors"
                          />
                          <label
                            htmlFor={feature}
                            className="ml-3 text-sm text-gray-700 flex items-center"
                          >
                            {getFeatureIcon(feature)}
                            <span className="ml-2">
                              {feature.charAt(0).toUpperCase() +
                                feature.slice(1).replace(/([A-Z])/g, " $1")}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <select
                      value={activeFilters.location}
                      onChange={(e) =>
                        setActiveFilters({
                          ...activeFilters,
                          location: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="all">All Governorates</option>
                      <option value="Damascus">Damascus</option>
                      <option value="Hama">Hama</option>
                      <option value="Homs">Homs</option>
                      <option value="Daraa">Daraa</option>
                      <option value="Latakia">Latakia</option>
                      <option value="Aleppo">Aleppo</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="md:hidden bg-white rounded-xl shadow-lg border border-gray-200 mb-6 p-6">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="mobile-search"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="mobile-search"
                      type="text"
                      placeholder="Search vehicles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="mt-2">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        ${priceRange[0]}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        ${priceRange[1]}
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-200 rounded-full">
                      <div
                        className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                        style={{
                          left: `${(priceRange[0] / 300) * 100}%`,
                          right: `${100 - (priceRange[1] / 300) * 100}%`,
                        }}
                      ></div>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="absolute w-full h-2 opacity-0 cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="absolute w-full h-2 opacity-0 cursor-pointer"
                      />
                      <div
                        className="absolute w-4 h-4 bg-blue-600 rounded-full -ml-2 -mt-1 cursor-pointer shadow-md transition-transform hover:scale-110"
                        style={{ left: `${(priceRange[0] / 300) * 100}%` }}
                      ></div>
                      <div
                        className="absolute w-4 h-4 bg-blue-600 rounded-full -ml-2 -mt-1 cursor-pointer shadow-md transition-transform hover:scale-110"
                        style={{ left: `${(priceRange[1] / 300) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={activeFilters.rating}
                    onChange={(e) =>
                      setActiveFilters({
                        ...activeFilters,
                        rating: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="0">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Type
                  </label>
                  <select
                    value={activeFilters.type}
                    onChange={(e) =>
                      setActiveFilters({
                        ...activeFilters,
                        type: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="all">All Types</option>
                    <option value="luxury sedan">Luxury Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="economy sedan">Economy Sedan</option>
                    <option value="compact">Compact</option>
                    <option value="premium luxury">Premium Luxury</option>
                    <option value="off-road">Off-Road</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {[
                      "ac",
                      "gps",
                      "premium",
                      "bluetooth",
                      "4x4",
                      "convertible",
                      "massageSeats",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`mobile-${feature}`}
                          checked={activeFilters.features.includes(feature)}
                          onChange={() => toggleFeatureFilter(feature)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors"
                        />
                        <label
                          htmlFor={`mobile-${feature}`}
                          className="ml-2 text-sm text-gray-700 flex items-center"
                        >
                          {getFeatureIcon(feature)}
                          <span className="ml-1">
                            {feature.charAt(0).toUpperCase() +
                              feature.slice(1).replace(/([A-Z])/g, " $1")}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => {
                    setPriceRange([0, 300]);
                    setActiveFilters({
                      rating: 0,
                      type: "all",
                      features: [],
                      location: "all",
                      seats: null,
                      transmission: "",
                      fuelType: "",
                    });
                    setSearchQuery("");
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Car Cards */}
          <div className="lg:w-3/4">
            {/* Desktop Header */}
            <div className="hidden md:block mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Available Vehicles
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredCars.length} vehicles found in Egypt
                {activeFilters.location !== "all" &&
                  ` • ${
                    activeFilters.location.charAt(0).toUpperCase() +
                    activeFilters.location.slice(1)
                  }`}
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 flex flex-col"
                >
                  {/* Image Section - Fixed Height */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      placeholder="blur"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(car._id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full ${
                        favorites.includes(car._id)
                          ? "text-red-500 bg-white/90"
                          : "text-gray-400 bg-white/80 hover:text-red-500"
                      } transition-colors shadow-sm`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(car._id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {car.type}
                    </span>
                  </div>

                  {/* Content Section - Fixed Structure */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Title and Price - Fixed Height */}
                    <div className="flex justify-between items-start mb-3 min-h-[72px]">
                      <div className="pr-2">
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-1">
                          {car.name}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="line-clamp-1">{car.location}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xl font-bold text-blue-600">
                          ${car.price}
                        </div>
                        <div className="text-xs text-gray-500">per day</div>
                      </div>
                    </div>

                    {/* Rating - Fixed Height */}
                    <div className="flex items-center mb-4 h-5">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(car.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900 mr-1">
                        {car.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({car.reviews} reviews)
                      </span>
                    </div>

                    {/* Description - Fixed Height with Clamp */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                      {car.description}
                    </p>

                    {/* Specifications - Fixed Height */}
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4 h-5">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{car.specifications?.seats || "N/A"} seats</span>
                      </div>
                      <div className="flex items-center">
                        <Gauge className="w-4 h-4 mr-1" />
                        <span className="capitalize">
                          {car.specifications?.transmission || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Fuel className="w-4 h-4 mr-1" />
                        <span>{car.specifications?.fuelType || "N/A"}</span>
                      </div>
                    </div>

                    {/* Features - Fixed Height with Overflow */}
                    <div
                      className="flex flex-wrap gap-2 mb-5 min-h-[40px] max-h-[60px] overflow-y-auto"
                      style={{
                        scrollbarWidth: "none", // Firefox
                        msOverflowStyle: "none", // IE/Edge
                      }}
                    >
                      {Array.isArray(car.features) &&
                      car.features.length > 0 ? (
                        <>
                          {car.features.slice(0, 4).map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-xs text-gray-700"
                            >
                              {getFeatureIcon(feature)}
                              <span className="ml-1">
                                {feature.charAt(0).toUpperCase() +
                                  feature.slice(1).replace(/([A-Z])/g, " $1")}
                              </span>
                            </div>
                          ))}
                          {car.features.length > 4 && (
                            <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-xs text-gray-700">
                              +{car.features.length - 4} more
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-xs text-gray-400">
                          No features listed
                        </div>
                      )}
                    </div>

                    {/* Button - Fixed Position at Bottom */}
                    <Link
                      to={`/cars/${car._id}`}
                      className="mt-auto block w-full text-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2.5 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredCars.length === 0 && (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No vehicles found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setPriceRange([0, 300]);
                    setActiveFilters({
                      rating: 0,
                      type: "all",
                      features: [],
                      location: "all",
                      seats: null,
                      transmission: "",
                      fuelType: "",
                    });
                    setSearchQuery("");
                  }}
                  className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
