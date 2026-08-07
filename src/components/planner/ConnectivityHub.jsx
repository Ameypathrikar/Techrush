import React, { useState, useRef, useEffect } from "react";

// Comprehensive Source Cities Across India with GPS Coordinates
const SOURCE_CITIES = [
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567 },
  { name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777 },
  { name: "Delhi NCR", state: "Delhi", lat: 28.7041, lng: 77.1025 },
  { name: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5946 },
  { name: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867 },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639 },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714 },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873 },
  { name: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311 },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462 },
  { name: "Chandigarh", state: "Punjab/Haryana", lat: 30.7333, lng: 76.7794 },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673 },
  { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577 },
  { name: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882 }
];

// Destinations Database with Coordinates
const DESTINATIONS = [
  { 
    id: "jaipur", 
    name: "Jaipur", 
    state: "Rajasthan", 
    code: "JAI", 
    lat: 26.9124, 
    lng: 75.7873, 
    distance: "1,150 km", 
    flightDur: "1h 50m direct", 
    flightFare: "4,200", 
    trainDur: "18h Superfast", 
    trainFare: "1,200", 
    busDur: "22h AC Sleeper", 
    busFare: "1,800", 
    driveDur: "20 hrs via NH48", 
    driveFare: "6,000" 
  },
  { 
    id: "goa", 
    name: "Goa Beaches", 
    state: "Goa", 
    code: "GOI", 
    lat: 15.2993, 
    lng: 74.1240, 
    distance: "450 km", 
    flightDur: "1h 05m direct", 
    flightFare: "3,200", 
    trainDur: "9h Express", 
    trainFare: "850", 
    busDur: "10h Sleeper", 
    busFare: "1,200", 
    driveDur: "9 hrs via NH66", 
    driveFare: "3,800" 
  },
  { 
    id: "manali", 
    name: "Manali", 
    state: "Himachal Pradesh", 
    code: "KUU", 
    lat: 32.2432, 
    lng: 77.1892, 
    distance: "1,650 km", 
    flightDur: "2h 30m to Kullu", 
    flightFare: "6,500", 
    trainDur: "24h to Chandigarh", 
    trainFare: "1,600", 
    busDur: "28h Volvo", 
    busFare: "2,200", 
    driveDur: "30 hrs via NH44", 
    driveFare: "8,500" 
  },
  { 
    id: "udaipur", 
    name: "Udaipur", 
    state: "Rajasthan", 
    code: "UDR", 
    lat: 24.5854, 
    lng: 73.7125, 
    distance: "850 km", 
    flightDur: "1h 30m direct", 
    flightFare: "3,900", 
    trainDur: "15h Express", 
    trainFare: "1,100", 
    busDur: "16h Sleeper", 
    busFare: "1,500", 
    driveDur: "15 hrs via NH48", 
    driveFare: "5,000" 
  },
  { 
    id: "darjeeling", 
    name: "Darjeeling", 
    state: "West Bengal", 
    code: "IXB", 
    lat: 27.0410, 
    lng: 88.2663, 
    distance: "2,100 km", 
    flightDur: "2h 50m to Bagdogra", 
    flightFare: "7,500", 
    trainDur: "36h to NJP", 
    trainFare: "2,300", 
    busDur: "42h Sleeper", 
    busFare: "3,100", 
    driveDur: "40 hrs", 
    driveFare: "11,500" 
  }
];

