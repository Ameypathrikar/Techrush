import React, { useState } from "react";
import { DESTINATIONS } from "../data/destinations";
import { FiMapPin, FiSearch, FiFilter, FiSun, FiDollarSign, FiUsers } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix standard Leaflet marker icons in React
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Explore() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [maxBudget, setMaxBudget] = useState(5000);
  const [selectedWeather, setSelectedWeather] = useState("All");

  const filtered = DESTINATIONS.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === "All" || dest.type === selectedType;
    const matchesBudget = dest.costPerDay <= maxBudget;
    const matchesWeather = selectedWeather === "All" || dest.weather?.type === selectedWeather;
    return matchesSearch && matchesType && matchesBudget && matchesWeather;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold mb-2">
          <FiMapPin className="text-teal-600" />
          <span>Live Interactive Map & Discovery Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Explore Destinations</h1>
        <p className="text-sm text-slate-500 mt-1">
          Search live locations, monitor weather patterns, and avoid overcrowded tourist spots.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
          <FiSearch className="text-slate-400" />
          <input
            type="text"
            placeholder="Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs font-semibold focus:outline-none"
          />
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
          <FiFilter className="text-slate-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Mountains">Mountains</option>
            <option value="Beaches">Beaches</option>
            <option value="Heritage">Heritage</option>
          </select>
        </div>

        {/* Weather Filter */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
          <FiSun className="text-slate-400" />
          <select
            value={selectedWeather}
            onChange={(e) => setSelectedWeather(e.target.value)}
            className="w-full bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
          >
            <option value="All">All Weather</option>
            <option value="Cool">Cool / Snowy</option>
            <option value="Mild">Mild / Pleasant</option>
          </select>
        </div>

        {/* Budget Slider */}
        <div className="space-y-1 px-1">
          <div className="flex justify-between text-xs font-bold text-slate-600">
            <span>Max Budget:</span>
            <span className="text-teal-600">₹{maxBudget} / day</span>
          </div>
          <input
            type="range"
            min="1000"
            max="5000"
            step="250"
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Main Grid: Interactive Map + List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Leaflet Map */}
        <div className="lg:col-span-7 h-[500px] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative">
          <MapContainer center={[20.5937, 78.9629]} zoom={5} className="w-full h-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtered.map((dest) => (
              <Marker key={dest.id} position={[dest.lat || 20, dest.lng || 78]} icon={customIcon}>
                <Popup>
                  <div className="p-1 space-y-1 text-slate-800">
                    <h4 className="font-bold text-sm">{dest.name}</h4>
                    <p className="text-xs text-slate-500">🌤️ {dest.weather?.temp} ({dest.weather?.condition})</p>
                    <p className="text-xs font-bold text-teal-600">₹{dest.costPerDay} / day</p>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white ${
                      dest.trafficStatus === "Overcrowded" ? "bg-rose-500" : "bg-emerald-500"
                    }`}>
                      {dest.trafficStatus}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Destination List Side Panel */}
        <div className="lg:col-span-5 space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
              No destinations match your filters. Try adjusting your search criteria.
            </div>
          ) : (
            filtered.map((dest) => (
              <div key={dest.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-teal-500 transition-colors">
                <img src={dest.image} alt={dest.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase text-teal-600">{dest.type}</span>
                    <span className="text-xs font-bold text-slate-900">₹{dest.costPerDay}/day</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{dest.name}</h4>
                  <p className="text-xs text-slate-500">🌤️ {dest.weather?.temp} • <span className={dest.trafficStatus === "Overcrowded" ? "text-rose-500 font-bold" : "text-emerald-600 font-bold"}>{dest.trafficStatus}</span></p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}