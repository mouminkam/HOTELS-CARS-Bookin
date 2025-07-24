import React from "react";
import { X, Users, Gauge, Star, ChevronDown } from "lucide-react";

export default function CarSelectionModal({
  onClose,
  onSelectCar,
  cars = [],
  filters,
  setFilters,
  sort,
  setSort,
}) {
  const filteredCars = cars
    .filter((car) => {
      if (
        filters.type !== "all" &&
        car.type?.toLowerCase() !== filters.type.toLowerCase()
      ) {
        return false;
      }
      if (
        filters.feature &&
        (!Array.isArray(car.features) ||
          !car.features
            .map((f) => f.toLowerCase())
            .includes(filters.feature.toLowerCase()))
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "price") return a.price - b.price; // سعر من الأقل للأعلى
      return 0;
    })
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-white border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Select Your Car</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 pb-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Car Type */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Car Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="w-full pl-3 pr-10 py-2.5 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="all">All Types</option>
                <option value="suv">SUV</option>
                <option value="compact">Compact</option>
                <option value="electric">Electric</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Features */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Features
              </label>
              <select
                value={filters.feature}
                onChange={(e) =>
                  setFilters({ ...filters, feature: e.target.value })
                }
                className="w-full pl-3 pr-10 py-2.5 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">All Features</option>
                <option value="navigation">Navigation</option>
                <option value="bluetooth">Bluetooth</option>
                <option value="massageSeats">Massage Seats</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort By */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Sort By
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="none">No Sort</option>
                <option value="rating">Highest Rating</option>
                <option value="price">Price (Low to High)</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Car Cards */}
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <div
                  key={car._id}
                  onClick={() => {
                    onSelectCar(car);
                    onClose();
                  }}
                  className="group flex flex-col border border-gray-200 rounded-xl p-5 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={car.images[0] || "/car-placeholder.jpg"}
                        alt={car.name}
                        className="w-full h-full rounded-lg object-cover border border-gray-100"
                        onError={(e) => {
                          e.target.src = "/car-placeholder.jpg";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate text-lg font-bold text-gray-900 group-hover:text-blue-600">
                        {car.name}
                      </h4>
                      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600 gap-3">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {car.specifications?.seats ?? "N/A"} seats
                        </span>
                        <span className="flex items-center">
                          <Gauge className="w-4 h-4 mr-1" />
                          {car.specifications?.transmission ?? "N/A"}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          {car.rating}
                        </span>
                      </div>
                    </div>
                    <div className="whitespace-nowrap text-lg font-bold text-blue-600">
                      ${car.price}
                      <span className="ml-1 text-xs font-normal text-gray-500">
                        /day
                      </span>
                    </div>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {car.features?.slice(0, 4).map((f) => (
                      <span
                        key={f}
                        className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full"
                      >
                        {f.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    ))}
                    {car.features?.length > 4 && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                        +{car.features.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <X className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mb-1 text-lg font-medium text-gray-900">
                  No cars available
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setFilters({ type: "all", feature: "" });
                    setSort("none");
                  }}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