export default function ConnectivityHub() {
  const [sourceInput, setSourceInput] = useState("Pune, Maharashtra");
  const [selectedSource, setSelectedSource] = useState(SOURCE_CITIES[0]);
  const [selectedDestId, setSelectedDestId] = useState("jaipur");
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);

  const sourceRef = useRef(null);
  const activeDest = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (sourceRef.current && !sourceRef.current.contains(event.target)) {
        setShowSourceDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sourceSuggestions = SOURCE_CITIES.filter((city) =>
    `${city.name}, ${city.state}`.toLowerCase().includes(sourceInput.toLowerCase())
  );

  const mapUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(
    sourceInput
  )}&daddr=${encodeURIComponent(
    `${activeDest.name}, ${activeDest.state}`
  )}&output=embed&z=6`;

  // Dynamic booking URL generators based on source and destination
  const cleanSource = sourceInput.split(",")[0].trim();
  const flightUrl = `https://www.google.com/travel/flights?q=flights+from+${encodeURIComponent(cleanSource)}+to+${encodeURIComponent(activeDest.name)}`;
  const trainUrl = `https://www.makemytrip.com/railways/`;
  const busUrl = `https://www.redbus.in/bus-tickets/${encodeURIComponent(cleanSource.toLowerCase())}-to-${encodeURIComponent(activeDest.name.toLowerCase())}`;
  const driveUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(sourceInput)}&destination=${encodeURIComponent(`${activeDest.name}, ${activeDest.state}`)}`;

  return (
    <div className="bg-white dark:bg-[#141f33] border border-slate-200 dark:border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-7 shadow-xl dark:shadow-2xl transition-colors">
      
      {/* 1. Header */}
      <div className="flex items-center gap-3.5 border-b border-slate-100 dark:border-slate-700 pb-5">
        <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold text-xl">
          ✈️
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Transit & Connectivity Hub
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-0.5">
            Compare transit routes, travel times, and estimated fare prices side by side
          </p>
        </div>
      </div>

      {/* 2. Source and Target Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* Source City Autocomplete Input */}
        <div ref={sourceRef} className="relative">
          <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 rounded-2xl p-3 focus-within:border-sky-500/60 transition-all">
            <label className="block text-[9px] font-black uppercase text-sky-600 dark:text-sky-400 tracking-wider mb-1">
              📍 STARTING FROM (CITY IN INDIA)
            </label>
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={sourceInput}
                onFocus={() => setShowSourceDropdown(true)}
                onChange={(e) => {
                  setSourceInput(e.target.value);
                  setShowSourceDropdown(true);
                }}
                placeholder="Type source city (e.g. Pune, Delhi)..."
                className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              <span className="text-sky-500 dark:text-sky-400 text-xs">🚗</span>
            </div>
          </div>

          {/* Source Autocomplete Suggestions Menu */}
          {showSourceDropdown && sourceSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#141f33] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-56 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
              {sourceSuggestions.map((city) => (
                <div
                  key={city.name}
                  onClick={() => {
                    const fullName = `${city.name}, ${city.state}`;
                    setSourceInput(fullName);
                    setSelectedSource(city);
                    setShowSourceDropdown(false);
                  }}
                  className="p-3 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-[#1c2942] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sky-500 dark:text-sky-400 text-xs">📍</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white">{city.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-300 font-medium">{city.state}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Target Destination Dropdown */}
        <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 rounded-2xl p-3 focus-within:border-sky-500/60 transition-all">
          <label className="block text-[9px] font-black uppercase text-sky-600 dark:text-sky-400 tracking-wider mb-1">
            🎯 TARGET DESTINATION
          </label>
          <select
            value={selectedDestId}
            onChange={(e) => setSelectedDestId(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer appearance-none"
          >
            {DESTINATIONS.map((dest) => (
              <option key={dest.id} value={dest.id} className="bg-white dark:bg-[#141f33] text-slate-900 dark:text-white">
                {dest.name}, {dest.state} ({dest.code})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* 3. Distance Banner */}
      <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-300">
          <span className="text-sky-500 dark:text-sky-400">🧭</span>
          <span>Approximate Distance ({sourceInput.split(",")[0]} ➔ {activeDest.name}):</span>
        </div>
        <span className="px-3 py-1 bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-black rounded-xl">
          {activeDest.distance}
        </span>
      </div>

      {/* 4. LIVE ROUTE MAP VISUALIZATION */}
      <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-2xl space-y-3 p-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse inline-block" />
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Route Visualization Map ({sourceInput.split(",")[0]} ➔ {activeDest.name})
            </h3>
          </div>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-300">Google Maps Live Directions</span>
        </div>

        <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950">
          <div className="absolute top-0 left-0 w-64 h-32 pointer-events-none z-10 bg-gradient-to-br from-slate-950/80 to-transparent sm:block hidden" />
          <iframe
            title="Transit Route Map"
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(120%)" }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>

      {/* 5. Transit Comparison Cards Grid with Dynamic Active Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* Flight Option */}
        <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4 hover:border-sky-500/40 transition-all">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              Flight ✈️
            </h3>
            <span className="px-2.5 py-1 bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-[10px] font-black rounded-lg uppercase tracking-wider">
              FASTEST
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <p className="text-slate-500 dark:text-slate-300">⏱️ Est. Duration: <strong className="text-slate-900 dark:text-white">{activeDest.flightDur}</strong></p>
            <p className="text-slate-500 dark:text-slate-300">💵 Avg. One-Way Fare: <strong className="text-teal-600 dark:text-teal-400">₹{activeDest.flightFare}</strong></p>
          </div>
          <a
            href={flightUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-white dark:bg-[#141f33] hover:bg-sky-500/20 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            Check Live Tickets ↗
          </a>
        </div>

        {/* Train Option */}
        <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4 hover:border-amber-500/40 transition-all">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              Train 🚆
            </h3>
            <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-lg uppercase tracking-wider">
              SCENIC & BUDGET
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <p className="text-slate-500 dark:text-slate-300">⏱️ Est. Duration: <strong className="text-slate-900 dark:text-white">{activeDest.trainDur}</strong></p>
            <p className="text-slate-500 dark:text-slate-300">💵 Avg. One-Way Fare: <strong className="text-teal-600 dark:text-teal-400">₹{activeDest.trainFare}</strong></p>
          </div>
          <a
            href={trainUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-white dark:bg-[#141f33] hover:bg-amber-500/20 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            Check Live Tickets ↗
          </a>
        </div>

        {/* Bus Option */}
        <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4 hover:border-purple-500/40 transition-all">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              Intercity Bus 🚌
            </h3>
            <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-black rounded-lg uppercase tracking-wider">
              OVERNIGHT
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <p className="text-slate-500 dark:text-slate-300">⏱️ Est. Duration: <strong className="text-slate-900 dark:text-white">{activeDest.busDur}</strong></p>
            <p className="text-slate-500 dark:text-slate-300">💵 Avg. One-Way Fare: <strong className="text-teal-600 dark:text-teal-400">₹{activeDest.busFare}</strong></p>
          </div>
          <a
            href={busUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-white dark:bg-[#141f33] hover:bg-purple-500/20 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            Check Live Tickets ↗
          </a>
        </div>

        {/* Self-Drive / Taxi Option */}
        <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4 hover:border-rose-500/40 transition-all">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              Self-Drive / Taxi 🚘
            </h3>
            <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-[10px] font-black rounded-lg uppercase tracking-wider">
              FLEXIBLE ROADTRIP
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <p className="text-slate-500 dark:text-slate-300">⏱️ Est. Duration: <strong className="text-slate-900 dark:text-white">{activeDest.driveDur}</strong></p>
            <p className="text-slate-500 dark:text-slate-300">💵 Avg. One-Way Fare: <strong className="text-teal-600 dark:text-teal-400">₹{activeDest.driveFare}</strong></p>
          </div>
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-white dark:bg-[#141f33] hover:bg-rose-500/20 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            Check Live Tickets ↗
          </a>
        </div>

      </div>

    </div>
  );
}