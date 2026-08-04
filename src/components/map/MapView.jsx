import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const getTrafficColor = (status) => {
  if (status === "Overcrowded") return "bg-red-500 text-white";
  if (status === "Busy") return "bg-amber-500 text-white";
  return "bg-emerald-500 text-white";
};

export default function MapView({ destinations = [] }) {
  const center = [20.5937, 78.9629]; // India Center

  return (
    <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
      <MapContainer center={center} zoom={5} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destinations.map((dest) => (
          <Marker key={dest.id} position={[dest.lat, dest.lng]}>
            <Popup>
              <div className="p-1 max-w-[200px]">
                <img src={dest.image} alt={dest.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">{dest.name}</h4>
                <div className="flex items-center gap-2 my-1 text-xs">
                  <span className="bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded-full">
                    🌤️ {dest.weather.temp} ({dest.weather.condition})
                  </span>
                </div>
                <div className="mt-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getTrafficColor(dest.trafficStatus)}`}>
                    Traffic: {dest.trafficStatus}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}