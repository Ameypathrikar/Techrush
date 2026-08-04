import React, { useState, useEffect } from "react";
import { 
  FiBookmark, 
  FiPrinter, 
  FiCheckCircle, 
  FiTrash2, 
  FiCalendar, 
  FiDollarSign, 
  FiNavigation, 
  FiMapPin 
} from "react-icons/fi";
import { DESTINATIONS } from "../../data/destinations";

export default function CompleteTripSummary() {
  const [savedTrips, setSavedTrips] = useState([]);
  const [selectedDestId, setSelectedDestId] = useState(DESTINATIONS[0]?.id || "manali");
  const [tripName, setTripName] = useState("My Summer Vacation");
  const [days, setDays] = useState(3);
  const [budgetTier, setBudgetTier] = useState("Standard");
  const [origin, setOrigin] = useState("Pune, Maharashtra");
  const [transitMode, setTransitMode] = useState("Flight ✈️");

  // Load saved trips from localStorage on mount
  useEffect(() => {
    const local = localStorage.getItem("tripnest_saved_trips");
    if (local) {
      try {
        setSavedTrips(JSON.parse(local));
      } catch (e) {
        console.error("Failed to parse saved trips", e);
      }
    }
  }, []);

  const activeDest = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  const handleSaveTrip = (e) => {
    e.preventDefault();
    const newTrip = {
      id: Date.now(),
      name: tripName,
      destName: activeDest.name,
      days,
      budgetTier,
      origin,
      transitMode,
      costEstimate: activeDest.costPerDay * days,
      createdAt: new Date().toLocaleDateString()
    };

    const updated = [newTrip, ...savedTrips];
    setSavedTrips(updated);
    localStorage.setItem("tripnest_saved_trips", JSON.stringify(updated));
    alert("🎉 Trip saved successfully to your dashboard!");
  };

  const handleDeleteTrip = (id) => {
    const updated = savedTrips.filter((t) => t.id !== id);
    setSavedTrips(updated);
    localStorage.setItem("tripnest_saved_trips", JSON.stringify(updated));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 text-slate-900 dark:text-slate-100">
      
      {/* Master Trip Builder Form */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-2xl border border-teal-200 dark:border-teal-800">
              <FiBookmark className="text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Master Trip Builder</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Consolidate all itinerary, transit, and budget choices into one master saved package
              </p>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <FiPrinter />
            <span>Print / PDF</span>
          </button>
        </div>

        <form onSubmit={handleSaveTrip} className="grid grid-cols-1 sm:grid-cols-12 gap-5">
          
          {/* Custom Trip Title */}
          <div className="sm:col-span-6 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Trip Package Name
            </label>
            <input
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="e.g. Summer Getaway 2026"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Destination */}
          <div className="sm:col-span-6 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Destination
            </label>
            <select
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id} className="bg-white dark:bg-slate-900">
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Starting Location */}
          <div className="sm:col-span-4 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Starting From
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Preferred Transit */}
          <div className="sm:col-span-4 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Transit Preference
            </label>
            <select
              value={transitMode}
              onChange={(e) => setTransitMode(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="Flight ✈️">Flight ✈️</option>
              <option value="Train 🚆">Train 🚆</option>
              <option value="Intercity Bus 🚌">Intercity Bus 🚌</option>
              <option value="Self-Drive 🚗">Self-Drive 🚗</option>
            </select>
          </div>

          {/* Budget Tier */}
          <div className="sm:col-span-4 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Budget Style
            </label>
            <select
              value={budgetTier}
              onChange={(e) => setBudgetTier(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="Backpacker">Backpacker 🎒</option>
              <option value="Standard">Standard 🧳</option>
              <option value="Luxury">Luxury ✨</option>
            </select>
          </div>

          <div className="sm:col-span-12 pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
            >
              <FiCheckCircle className="text-base" />
              <span>Save Complete Master Trip</span>
            </button>
          </div>

        </form>
      </div>

      {/* Saved Master Trips Gallery */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Saved Trip Packages</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold">
            {savedTrips.length} Saved
          </span>
        </h3>

        {savedTrips.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400 font-medium">
            No saved master trips yet. Use the form above to lock in your complete travel plan!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-teal-500 block">
                        Saved on {trip.createdAt}
                      </span>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                        {trip.name}
                      </h4>
                    </div>

                    <button
                      onClick={() => handleDeleteTrip(trip.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Delete saved trip"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-1.5">
                      <FiMapPin className="text-teal-500" />
                      <span>{trip.destName.split(",")[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiCalendar className="text-emerald-500" />
                      <span>{trip.days} Days</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiNavigation className="text-sky-500" />
                      <span>{trip.transitMode}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiDollarSign className="text-amber-500" />
                      <span>Est. ₹{trip.costEstimate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={handlePrint}
                    className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FiPrinter />
                    <span>Print Itinerary</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}