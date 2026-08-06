import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import FavoriteButton from "../components/common/FavoriteButton";

// Standard Leaflet Icon
const defaultIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Highlighted Active Marker Icon
const highlightIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [35, 57],
  iconAnchor: [17, 57],
  popupAnchor: [1, -48],
  shadowSize: [50, 50]
});

const ALL_DESTINATIONS = [
  {
    id: "goa",
    name: "Goa Beaches",
    category: "BEACHES",
    weatherType: "sunny",
    price: 1800,
    weather: "28°C",
    crowd: "Busy",
    crowdColor: "text-amber-500 dark:text-amber-400",
    lat: 15.2993,
    lng: 74.124,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
    description: "Pristine beaches, Portuguese colonial heritage, and vibrant coastal culture."
  },
  {
    id: "manali",
    name: "Manali, Himachal Pradesh",
    category: "MOUNTAINS",
    weatherType: "cold",
    price: 2500,
    weather: "4°C",
    crowd: "Normal",
    crowdColor: "text-emerald-500 dark:text-emerald-400",
    lat: 32.2432,
    lng: 77.1892,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80",
    description: "Snow-capped Himalayan peaks, cedar forests, and ancient wooden temples."
  },
  {
    id: "jaipur",
    name: "Jaipur, Rajasthan",
    category: "HERITAGE",
    weatherType: "pleasant",
    price: 2200,
    weather: "22°C",
    crowd: "Overcrowded",
    crowdColor: "text-rose-500 dark:text-rose-400",
    lat: 26.9124,
    lng: 75.7873,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
    description: "Majestic hill forts, pink sandstone palaces, and vibrant royal culture."
  },
  {
    id: "udaipur",
    name: "Udaipur, Rajasthan",
    category: "HERITAGE",
    weatherType: "pleasant",
    price: 3200,
    weather: "24°C",
    crowd: "Normal",
    crowdColor: "text-emerald-500 dark:text-emerald-400",
    lat: 24.5854,
    lng: 73.7125,
    image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=600&q=80",
    description: "Known as the City of Lakes, celebrated for lavish palaces and romantic boat cruises."
  },
  {
    id: "ladakh",
    name: "Leh Ladakh, J&K",
    category: "MOUNTAINS",
    weatherType: "cold",
    price: 4500,
    weather: "10°C",
    crowd: "Normal",
    crowdColor: "text-emerald-500 dark:text-emerald-400",
    lat: 34.1526,
    lng: 77.5771,
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80",
    description: "High-desert landscape featuring pristine blue lakes, monasteries, and mountain passes."
  },
  {
    id: "munnar",
    name: "Munnar, Kerala",
    category: "MOUNTAINS",
    weatherType: "pleasant",
    price: 2100,
    weather: "18°C",
    crowd: "Normal",
    crowdColor: "text-emerald-500 dark:text-emerald-400",
    lat: 10.0889,
    lng: 77.0595,
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80",
    description: "Serene hill station in the Western Ghats surrounded by rolling tea plantations."
  },
  {
    id: "varanasi",
    name: "Varanasi Ghats, Uttar Pradesh",
    category: "HERITAGE",
    weatherType: "pleasant",
    price: 1400,
    weather: "26°C",
    crowd: "Overcrowded",
    crowdColor: "text-rose-500 dark:text-rose-400",
    lat: 25.3176,
    lng: 82.9739,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80",
    description: "Spiritual capital of India featuring ancient river ghats and evening ceremonies."
  },
  {
    id: "darjeeling",
    name: "Darjeeling, West Bengal",
    category: "MOUNTAINS",
    weatherType: "cold",
    price: 2300,
    weather: "12°C",
    crowd: "Normal",
    crowdColor: "text-emerald-500 dark:text-emerald-400",
    lat: 27.041,
    lng: 88.2663,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
    description: "Famous for its Darjeeling tea estates and panoramic Kanchenjunga sunrise views."
  },
  {
    id: "bali",
    name: "Bali, Indonesia",
    category: "BEACHES",
    weatherType: "sunny",
    price: 4500,
    weather: "30°C",
    crowd: "Busy",
    crowdColor: "text-amber-500 dark:text-amber-400",
    lat: -8.3405,
    lng: 115.092,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    description: "Tropical paradise renowned for volcanic mountains, cliffside temples, and beaches."
  },
  {
    id: "paris",
    name: "Paris, France",
    category: "HERITAGE",
    weatherType: "pleasant",
    price: 9500,
    weather: "19°C",
    crowd: "Overcrowded",
    crowdColor: "text-rose-500 dark:text-rose-400",
    lat: 48.8566,
    lng: 2.3522,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    description: "Global center for art, fashion, gastronomy, and culture featuring the Eiffel Tower."
  },
  {
    id: "tokyo",
    name: "Tokyo, Japan",
    category: "CITIES",
    weatherType: "pleasant",
    price: 11000,
    weather: "21°C",
    crowd: "Busy",
    crowdColor: "text-amber-500 dark:text-amber-400",
    lat: 35.6762,
    lng: 139.6503,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    description: "A bustling metropolis blending ultra-modern neon skyscrapers with historic temples."
  }
];

