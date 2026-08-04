import React, { useState, useRef, useEffect } from "react";
import { FiCpu, FiCalendar, FiMapPin, FiClock, FiCheckCircle, FiChevronRight } from "react-icons/fi";
import { DESTINATIONS } from "../../data/destinations";

export default function AIPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [pace, setPace] = useState("Balanced");
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter destination suggestions for autocomplete
  const dropdownMatches = DESTINATIONS.filter((d) =>
    d.name.toLowerCase().includes(destination.toLowerCase()) ||
    d.type.toLowerCase().includes(destination.toLowerCase())
  );

  const handleSelectDestination = (name) => {
    setDestination(name);
    setShowDropdown(false);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!destination.trim()) return;

    setIsGenerating(true);
    setShowDropdown(false);

    // Simulate AI generation lag
    setTimeout(() => {
      const generatedDays = [];
      for (let i = 1; i <= days; i++) {
        generatedDays.push({
          day: i,
          title: `Day ${i}: Explore Key Highlights of ${destination}`,
          activities: [
            { time: "09:00 AM", activity: `Morning sightseeing & local breakfast near ${destination}` },
            { time: "01:00 PM", activity: "Traditional regional lunch at a top-rated eatery" },
            { time: "03:30 PM", activity: `${pace} pace guided landmark exploration & photo stops` },
            { time: "07:00 PM", activity: "Evening leisure, sunset point view & dinner" },
          ],
        });
      }

      setItinerary({
        destName: destination,
        duration: days,
        paceMode: pace,
        schedule: generatedDays,
      });

      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100">
      
      {/* Input Generator Panel */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div className="p-3 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-2xl border border-teal-200 dark:border-teal-800">
            <FiCpu className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Travel Itinerary Generator</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Specify your parameters to instantly construct a day-by-day travel schedule
            </p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
          
          {/* Destination Autocomplete Input */}
          <div className="md:col-span-5 space-y-1.5 relative" ref={dropdownRef}>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Destination Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Type destination (e.g., Goa, Manali)..."
                value={destination}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setShowDropdown(true);
                }}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <FiMapPin className="absolute right-4 top-3.5 text-slate-400 text-sm" />
            </div>

            {/* AUTOCOMPLETE DROPDOWN */}
            {showDropdown && destination.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
                {dropdownMatches.length === 0 ? (
                  <div className="p-3 text-center text-xs text-slate-400 font-semibold">
                    No matching destinations found. You can still type custom names!
                  </div>
                ) : (
                  dropdownMatches.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectDestination(item.name)}
                      className="p-3 hover:bg-teal-50 dark:hover:bg-teal-950/40 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">{item.type} • ₹{item.costPerDay}/day</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">🌤️ {item.weather?.temp}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Trip Duration */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Duration (Days)
            </label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value={1} className="bg-white dark:bg-slate-900">1 Day Short Trip</option>
              <option value={2} className="bg-white dark:bg-slate-900">2 Days Weekend Getaway</option>
              <option value={3} className="bg-white dark:bg-slate-900">3 Days Standard Experience</option>
              <option value={5} className="bg-white dark:bg-slate-900">5 Days Extended Exploration</option>
              <option value={7} className="bg-white dark:bg-slate-900">7 Days Full Vacation</option>
            </select>
          </div>

          {/* Pace Option */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Travel Pace
            </label>
            <select
              value={pace}
              onChange={(e) => setPace(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="Relaxed" className="bg-white dark:bg-slate-900">Relaxed</option>
              <option value="Balanced" className="bg-white dark:bg-slate-900">Balanced</option>
              <option value="Fast-Paced" className="bg-white dark:bg-slate-900">Fast-Paced</option>
            </select>
          </div>

          {/* Submit Action */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full h-[46px] bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <span>Generating...</span>
              ) : (
                <>
                  <FiCpu className="text-sm stroke-[2.5]" />
                  <span>Build</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Generated Results Output */}
      {itinerary && (
        <div className="space-y-4">
          <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-base font-black text-slate-900 dark:text-white">
                Generated Itinerary for {itinerary.destName}
              </h4>
              <p className="text-xs text-teal-700 dark:text-teal-300 font-semibold">
                {itinerary.duration} Days • {itinerary.paceMode} Pace Strategy
              </p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-teal-500 text-slate-950 rounded-full self-start sm:self-auto">
              AI Verified
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {itinerary.schedule.map((dayPlan) => (
              <div
                key={dayPlan.day}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="w-8 h-8 rounded-xl bg-teal-500 text-slate-950 font-black text-xs flex items-center justify-center">
                    {dayPlan.day}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {dayPlan.title}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dayPlan.activities.map((act, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800/80 flex items-start gap-3"
                    >
                      <FiClock className="text-teal-500 text-sm mt-0.5 flex-shrink-0" />
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-black uppercase text-teal-600 dark:text-teal-400 tracking-wider block">
                          {act.time}
                        </span>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                          {act.activity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}