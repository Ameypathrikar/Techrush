import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWallet,
  FaSearch,
} from "react-icons/fa";

export default function HeroSearch() {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-2xl">

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5">
          <FaMapMarkerAlt className="text-2xl text-cyan-500" />

          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Destination
            </p>

            <input
              type="text"
              placeholder="Goa, Dubai, Bali..."
              className="mt-2 w-full bg-transparent text-lg outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5">
          <FaCalendarAlt className="text-2xl text-cyan-500" />

          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Travel Date
            </p>

            <input
              type="date"
              className="mt-2 w-full bg-transparent text-lg outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5">
          <FaWallet className="text-2xl text-cyan-500" />

          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Budget
            </p>

            <input
              type="number"
              placeholder="₹15,000"
              className="mt-2 w-full bg-transparent text-lg outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <button className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-5 text-xl font-semibold text-white transition hover:scale-105">
          <FaSearch />
          Search
        </button>

      </div>
    </div>
  );
}