function MapController({ targetPos }) {
  const map = useMap();
  useEffect(() => {
    if (targetPos) {
      map.flyTo(targetPos, 8, { duration: 1.5 });
    }
  }, [targetPos, map]);
  return null;
}

export default function Explore() {
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("search") || "";
  const queryBudget = searchParams.get("budget");

  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWeather, setSelectedWeather] = useState("all");
  const [maxBudget, setMaxBudget] = useState(queryBudget ? parseInt(queryBudget) || 10000 : 10000);
  const [activeDest, setActiveDest] = useState(null);

  // Sync state if URL search params change
  useEffect(() => {
    if (querySearch) setSearchTerm(querySearch);
    if (queryBudget) setMaxBudget(parseInt(queryBudget) || 10000);
  }, [querySearch, queryBudget]);

  const filteredDestinations = ALL_DESTINATIONS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesWeather =
      selectedWeather === "all" ||
      item.weatherType.toLowerCase() === selectedWeather.toLowerCase();
    const matchesBudget = item.price <= maxBudget;

    return matchesSearch && matchesCategory && matchesWeather && matchesBudget;
  });

  useEffect(() => {
    if (filteredDestinations.length > 0) {
      setActiveDest(filteredDestinations[0]);
    } else {
      setActiveDest(null);
    }
  }, [searchTerm, selectedCategory, selectedWeather, maxBudget]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white px-4 sm:px-8 pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="space-y-1 pt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            Explore Destinations
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
            Search live locations, monitor weather patterns, and avoid overcrowded tourist spots.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center shadow-md dark:shadow-2xl transition-colors">
          <div className="md:col-span-4 relative">
            <FiSearch className="absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500 text-xs" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destination (e.g. Goa, Varanasi)..."
              className="w-full bg-slate-50 dark:bg-[#070b14] border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-all"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#070b14] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-all cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="beaches">Beaches</option>
              <option value="mountains">Mountains</option>
              <option value="heritage">Heritage</option>
              <option value="cities">Cities</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={selectedWeather}
              onChange={(e) => setSelectedWeather(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#070b14] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-all cursor-pointer"
            >
              <option value="all">All Weather</option>
              <option value="sunny">Sunny</option>
              <option value="pleasant">Pleasant</option>
              <option value="cold">Cold</option>
            </select>
          </div>

          <div className="md:col-span-3 space-y-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 dark:text-slate-400">
              <span>Max Budget:</span>
              <span className="text-teal-600 dark:text-teal-400 font-extrabold text-xs">₹{maxBudget} / day</span>
            </div>
            <input
              type="range"
              min="1000"
              max="15000"
              step="100"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-teal-500 dark:accent-teal-400 cursor-pointer h-1.5 bg-slate-200 dark:bg-[#070b14] rounded-lg"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Map Section */}
          <div className="lg:col-span-6 bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800/80 rounded-3xl overflow-hidden h-[520px] relative shadow-md dark:shadow-2xl z-0 transition-colors">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <MapController targetPos={activeDest ? [activeDest.lat, activeDest.lng] : null} />

              {filteredDestinations.map((dest) => {
                const isSelected = activeDest?.id === dest.id;
                return (
                  <Marker
                    key={dest.id}
                    position={[dest.lat, dest.lng]}
                    icon={isSelected ? highlightIcon : defaultIcon}
                    eventHandlers={{
                      click: () => setActiveDest(dest)
                    }}
                  >
                    <Popup>
                      <div className="w-52 overflow-hidden rounded-xl space-y-2 p-0.5">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-28 object-cover rounded-lg shadow-sm"
                        />
                        <div className="text-slate-900 space-y-1.5">
                          <p className="font-black text-sm leading-tight m-0">{dest.name}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-teal-700 uppercase font-black">{dest.category}</span>
                            <span className="text-[11px] font-extrabold bg-slate-100 px-2 py-0.5 rounded-md">₹{dest.price}/day</span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>

          {/* List Section with Favorite Button Integration */}
          <div className="lg:col-span-6 space-y-3 h-[520px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((item) => {
                const isSelected = activeDest?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveDest(item)}
                    className={`border rounded-2xl p-3.5 flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer shadow-md ${
                      isSelected
                        ? "bg-teal-50 dark:bg-[#16243f] border-teal-500 dark:border-teal-400 ring-1 ring-teal-500 dark:ring-teal-400"
                        : "bg-white dark:bg-[#0e1626] hover:bg-slate-100 dark:hover:bg-[#121c30] border-slate-200 dark:border-slate-800/80"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full rounded-xl object-cover border border-slate-200 dark:border-slate-800"
                        />
                        <div className="absolute top-1 right-1 scale-75">
                          <FavoriteButton destination={item} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase text-teal-600 dark:text-teal-400 tracking-wider">
                          {item.category}
                        </span>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-0.5">
                          <span>🌤️ {item.weather}</span>
                          <span>•</span>
                          <span className={`font-bold ${item.crowdColor}`}>
                            {item.crowd}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-slate-900 dark:text-white tracking-tight">
                        ₹{item.price}/day
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400 font-medium text-xs">
                No destinations match your search.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}