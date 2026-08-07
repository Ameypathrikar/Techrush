import React, { useState, useRef, useEffect } from "react";
import WeatherBadge from "../common/WeatherBadge";
import { generateLiveItinerary } from "../../utils/geminiService";

const REAL_DESTINATIONS = [
  {
    id: "goa",
    name: "Goa Beaches",
    category: "Beaches",
    price: 1800,
    bannerImg: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    mustSeeSpots: [
      { name: "Aguada Fort", img: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=600&q=80", desc: "17th-century Portuguese stone fortress with panoramic Arabian Sea views." },
      { name: "Basilica of Bom Jesus", img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80", desc: "UNESCO World Heritage site featuring historic Baroque architecture." },
      { name: "Baga Beach Watersports", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", desc: "Famous hub for parasailing, beach shacks, and vibrant coastal nightlife." },
      { name: "Dudhsagar Waterfalls", img: "https://images.unsplash.com/photo-1546841938-16e78a623774?auto=format&fit=crop&w=600&q=80", desc: "Majestic four-tiered waterfall located on the Mandovi River boundary." }
    ]
  },
  {
    id: "jaipur",
    name: "Jaipur, Rajasthan",
    category: "Heritage",
    price: 2200,
    bannerImg: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    mustSeeSpots: [
      { name: "Amer Fort", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80", desc: "Magnificent hilltop fortress featuring artistic Hindu style elements." },
      { name: "Hawa Mahal", img: "https://images.unsplash.com/photo-1603201236596-eb1a63eb0f51?auto=format&fit=crop&w=600&q=80", desc: "Iconic Palace of Winds built with intricate pink and red sandstone." },
      { name: "City Palace", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80", desc: "Royal residence complex blending gorgeous Mughal and Rajput design." },
      { name: "Jantar Mantar", img: "https://images.unsplash.com/photo-1588159511997-89bb68ba2f75?auto=format&fit=crop&w=600&q=80", desc: "World-famous collection of architectural astronomical instruments." }
    ]
  },
  {
    id: "manali",
    name: "Manali, Himachal Pradesh",
    category: "Mountains",
    price: 2500,
    bannerImg: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    mustSeeSpots: [
      { name: "Solang Valley", img: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=600&q=80", desc: "Scenic valley renowned for adventure sports, paragliding, and snow views." },
      { name: "Hadimba Temple", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80", desc: "Historic wooden pagoda temple set inside a dense Dhungri Van Vihar forest." },
      { name: "Atal Tunnel & Sissu", img: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80", desc: "Engineering marvel leading to breathtaking mountain waterfalls." },
      { name: "Old Manali Cafes", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80", desc: "Bohemian village hub celebrated for acoustic music and peak views." }
    ]
  },
  {
    id: "darjeeling",
    name: "Darjeeling, West Bengal",
    category: "Mountains",
    price: 2300,
    bannerImg: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    mustSeeSpots: [
      { name: "Tiger Hill Sunrise", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80", desc: "Famous vantage point witnessing golden morning light over Kanchenjunga." },
      { name: "Darjeeling Toy Train", img: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=600&q=80", desc: "UNESCO World Heritage steam train weaving through mountain tracks." },
      { name: "Batasia Loop", img: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80", desc: "Spiral railway track offering sweeping views of snowy ranges." },
      { name: "Happy Valley Tea Garden", img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80", desc: "Lush rolling green tea estates producing aromatic regional brews." }
    ]
  }
];

export default function AIPlanner() {
  const [query, setQuery] = useState("");
  const [selectedDest, setSelectedDest] = useState(null);
  const [duration, setDuration] = useState("3");
  const [pace, setPace] = useState("Balanced");
  const [showMenu, setShowMenu] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiItinerary, setAiItinerary] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = REAL_DESTINATIONS.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleBuild = async () => {
    if (!query.trim()) return;
    const matched = REAL_DESTINATIONS.find((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    const destObj = matched || {
      id: "custom",
      name: query,
      category: "Custom Destination",
      price: 2000,
      bannerImg: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      mustSeeSpots: [
        { name: `${query} Scenic Overlook`, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", desc: "Popular primary viewpoint and attraction." },
        { name: `${query} Heritage Quarter`, img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80", desc: "Cultural center showcasing historical architecture." },
        { name: `${query} Nature Walk`, img: "https://images.unsplash.com/photo-1546841938-16e78a623774?auto=format&fit=crop&w=600&q=80", desc: "Scenic regional trail surrounded by natural beauty." }
      ]
    };

    setSelectedDest(destObj);
    setLoadingAi(true);
    setIsGenerated(true);

    const result = await generateLiveItinerary(destObj.name, duration, pace);
    setAiItinerary(result);
    setLoadingAi(false);
  };

  const totalDays = parseInt(duration) || 3;
  const spots = selectedDest?.mustSeeSpots || [];

  return (
    <div className="space-y-8">
      {/* Control Box */}
      <div className="bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl dark:shadow-2xl transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold">
            ✨
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">AI Travel Itinerary Generator</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Specify your parameters to instantly construct a day-by-day travel schedule</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div ref={containerRef} className="sm:col-span-5 relative">
            <div className="bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 rounded-2xl p-3 focus-within:border-teal-500/60 transition-all">
              <label className="block text-[9px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1">
                DESTINATION NAME
              </label>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={query}
                  onFocus={() => setShowMenu(true)}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowMenu(true);
                    setIsGenerated(false);
                  }}
                  placeholder="Where to? (e.g. Goa, Jaipur, Manali)"
                  className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                />
                <span className="text-teal-500 dark:text-teal-400 text-xs">📍</span>
              </div>
            </div>

            {showMenu && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                {suggestions.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => {
                      setQuery(dest.name);
                      setSelectedDest(dest);
                      setShowMenu(false);
                    }}
                    className="p-3 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-[#0f192d] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={dest.bannerImg} alt={dest.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white">{dest.name}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{dest.category} • ₹{dest.price}/day</p>
                      </div>
                    </div>
                    <WeatherBadge destinationId={dest.id} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="sm:col-span-3 bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 rounded-2xl p-3">
            <label className="block text-[9px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1">
              DURATION (DAYS)
            </label>
            <select
              value={duration}
              onChange={(e) => { setDuration(e.target.value); setIsGenerated(false); }}
              className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer appearance-none"
            >
              <option value="2" className="bg-white dark:bg-[#0b1220] text-slate-900 dark:text-white">2 Days Express Experience</option>
              <option value="3" className="bg-white dark:bg-[#0b1220] text-slate-900 dark:text-white">3 Days Standard Experience</option>
              <option value="5" className="bg-white dark:bg-[#0b1220] text-slate-900 dark:text-white">5 Days Full Exploration</option>
            </select>
          </div>

          <div className="sm:col-span-2 bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 rounded-2xl p-3">
            <label className="block text-[9px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1">
              TRAVEL PACE
            </label>
            <select
              value={pace}
              onChange={(e) => { setPace(e.target.value); setIsGenerated(false); }}
              className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer appearance-none"
            >
              <option value="Relaxed" className="bg-white dark:bg-[#0b1220] text-slate-900 dark:text-white">Relaxed</option>
              <option value="Balanced" className="bg-white dark:bg-[#0b1220] text-slate-900 dark:text-white">Balanced</option>
              <option value="Packed" className="bg-white dark:bg-[#0b1220] text-slate-900 dark:text-white">Packed</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              onClick={handleBuild}
              className="w-full py-3.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-teal-500/20"
            >
              <span>🚀</span> Build with AI
            </button>
          </div>
        </div>
      </div>

      {/* Output Timeline */}
      {isGenerated && selectedDest ? (
        <div className="space-y-6">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl h-60 bg-slate-950 flex flex-col justify-end p-6 sm:p-8">
            <img src={selectedDest.bannerImg} alt={selectedDest.name} className="absolute inset-0 w-full h-full object-cover opacity-45" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="px-3 py-1 bg-teal-400 text-slate-950 font-black text-[10px] uppercase rounded-full tracking-wider mb-2 inline-block">
                  {selectedDest.category}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white">{selectedDest.name}</h3>
                <p className="text-xs text-slate-300 font-medium mt-1">
                  {duration} Days Trip • {pace} Pace • Estimated ₹{selectedDest.price * totalDays} Total Base Budget
                </p>
              </div>
              <div className="flex items-center gap-3">
                <WeatherBadge destinationId={selectedDest.id} />
                <button className="px-4 py-2 bg-teal-400 text-slate-950 text-xs font-black rounded-xl hover:bg-teal-300 transition-all cursor-pointer shadow-lg">
                  💾 Save Master Trip
                </button>
              </div>
            </div>
          </div>

          {loadingAi ? (
            <div className="bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 rounded-3xl p-16 text-center space-y-4">
              <div className="animate-spin text-3xl mx-auto w-fit">✨</div>
              <h4 className="text-base font-black text-slate-900 dark:text-white">Gemini AI is crafting your live {pace.toLowerCase()} itinerary...</h4>
              <p className="text-xs text-slate-500">Curating verified must-see spots and dynamic pacing.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Array.from({ length: totalDays }).map((_, i) => {
                const dayNum = i + 1;
                const aiDay = aiItinerary?.[i] || {
                  title: `Day ${dayNum}: Exploration of ${selectedDest.name}`,
                  activities: [
                    { time: "09:00 AM", title: "Morning Sightseeing", desc: "Explore local landmarks and scenic views." },
                    { time: "01:00 PM", title: "Regional Culinary Lunch", desc: "Enjoy popular local food options." },
                    { time: "04:30 PM", title: "Evening Sunset Tour", desc: "Wind down with evening photography and relaxation." }
                  ]
                };
                const spot = spots[i % spots.length] || null;

                return (
                  <div key={dayNum} className="bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl transition-colors">
                    <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                      <span className="px-3 py-1 bg-teal-400 text-slate-950 font-black text-xs rounded-lg">DAY {dayNum}</span>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white">{aiDay.title}</h4>
                    </div>

                    <div className="space-y-4">
                      {aiDay.activities?.map((act, actIdx) => {
                        const isFirstActivity = actIdx === 0 && spot;
                        return (
                          <div 
                            key={actIdx} 
                            className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                              isFirstActivity 
                                ? "bg-teal-50/50 dark:bg-[#081324] border-teal-200 dark:border-teal-500/40" 
                                : "bg-slate-50 dark:bg-[#060a12] border-slate-200 dark:border-slate-800/60"
                            }`}
                          >
                            {isFirstActivity && spot.img && (
                              <div className="relative w-full sm:w-36 h-24 rounded-xl overflow-hidden shrink-0 border border-teal-500/30 shadow-md">
                                <img src={spot.img} alt={spot.name} className="w-full h-full object-cover" />
                                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-rose-500 text-white font-extrabold text-[9px] rounded-md tracking-wider shadow">
                                  🔥 MUST SEE
                                </span>
                              </div>
                            )}
                            <div className="space-y-1 flex-1">
                              <span className="px-2.5 py-0.5 bg-slate-200 dark:bg-slate-800 text-teal-700 dark:text-teal-300 font-extrabold text-[11px] rounded-md">
                                {act.time}
                              </span>
                              <h5 className="text-sm font-black text-slate-900 dark:text-white">{act.title}</h5>
                              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{act.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0b1220]/40 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-16 text-center space-y-3 transition-colors">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-2xl flex items-center justify-center mx-auto">📍</div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">Select Destination & Click Build with AI</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Choose your duration and pace (Relaxed, Balanced, or Packed) to generate custom live schedules with real destination imagery.
          </p>
        </div>
      )}
    </div>
  );
}