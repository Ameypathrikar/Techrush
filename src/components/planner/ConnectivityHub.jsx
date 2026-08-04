import React, { useState, useRef, useEffect } from "react";
import { 
  FiNavigation, 
  FiMapPin, 
  FiSend, 
  FiClock, 
  FiDollarSign, 
  FiExternalLink,
  FiCompass 
} from "react-icons/fi";
import { DESTINATIONS } from "../../data/destinations";

// Comprehensive List of Major Indian Starting Locations
const INDIAN_CITIES = [
  "Pune, Maharashtra",
  "Mumbai, Maharashtra",
  "Delhi NCR",
  "Bengaluru, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Chandigarh, Punjab",
  "Kochi, Kerala",
  "Lucknow, Uttar Pradesh",
  "Indore, Madhya Pradesh",
  "Nagpur, Maharashtra",
  "Surat, Gujarat",
  "Patna, Bihar",
  "Bhopal, Madhya Pradesh",
  "Coimbatore, Tamil Nadu",
  "Visakhapatnam, Andhra Pradesh",
  "Guwahati, Assam"
];

export default function ConnectivityHub() {
  const [origin, setOrigin] = useState("Pune, Maharashtra");
  const [selectedDestId, setSelectedDestId] = useState(DESTINATIONS[0]?.id || "manali");
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);

  const originRef = useRef(null);
  const dest = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (originRef.current && !originRef.current.contains(event.target)) {
        setShowOriginDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter origins based on user input
  const filteredOrigins = INDIAN_CITIES.filter((city) =>
    city.toLowerCase().includes(origin.toLowerCase())
  );

  const handleSelectOrigin = (cityName) => {
    setOrigin(cityName);
    setShowOriginDropdown(false);
  };

  // Route distance approximations relative to selected destination
  const routeData = {
    manali: { dist: "1,650 km", flight: "2h 15m to Kullu + 1h taxi", flightCost: "₹5,500", train: "26h to Chandigarh + 8h bus", trainCost: "₹1,400", bus: "32h direct Volvo", busCost: "₹2,200", drive: "30 hrs via NH44", driveCost: "₹8,000" },
    goa: { dist: "440 km", flight: "1h 05m direct", flightCost: "₹2,800", train: "9h Express (Vande Bharat)", trainCost: "₹950", bus: "10h Sleeper Volvo", busCost: "₹1,100", drive: "8 hrs via NH66", driveCost: "₹3,500" },
    jaipur: { dist: "1,150 km", flight: "1h 50m direct", flightCost: "₹4,200", train: "18h Superfast", trainCost: "₹1,200", bus: "22h AC Sleeper", busCost: "₹1,800", drive: "20 hrs via NH48", driveCost: "₹6,000" },
    munnar: { dist: "1,100 km", flight: "2h to Kochi + 3h taxi", flightCost: "₹4,800", train: "22h to Ernakulam + 3h bus", trainCost: "₹1,300", bus: "24h AC Sleeper", busCost: "₹1,900", drive: "21 hrs via NH44", driveCost: "₹6,500" },
    ladakh: { dist: "2,200 km", flight: "2h 30m direct to Leh", flightCost: "₹7,500", train: "30h to Jammu + 14h taxi", trainCost: "₹2,100", bus: "Not recommended direct", busCost: "N/A", drive: "38 hrs via Manali highway", driveCost: "₹12,000" },
    udaipur: { dist: "850 km", flight: "1h 30m direct", flightCost: "₹3,800", train: "14h Express", trainCost: "₹1,100", bus: "16h AC Volvo", busCost: "₹1,400", drive: "15 hrs via NH48", driveCost: "₹4,800" },
    rishikesh: { dist: "1,450 km", flight: "2h to Dehradun + 45m taxi", flightCost: "₹5,100", train: "24h to Haridwar + 40m cab", trainCost: "₹1,350", bus: "28h Volvo Sleeper", busCost: "₹2,100", drive: "26 hrs via NH44", driveCost: "₹7,200" },
    ooty: { dist: "980 km", flight: "1h 40m to Coimbatore + 3h cab", flightCost: "₹4,500", train: "19h to Mettupalayam + Toy Train", trainCost: "₹1,250", bus: "20h AC Sleeper", busCost: "₹1,700", drive: "18 hrs via NH44", driveCost: "₹5,500" },
    varanasi: { dist: "1,300 km", flight: "2h 10m direct", flightCost: "₹4,900", train: "22h Express", trainCost: "₹1,300", bus: "26h AC Bus", busCost: "₹2,000", drive: "24 hrs via NH19", driveCost: "₹6,800" },
    andaman: { dist: "2,100 km", flight: "2h 45m direct to Port Blair", flightCost: "₹8,200", train: "N/A (Island)", trainCost: "N/A", bus: "N/A (Island)", busCost: "N/A", drive: "N/A", driveCost: "N/A" }
  };

  const currentRoute = routeData[dest.id] || routeData.manali;

  const transitOptions = [
    { type: "Flight ✈️", duration: currentRoute.flight, cost: currentRoute.flightCost, badge: "Fastest", color: "border-sky-500/30 text-sky-400 bg-sky-500/10" },
    { type: "Train 🚆", duration: currentRoute.train, cost: currentRoute.trainCost, badge: "Scenic & Budget", color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" },
    { type: "Intercity Bus 🚌", duration: currentRoute.bus, cost: currentRoute.busCost, badge: "Overnight", color: "border-amber-500/30 text-amber-400 bg-amber-500/10" },
    { type: "Self-Drive / Taxi 🚗", duration: currentRoute.drive, cost: currentRoute.driveCost, badge: "Flexible Roadtrip", color: "border-purple-500/30 text-purple-400 bg-purple-500/10" }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-900 dark:text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 rounded-2xl border border-sky-200 dark:border-sky-800">
            <FiNavigation className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Transit & Connectivity Hub</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Compare transit routes, travel times, and estimated fare prices side-by-side
            </p>
          </div>
        </div>
      </div>

      {/* Origin & Destination Control Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        
        {/* Origin Searchable Dropdown */}
        <div className="sm:col-span-5 space-y-1.5 relative" ref={originRef}>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <FiSend className="text-sky-500" />
            <span>Starting From (City in India)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={origin}
              onFocus={() => setShowOriginDropdown(true)}
              onChange={(e) => {
                setOrigin(e.target.value);
                setShowOriginDropdown(true);
              }}
              placeholder="Search origin city..."
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* AUTOCOMPLETE ORIGIN DROPDOWN */}
          {showOriginDropdown && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredOrigins.length === 0 ? (
                <div className="p-3 text-center text-xs text-slate-400 font-semibold">
                  No predefined city found. You can keep typing custom city names!
                </div>
              ) : (
                filteredOrigins.map((cityName, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectOrigin(cityName)}
                    className="p-3 hover:bg-sky-50 dark:hover:bg-sky-950/50 cursor-pointer flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    <FiMapPin className="text-sky-500 text-sm flex-shrink-0" />
                    <span>{cityName}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Target Destination Selector */}
        <div className="sm:col-span-7 space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <FiMapPin className="text-teal-500" />
            <span>Target Destination</span>
          </label>
          <select
            value={selectedDestId}
            onChange={(e) => setSelectedDestId(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            {DESTINATIONS.map((d) => (
              <option key={d.id} value={d.id} className="bg-white dark:bg-slate-900">
                {d.name} ({d.type})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Distance Summary Banner */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <FiCompass className="text-sky-500 text-base" />
          <span>Approximate Distance ({origin.split(",")[0]} ➔ {dest.name.split(",")[0]}):</span>
        </span>
        <span className="font-black text-slate-900 dark:text-white px-3 py-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {currentRoute.dist}
        </span>
      </div>

      {/* Transit Modes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {transitOptions.map((opt, idx) => (
          <div
            key={idx}
            className="p-5 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800/80 hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {opt.type}
                </h4>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${opt.color}`}>
                  {opt.badge}
                </span>
              </div>

              <div className="space-y-1.5 pt-1 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <FiClock className="text-sky-500 flex-shrink-0" />
                  <span>Est. Duration: <strong>{opt.duration}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <FiDollarSign className="text-emerald-500 flex-shrink-0" />
                  <span>Avg. One-Way Fare: <strong className="text-emerald-600 dark:text-emerald-400">{opt.cost}</strong></span>
                </div>
              </div>
            </div>

            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(`book ${opt.type.split(" ")[0]} from ${origin} to ${dest.name}`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-sky-500 hover:text-slate-950 dark:hover:bg-sky-500 dark:hover:text-slate-950 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer"
            >
              <span>Check Live Tickets</span>
              <FiExternalLink className="text-xs" />
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}