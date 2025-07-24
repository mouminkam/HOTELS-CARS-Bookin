import { Link } from "react-router-dom";
import { CheckCircle, MapPin, Calendar, Users, Car } from "lucide-react";

export default function BookingSummaryPage() {
  const currentBooking = {
    id: 12345,
    hotel: {
      name: "Grand Hotel Cairo",
      location: "Cairo, Egypt",
      rating: 4.5,
      images: ["/placeholder.svg?height=80&width=80"],
      price: 120,
    },
    transport: {
      name: "Standard Sedan",
      type: "standard",
      price: 50,
      duration: "1 day",
    },
    checkIn: "2024-02-10",
    checkOut: "2024-02-13",
    guests: 2,
    nights: 3,
    total: 450,
    taxes: 40,
    bookedAt: "2024-02-08",
    status: "confirmed",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <CheckCircle className="text-green-600 mx-auto mb-4 w-16 h-16" />
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Booking Summary
            </h1>
            <p className="text-gray-600">
              Review your booking details before confirming.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Accommodation Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
                <MapPin className="mr-2 w-5 h-5" />
                Accommodation
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      currentBooking.hotel.images[0] ||
                      "/placeholder.svg?height=80&width=80"
                    }
                    alt={currentBooking.hotel.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {currentBooking.hotel.name}
                    </h4>
                    <p className="text-gray-600">
                      {currentBooking.hotel.location}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">
                        {currentBooking.hotel.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="my-4 border-t border-gray-200"></div>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Calendar className="mr-2 w-4 h-4" />
                      Check-in
                    </span>
                    <span>{currentBooking.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Calendar className="mr-2 w-4 h-4" />
                      Check-out
                    </span>
                    <span>{currentBooking.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Users className="mr-2 w-4 h-4" />
                      Guests
                    </span>
                    <span>{currentBooking.guests}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transport Details */}
            {currentBooking.transport && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
                  <Car className="mr-2 w-5 h-5" />
                  Transport
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {currentBooking.transport.name}
                    </h4>
                    <p className="text-gray-600">
                      {currentBooking.transport.type}
                    </p>
                  </div>
                  <div className="my-4 border-t border-gray-200"></div>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span>{currentBooking.transport.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price</span>
                      <span>${currentBooking.transport.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Price Summary
            </h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Accommodation ({currentBooking.nights} nights)</span>
                <span>
                  ${currentBooking.hotel.price * currentBooking.nights}
                </span>
              </div>
              {currentBooking.transport && (
                <div className="flex justify-between">
                  <span>Transport</span>
                  <span>${currentBooking.transport.price}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Taxes</span>
                <span>${currentBooking.taxes}</span>
              </div>
              <div className="my-2 border-t border-gray-200"></div>
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${currentBooking.total}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Link
                to="/user-orders"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium text-lg text-center"
              >
                Confirm Booking
              </Link>
              <Link
                to="/hotels/sample-hotel"
                className="block w-full border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 py-3 rounded-md font-medium text-center"
              >
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
