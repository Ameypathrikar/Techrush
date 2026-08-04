const places = [
  "Goa",
  "Dubai",
  "Bali",
  "Kerala",
  "Manali",
  "Ladakh",
];

export default function PopularSearches() {
  return (
    <div className="mt-8 mb-16 flex flex-wrap items-center justify-center gap-3">

      <span className="text-sm font-semibold uppercase tracking-[2px] text-cyan-300">
        🔥 Popular Searches
      </span>

      {places.map((place) => (
        <button
          key={place}
          className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:border-cyan-400 hover:bg-cyan-500"
        >
          {place}
        </button>
      ))}

    </div>
  );
}