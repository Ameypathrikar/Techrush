import React, { useState } from "react";
import { FiBookmark, FiPrinter, FiTrash2, FiCheck, FiX, FiMapPin, FiCompass, FiDollarSign, FiCalendar } from "react-icons/fi";

export default function CompleteTripSummary() {
  const [packageName, setPackageName] = useState("My Summer Vacation");
  const [destination, setDestination] = useState("Manali, Himachal Pradesh");
  const [startingFrom, setStartingFrom] = useState("Pune, Maharashtra");
  const [transitPref, setTransitPref] = useState("Flight ✈️");
  const [budgetStyle, setBudgetStyle] = useState("Standard");

  const [activeModalTrip, setActiveModalTrip] = useState(null);

  const [savedTrips, setSavedTrips] = useState([
    {
      id: "1",
      name: "Goa Coastal Getaway",
      destination: "Goa Beaches",
      startingFrom: "Pune, Maharashtra",
      transit: "Train 🚆",
      budget: "Budget",
      date: "06-08-2026"
    }
  ]);

  const handleSaveTrip = (e) => {
    e.preventDefault();
    if (!packageName.trim() || !destination.trim()) return;

    const newTrip = {
      id: Date.now().toString(),
      name: packageName.trim(),
      destination,
      startingFrom,
      transit: transitPref,
      budget: budgetStyle,
      date: new Date().toLocaleDateString()
    };

    setSavedTrips((prev) => [newTrip, ...prev]);
    setPackageName("My New Trip Package");
  };

  const deleteTrip = (id) => {
    setSavedTrips((prev) => prev.filter((trip) => trip.id !== id));
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-8 relative">
      
      {/* 1. Master Trip Builder Card */}
      <div className="bg-white dark:bg-[#141f33] border border-slate-200 dark:border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl dark:shadow-2xl transition-colors">
        
        {/* Header Row */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 dark:border-slate-700 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 font-extrabold text-xl">
              <FiBookmark />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Master Trip Builder
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-0.5">
                Consolidate all itinerary, transit, and budget choices into one master saved package
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePrintPDF}
            className="px-4 py-2.5 bg-slate-100 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 hover:border-teal-500 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-2xl flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <FiPrinter /> Print / PDF
          </button>
        </div>

        {/* Builder Form */}
        <form onSubmit={handleSaveTrip} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Trip Package Name */}
            <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 rounded-2xl p-3 focus-within:border-teal-500/60 transition-all">
              <label className="block text-[9px] font-black uppercase text-slate-400 dark:text-slate-400 tracking-wider mb-1">
                TRIP PACKAGE NAME
              </label>
              <input
                type="text"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                placeholder="e.g. My Summer Vacation"
                className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Destination */}
            <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 rounded-2xl p-3 focus-within:border-teal-500/60 transition-all">
              <label className="block text-[9px] font-black uppercase text-slate-400 dark:text-slate-400 tracking-wider mb-1">
                DESTINATION
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer appearance-none"
              >
                <option value="Manali, Himachal Pradesh" className="bg-white dark:bg-[#141f33]">Manali, Himachal Pradesh</option>
                <option value="Goa Beaches" className="bg-white dark:bg-[#141f33]">Goa Beaches</option>
                <option value="Jaipur, Rajasthan" className="bg-white dark:bg-[#141f33]">Jaipur, Rajasthan</option>
                <option value="Udaipur, Rajasthan" className="bg-white dark:bg-[#141f33]">Udaipur, Rajasthan</option>
                <option value="Darjeeling, West Bengal" className="bg-white dark:bg-[#141f33]">Darjeeling, West Bengal</option>
              </select>
            </div>

            {/* Starting From */}
            <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 rounded-2xl p-3 focus-within:border-teal-500/60 transition-all">
              <label className="block text-[9px] font-black uppercase text-slate-400 dark:text-slate-400 tracking-wider mb-1">
                STARTING FROM
              </label>
              <input
                type="text"
                value={startingFrom}
                onChange={(e) => setStartingFrom(e.target.value)}
                placeholder="e.g. Pune, Maharashtra"
                className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Transit Preference */}
            <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 rounded-2xl p-3">
              <label className="block text-[9px] font-black uppercase text-slate-400 dark:text-slate-400 tracking-wider mb-1">
                TRANSIT PREFERENCE
              </label>
              <select
                value={transitPref}
                onChange={(e) => setTransitPref(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer appearance-none"
              >
                <option value="Flight ✈️" className="bg-white dark:bg-[#141f33]">Flight ✈️</option>
                <option value="Train 🚆" className="bg-white dark:bg-[#141f33]">Train 🚆</option>
                <option value="Bus 🚌" className="bg-white dark:bg-[#141f33]">Bus 🚌</option>
                <option value="Self-Drive 🚘" className="bg-white dark:bg-[#141f33]">Self-Drive 🚘</option>
              </select>
            </div>

            {/* Budget Style */}
            <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 rounded-2xl p-3 md:col-span-2">
              <label className="block text-[9px] font-black uppercase text-slate-400 dark:text-slate-400 tracking-wider mb-1">
                BUDGET STYLE
              </label>
              <select
                value={budgetStyle}
                onChange={(e) => setBudgetStyle(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer appearance-none"
              >
                <option value="Budget" className="bg-white dark:bg-[#141f33]">Budget (Backpacker)</option>
                <option value="Standard" className="bg-white dark:bg-[#141f33]">Standard (Mid-tier)</option>
                <option value="Luxury" className="bg-white dark:bg-[#141f33]">Luxury (Premium 5-Star)</option>
              </select>
            </div>

          </div>

          {/* Submit Save Button */}
          <button
            type="submit"
            className="w-full py-4 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/20 cursor-pointer"
          >
            <FiCheck className="text-base font-extrabold" /> Save Complete Master Trip
          </button>
        </form>

      </div>

      {/* 2. Saved Trip Packages List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Saved Trip Packages
          </h3>
          <span className="px-3 py-1 bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-[10px] font-black rounded-full uppercase tracking-wider">
            {savedTrips.length} Saved
          </span>
        </div>

        {savedTrips.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white dark:bg-[#141f33] border border-slate-200 dark:border-slate-700/80 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md transition-colors"
              >
                <div className="space-y-1.5">
                  <span className="px-2.5 py-0.5 bg-teal-50 dark:bg-teal-400/10 border border-teal-200 dark:border-teal-400/30 text-teal-700 dark:text-teal-400 text-[10px] font-black uppercase rounded-full">
                    MASTER TRIP PACKAGE • {trip.date}
                  </span>
                  <h4 className="text-base font-black text-slate-900 dark:text-white">{trip.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                    📍 {trip.destination} (From {trip.startingFrom}) • {trip.transit} • {trip.budget} Tier
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModalTrip(trip)}
                    className="px-4 py-2.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    View Schedule →
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteTrip(trip.id)}
                    className="p-2.5 bg-slate-100 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 rounded-xl transition-colors cursor-pointer"
                    title="Delete Package"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#141f33]/40 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-16 text-center space-y-3 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-2xl flex items-center justify-center mx-auto">
              🔖
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">No saved master trips yet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Use the form above to lock in your complete travel plan!
            </p>
          </div>
        )}
      </div>

      {/* 3. Schedule View Modal */}
      {activeModalTrip && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#141f33] border border-slate-200 dark:border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 bg-teal-50 dark:bg-teal-400/10 border border-teal-200 dark:border-teal-400/30 text-teal-700 dark:text-teal-400 text-[10px] font-black uppercase rounded-full">
                  SCHEDULE & ITINERARY VIEW
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">{activeModalTrip.name}</h3>
              </div>
              <button
                onClick={() => setActiveModalTrip(null)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-[#0e1726] text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Modal Content Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 p-3.5 rounded-2xl space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-400">Destination</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <FiMapPin className="text-teal-400 shrink-0" /> {activeModalTrip.destination}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 p-3.5 rounded-2xl space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-400">Starting From</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white">📍 {activeModalTrip.startingFrom}</p>
              </div>
              <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 p-3.5 rounded-2xl space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-400">Transit Mode</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <FiCompass className="text-teal-400 shrink-0" /> {activeModalTrip.transit}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 p-3.5 rounded-2xl space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-400">Budget Style</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <FiDollarSign className="text-teal-400 shrink-0" /> {activeModalTrip.budget} Tier
                </p>
              </div>
            </div>

            {/* Simulated Daily Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-400 dark:text-slate-400 tracking-wider">
                Generated Itinerary Timeline
              </h4>
              <div className="space-y-2.5">
                {[
                  { day: "Day 1", title: "Arrival & Hotel Check-in", desc: `Travel from ${activeModalTrip.startingFrom} to ${activeModalTrip.destination} via ${activeModalTrip.transit}. Evening leisure walk.` },
                  { day: "Day 2", title: "Primary Sightseeing & Exploration", desc: `Guided local tours around key attractions with ${activeModalTrip.budget.toLowerCase()} style dining.` },
                  { day: "Day 3", title: "Departure & Souvenir Shopping", desc: "Morning breakfast, local market visits, and return transit." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 rounded-2xl p-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-teal-600 dark:text-teal-400">{item.day}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold flex items-center gap-1">
                        <FiCalendar /> Confirmed
                      </span>
                    </div>
                    <h5 className="text-xs font-black text-slate-900 dark:text-white">{item.title}</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer Button */}
            <button
              onClick={() => setActiveModalTrip(null)}
              className="w-full py-3.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs rounded-2xl transition-all cursor-pointer shadow-md"
            >
              Close Schedule View
            </button>

          </div>
        </div>
      )}

    </div>
  );
}