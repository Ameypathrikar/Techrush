import React, { useState } from "react";
import { FiCpu, FiCheckCircle } from "react-icons/fi";

export default function AIPlanner() {
  const [destination, setDestination] = useState("Goa");
  const [days, setDays] = useState(3);
  const [pace, setPace] = useState("Balanced");
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setGeneratedItinerary([
        {
          day: 1,
          title: "Arrival & Coastal Exploration",
          activities: [
            "Morning: Check-in & Breakfast at beachside cafe",
            "Afternoon: Visit Fort Aguada & Enjoy scenic lighthouse views",
            "Evening: Sunset stroll at Calangute Beach & Seafood dinner"
          ]
        },
        {
          day: 2,
          title: "Heritage & Water Sports",
          activities: [
            "Morning: Water sports at Baga Beach (Parasailing & Jet Ski)",
            "Afternoon: Explore Basilica of Bom Jesus & Old Goa Heritage",
            "Evening: Mandovi River Cruise with cultural dance performance"
          ]
        },
        {
          day: 3,
          title: "Nature & Local Bazaars",
          activities: [
            "Morning: Trip to Dudhsagar Waterfalls & Spice Plantation tour",
            "Afternoon: Traditional Goan thali lunch & Souvenir shopping at Anjuna Flea Market",
            "Evening: Relaxation at Palolem Beach"
          ]
        }
      ]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
          <FiCpu className="text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">AI Itinerary Generator</h3>
          <p className="text-xs text-slate-500">Auto-generate daily schedules based on your travel preferences</p>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">Duration (Days)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">Pace</label>
          <select
            value={pace}
            onChange={(e) => setPace(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="Relaxed">Relaxed</option>
            <option value="Balanced">Balanced</option>
            <option value="Fast-Paced">Fast-Paced</option>
          </select>
        </div>

        <div className="sm:col-span-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-teal-600/20"
          >
            {loading ? "Generating Schedule..." : "✨ Generate AI Itinerary"}
          </button>
        </div>
      </form>

      {generatedItinerary && (
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h4 className="text-sm font-extrabold text-slate-900">Recommended Plan for {destination}:</h4>
          <div className="space-y-3">
            {generatedItinerary.slice(0, days).map((item) => (
              <div key={item.day} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    Day {item.day}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">{item.title}</span>
                </div>
                <ul className="space-y-1 pt-1">
                  {item.activities.map((act, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                      <FiCheckCircle className="text-teal-500 mt-0.5 flex-shrink-0" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}