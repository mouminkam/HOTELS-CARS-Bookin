import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const HotelMap = ({ coordinates, hotelName, location }) => {
  if (!coordinates) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400 relative bg-gray-200">
        <MapPin className="w-12 h-12 text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-3 rounded-lg shadow-sm">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-blue-500 mr-2" />
            <span className="font-medium">{location}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MapContainer 
      center={[coordinates.lat, coordinates.lng]} 
      zoom={15}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[coordinates.lat, coordinates.lng]}>
        <Popup>{hotelName}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default HotelMap;