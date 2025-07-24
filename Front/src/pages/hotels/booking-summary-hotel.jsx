import { CheckCircle, MapPin, Calendar, Users, Car, X } from "lucide-react";

export default function BookingSummaryModal({ 
  bookingDetails, 
  onClose,
  onConfirm 
}) {
  if (!bookingDetails) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Booking Summary</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <CheckCircle className="text-green-600 mx-auto mb-4 w-12 h-12" />
            <h1 className="text-2xl font-bold mb-2">Booking Confirmation</h1>
            <p className="text-gray-600">Review your booking details</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Hotel Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <MapPin className="mr-2 w-5 h-5" />
                Accommodation
              </h3>
              <div className="flex items-start gap-4">
                <img
                  src={bookingDetails.hotel.images[0]}
                  alt={bookingDetails.hotel.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-medium">{bookingDetails.hotel.name}</h4>
                  <p className="text-sm text-gray-600">{bookingDetails.hotel.location}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-sm">{bookingDetails.hotel.rating}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="flex items-center text-gray-600">
                    <Calendar className="mr-2 w-4 h-4" />
                    Check-in
                  </span>
                  <span>{bookingDetails.checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center text-gray-600">
                    <Calendar className="mr-2 w-4 h-4" />
                    Check-out
                  </span>
                  <span>{bookingDetails.checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center text-gray-600">
                    <Users className="mr-2 w-4 h-4" />
                    Guests
                  </span>
                  <span>{bookingDetails.guests}</span>
                </div>
              </div>
            </div>

            {/* Transport Details */}
            {bookingDetails.transport && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Car className="mr-2 w-5 h-5" />
                  Transport
                </h3>
                <div className="flex items-start gap-4">
                  <img
                    src={bookingDetails.transport.image}
                    alt={bookingDetails.transport.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{bookingDetails.transport.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">
                      {bookingDetails.transport.type}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span>{bookingDetails.transport.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price</span>
                    <span>${bookingDetails.transport.price}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <h3 className="text-lg font-semibold mb-3">Price Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Accommodation ({bookingDetails.nights} nights)
                </span>
                <span>${bookingDetails.hotel.price * bookingDetails.nights}</span>
              </div>
              {bookingDetails.transport && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Transport</span>
                  <span>${bookingDetails.transport.price}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Taxes & fees</span>
                <span>${bookingDetails.taxes}</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${bookingDetails.total}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onConfirm}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium"
            >
              Confirm Booking
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium"
            >
              Make Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}