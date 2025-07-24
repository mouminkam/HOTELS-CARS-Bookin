import { 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Car, 
  X, 
  Clock,
  Users,
  Sparkles,
  Gauge,
  Fuel,
  Luggage,
  Shield
} from "lucide-react";

export default function CarBookingSummaryModal({ 
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
            <p className="text-gray-600">Review your car rental details</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Car Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Car className="mr-2 w-5 h-5" />
                Vehicle Details
              </h3>
              <div className="flex items-start gap-4">
                <img
                  src={bookingDetails.car.images[0]}
                  alt={bookingDetails.car.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-medium">{bookingDetails.car.name}</h4>
                  <p className="text-sm text-gray-600 capitalize">
                    {bookingDetails.car.type}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-sm">{bookingDetails.car.rating}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="flex items-center text-gray-600">
                    <Calendar className="mr-2 w-4 h-4" />
                    Pickup Date
                  </span>
                  <span>{bookingDetails.pickupDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center text-gray-600">
                    <Calendar className="mr-2 w-4 h-4" />
                    Dropoff Date
                  </span>
                  <span>{bookingDetails.dropoffDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center text-gray-600">
                    <Clock className="mr-2 w-4 h-4" />
                    Rental Duration
                  </span>
                  <span>{bookingDetails.days} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center text-gray-600">
                    <MapPin className="mr-2 w-4 h-4" />
                    Pickup Location
                  </span>
                  <span>{bookingDetails.car.pickupLocation}</span>
                </div>
              </div>
            </div>

            {/* Car Specifications */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Sparkles className="mr-2 w-5 h-5" />
                Specifications
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="flex items-center text-gray-600">
                    <Users className="mr-2 w-4 h-4" />
                    Seats
                  </span>
                  <span>{bookingDetails.car.specifications.seats}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center text-gray-600">
                    <Gauge className="mr-2 w-4 h-4" />
                    Transmission
                  </span>
                  <span className="capitalize">{bookingDetails.car.specifications.transmission}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center text-gray-600">
                    <Fuel className="mr-2 w-4 h-4" />
                    Fuel Type
                  </span>
                  <span>{bookingDetails.car.specifications.fuelType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center text-gray-600">
                    <Luggage className="mr-2 w-4 h-4" />
                    Luggage Capacity
                  </span>
                  <span>{bookingDetails.car.specifications.luggageCapacity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Included Services */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <h3 className="text-lg font-semibold mb-3">Included Services</h3>
            <div className="grid grid-cols-2 gap-2">
             {bookingDetails.car?.included?.map((service, index) => (
  <div key={index} className="flex items-center">
    <Shield className="w-4 h-4 text-green-500 mr-2" />
    <span className="text-sm">{service}</span>
  </div>
))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <h3 className="text-lg font-semibold mb-3">Price Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Car Rental ({bookingDetails.days} days)
                </span>
                <span>${bookingDetails.car.price * bookingDetails.days}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes & fees</span>
                <span>${bookingDetails.taxes}</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${bookingDetails.totalPrice}</span>
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