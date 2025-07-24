import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
  Snowflake,
  Heart,
  Filter,
  X,
  Star,
  Search,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from "lucide-react";
import axios from "axios";

export default function HotelsPage() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [activeFilters, setActiveFilters] = useState({
    rating: 0,
    type: "all",
    amenities: [],
    governorate: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/hotels/allHotels"
        );
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);
  if (loading) return <p>Loading...</p>;

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // const hotels = [
  //   {
  //     id: 1,
  //     name: "Grand Hotel Cairo",
  //     location: "Cairo, Egypt",
  //     type: "Hotel",
  //     price: 120,
  //     rating: 4.5,
  //     reviews: 250,
  //     description: "A luxurious hotel in the heart of Cairo with stunning Nile views and world-class amenities.",
  //     images: [
  //       "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //     ],
  //     amenities: ["wifi", "parking", "pool", "restaurant"],
  //     maxGuests: 4,
  //   },
  //   {
  //     id: 2,
  //     name: "Nile View Resort & Spa",
  //     location: "Luxor, Egypt",
  //     type: "Resort",
  //     price: 180,
  //     rating: 4.7,
  //     reviews: 180,
  //     description: "Experience ancient history with modern comfort at this riverside resort featuring a full-service spa.",
  //     images: [
  //       "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //     ],
  //     amenities: ["wifi", "pool", "gym", "spa"],
  //     maxGuests: 6,
  //   },
  //   {
  //     id: 3,
  //     name: "Azure Beachfront Apartment",
  //     location: "Alexandria, Egypt",
  //     type: "Apartment",
  //     price: 90,
  //     rating: 4.2,
  //     reviews: 100,
  //     description: "Cozy yet modern apartment steps away from the beautiful Mediterranean beach with panoramic views.",
  //     images: [
  //       "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //     ],
  //     amenities: ["wifi", "parking", "airConditioning"],
  //     maxGuests: 3,
  //   },
  //   {
  //     id: 4,
  //     name: "Pyramid Vista Luxury Villa",
  //     location: "Giza, Egypt",
  //     type: "Villa",
  //     price: 300,
  //     rating: 4.9,
  //     reviews: 75,
  //     description: "Exclusive private villa with direct unobstructed views of the Great Pyramids of Giza and private pool.",
  //     images: [
  //       "https://images.unsplash.com/photo-1582719471386-3a067800a1d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //     ],
  //     amenities: ["wifi", "parking", "pool", "restaurant", "gym"],
  //     maxGuests: 8,
  //   },
  //   {
  //     id: 5,
  //     name: "The Royal Nile Suites",
  //     location: "Cairo, Egypt",
  //     type: "Hotel",
  //     price: 220,
  //     rating: 4.8,
  //     reviews: 320,
  //     description: "Five-star luxury accommodation with butler service and private balconies overlooking the Nile River.",
  //     images: [
  //       "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //     ],
  //     amenities: ["wifi", "parking", "pool", "restaurant", "spa", "airConditioning"],
  //     maxGuests: 2,
  //   },
  //   {
  //     id: 6,
  //     name: "Desert Oasis Retreat",
  //     location: "Siwa, Egypt",
  //     type: "Resort",
  //     price: 150,
  //     rating: 4.6,
  //     reviews: 95,
  //     description: "Eco-friendly luxury resort blending seamlessly with the natural beauty of the Siwa Oasis landscape.",
  //     images: [
  //       "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //     ],
  //     amenities: ["wifi", "pool", "restaurant", "spa"],
  //     maxGuests: 4,
  //   },
  // ];

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      case "parking":
        return <Car className="w-4 h-4" />;
      case "restaurant":
        return <Utensils className="w-4 h-4" />;
      case "gym":
        return <Dumbbell className="w-4 h-4" />;
      case "pool":
        return <Waves className="w-4 h-4" />;
      case "airConditioning":
        return <Snowflake className="w-4 h-4" />;
      case "spa":
        return <Waves className="w-4 h-4" />;
      default:
        return null;
    }
  };
  console.log(hotels);

  const filteredHotels = hotels.filter((hotel) => {
    if (!hotel || !hotel._id) return false; 

    // البحث
    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase();
      const searchFields = [
        hotel.name?.toLowerCase() || "",
        hotel.description?.toLowerCase() || "",
        hotel.location?.toLowerCase() || "",
      ];
      if (!searchFields.some((field) => field.includes(searchTerm))) {
        return false;
      }
    }
    
    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase();
      if (
        !hotel.name.toLowerCase().includes(searchTerm) &&
        !hotel.description.toLowerCase().includes(searchTerm) &&
        !hotel.location.toLowerCase().includes(searchTerm)
      ) {
        return false;
      }
    }

  
    const totalPrice = hotel.price + (hotel.taxes || 0);
    if (totalPrice < priceRange[0] || totalPrice > priceRange[1]) {
      return false;
    }

    
    if (activeFilters.rating > 0 && hotel.rating < activeFilters.rating) {
      return false;
    }

    if (
      activeFilters.type !== "all" &&
      hotel.type.toLowerCase() !== activeFilters.type.toLowerCase()
    ) {
      return false;
    }

   
    if (activeFilters.amenities.length > 0) {
      const hotelAmenities = hotel.amenities.map((a) => a.toLowerCase());
      const hasAllAmenities = activeFilters.amenities.every((amenity) =>
        hotelAmenities.includes(amenity.toLowerCase())
      );
      if (!hasAllAmenities) return false;
    }

  
    if (
      activeFilters.governorate !== "all" &&
      hotel.governorate.toLowerCase() !==
        activeFilters.governorate.toLowerCase()
    ) {
      return false;
    }


    return true;
  });
  const handlePriceChange = (e, thumb) => {
    const value = parseInt(e.target.value);
    setPriceRange((prev) =>
      thumb === 0 ? [value, prev[1]] : [prev[0], value]
    );
  };
  const toggleAmenityFilter = (amenity) => {
    setActiveFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };
  
  // const resetFilters = () => {
  //   setPriceRange([0, 1000]);
  //   setActiveFilters({
  //     rating: 0,
  //     type: "all",
  //     amenities: [],
  //     governorate: "all",
  //   });
  //   setSearchQuery("");
  // };
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Your Perfect Stay
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl">
            Luxury accommodations across Egypt's most beautiful destinations
          </p>
        </div>
      </div>

      <main className="container mx-auto max-w-6xl px-4 py-12">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available Stays
            </h2>
            <p className="text-gray-600">
              {filteredHotels.length} properties found
            </p>
          </div>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
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
          <div className=" hidden md:block lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm sticky top-4 border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center justify-between">
                  <span className="flex items-center">
                    <Filter className="mr-2 w-5 h-5 text-blue-600" />
                    <span className="text-gray-900">Filters</span>
                  </span>
                  <button
                    onClick={() => {
                      setPriceRange([0, 1000]);
                      setActiveFilters({
                        rating: 0,
                        type: "all",
                        amenities: [],
                        governorate: "all",
                      });
                      setSearchQuery("");
                    }}
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                  >
                    <X className="mr-1 w-4 h-4" />
                    Clear all
                  </button>
                </h3>
                <div className="space-y-6">
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
                        placeholder="Search properties..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                          className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                          style={{
                            left: `${(priceRange[0] / 1000) * 100}%`,
                            right: `${100 - (priceRange[1] / 1000) * 100}%`,
                          }}
                        ></div>
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange(e, 0)}
                          className="absolute w-full h-2 opacity-0 cursor-pointer"
                        />
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(e, 1)}
                          className="absolute w-full h-2 opacity-0 cursor-pointer"
                        />
                        <div
                          className="absolute w-4 h-4 bg-blue-600 rounded-full -ml-2 -mt-1 cursor-pointer shadow-md"
                          style={{ left: `${(priceRange[0] / 1000) * 100}%` }}
                        ></div>
                        <div
                          className="absolute w-4 h-4 bg-blue-600 rounded-full -ml-2 -mt-1 cursor-pointer shadow-md"
                          style={{ left: `${(priceRange[1] / 1000) * 100}%` }}
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
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="0">Any Rating</option>
                      <option value="3">3+ Stars</option>
                      <option value="4">4+ Stars</option>
                      <option value="5">5 Stars</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      value={activeFilters.type}
                      onChange={(e) =>
                        setActiveFilters({
                          ...activeFilters,
                          type: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Types</option>
                      <option value="hotel">Hotel</option>
                      <option value="apartment">Apartment</option>
                      <option value="resort">Resort</option>
                      <option value="villa">Villa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amenities
                    </label>
                    <div className="mt-2 space-y-3">
                      {[
                        "wifi",
                        "parking",
                        "pool",
                        "restaurant",
                        "gym",
                        "airConditioning",
                        "spa",
                      ].map((amenity) => (
                        <div key={amenity} className="flex items-center">
                          <input
                            type="checkbox"
                            id={amenity}
                            checked={activeFilters.amenities.includes(amenity)}
                            onChange={() => toggleAmenityFilter(amenity)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor={amenity}
                            className="ml-3 text-sm text-gray-700 flex items-center"
                          >
                            {getAmenityIcon(amenity)}
                            <span className="ml-2">
                              {amenity.charAt(0).toUpperCase() +
                                amenity.slice(1).replace(/([A-Z])/g, " $1")}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Governorate
                    </label>
                    <select
                      value={activeFilters.governorate}
                      onChange={(e) =>
                        setActiveFilters({
                          ...activeFilters,
                          governorate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      placeholder="Search properties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                        className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        style={{
                          left: `${(priceRange[0] / 1000) * 100}%`,
                          right: `${100 - (priceRange[1] / 1000) * 100}%`,
                        }}
                      ></div>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="absolute w-full h-2 opacity-0 cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="absolute w-full h-2 opacity-0 cursor-pointer"
                      />
                      <div
                        className="absolute w-4 h-4 bg-blue-600 rounded-full -ml-2 -mt-1 cursor-pointer shadow-md"
                        style={{ left: `${(priceRange[0] / 1000) * 100}%` }}
                      ></div>
                      <div
                        className="absolute w-4 h-4 bg-blue-600 rounded-full -ml-2 -mt-1 cursor-pointer shadow-md"
                        style={{ left: `${(priceRange[1] / 1000) * 100}%` }}
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
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="0">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={activeFilters.type}
                    onChange={(e) =>
                      setActiveFilters({
                        ...activeFilters,
                        type: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="hotel">Hotel</option>
                    <option value="apartment">Apartment</option>
                    <option value="resort">Resort</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {[
                      "wifi",
                      "parking",
                      "pool",
                      "restaurant",
                      "gym",
                      "airConditioning",
                      "spa",
                    ].map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`mobile-${amenity}`}
                          checked={activeFilters.amenities.includes(amenity)}
                          onChange={() => toggleAmenityFilter(amenity)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`mobile-${amenity}`}
                          className="ml-2 text-sm text-gray-700 flex items-center"
                        >
                          {getAmenityIcon(amenity)}
                          <span className="ml-1">
                            {amenity.charAt(0).toUpperCase() +
                              amenity.slice(1).replace(/([A-Z])/g, " $1")}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Governorate
                  </label>
                  <select
                    value={activeFilters.governorate}
                    onChange={(e) =>
                      setActiveFilters({
                        ...activeFilters,
                        governorate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Governorates</option>
                    <option value="cairo">Cairo</option>
                    <option value="alexandria">Alexandria</option>
                    <option value="giza">Giza</option>
                    <option value="luxor">Luxor</option>
                    <option value="siwa">Siwa</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => {
                    setPriceRange([0, 1000]);
                    setActiveFilters({
                      rating: 0,
                      type: "all",
                      amenities: [],
                      governorate: "all",
                    });
                    setSearchQuery("");
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Hotel Cards */}
          <div className="lg:w-3/4">
            {/* Desktop Header */}
            <div className="hidden md:block mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Available Stays
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredHotels.length} properties found in Syria
                {activeFilters.governorate !== "all" &&
                  ` • ${
                    activeFilters.governorate.charAt(0).toUpperCase() +
                    activeFilters.governorate.slice(1)
                  }`}
              </p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredHotels.map((hotel, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 flex flex-col"
                >
                  {/* Image Section - Fixed Height */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(hotel._id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full ${
                        favorites.includes(hotel._id)
                          ? "text-red-500 bg-white/90"
                          : "text-gray-400 bg-white/80 hover:text-red-500"
                      } transition-colors shadow-sm`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(hotel._id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {hotel.type}
                    </span>
                  </div>

                  {/* Content Section - Fixed Structure */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Title and Price - Fixed Height */}
                    <div className="flex justify-between items-start mb-3 min-h-[72px]">
                      <div className="pr-2">
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-1">
                          {hotel.name}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="line-clamp-1">{hotel.location}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xl font-bold text-blue-600">
                          ${hotel.price}
                        </div>
                        <div className="text-xs text-gray-500">per night</div>
                      </div>
                    </div>

                    {/* Rating - Fixed Height */}
                    <div className="flex items-center mb-4 h-5">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(hotel.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900 mr-1">
                        {hotel.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({hotel.reviews} reviews)
                      </span>
                    </div>

                    {/* Description - Fixed Height with Clamp */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                      {hotel.description}
                    </p>

                    {/* Amenities - Fixed Height with Overflow */}
                    <div
                      className="flex flex-wrap gap-2 mb-5 min-h-[40px] max-h-[60px] overflow-y-auto"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {hotel.amenities.slice(0, 4).map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-xs text-gray-700"
                        >
                          {getAmenityIcon(amenity)}
                          <span className="ml-1">
                            {amenity.charAt(0).toUpperCase() +
                              amenity.slice(1).replace(/([A-Z])/g, " $1")}
                          </span>
                        </div>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-xs text-gray-700">
                          +{hotel.amenities.length - 4} more
                        </div>
                      )}
                    </div>

                    {/* Button - Fixed Position at Bottom */}
                    <Link
                      to={`/hotels/${hotel._id}`}
                      className="mt-auto block w-full text-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2.5 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No hotels found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setPriceRange([0, 1000]);
                    setActiveFilters({
                      rating: 0,
                      type: "all",
                      amenities: [],
                      governorate: "all",
                    });
                    setSearchQuery("");
                  }}
                  className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Reset all filters
                </button>
              </div>
            )}

            {filteredHotels.length === 0 && (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setPriceRange([0, 1000]);
                    setActiveFilters({
                      rating: 0,
                      type: "all",
                      amenities: [],
                      governorate: "all",
                    });
                    setSearchQuery("");
                  }}
                  className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
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
