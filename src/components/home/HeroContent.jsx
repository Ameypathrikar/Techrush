import { FaArrowRight, FaPlay } from "react-icons/fa";

export default function HeroContent() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center text-white pt-24">

      <div className="mb-6 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 backdrop-blur-sm">
        <span className="text-sm font-semibold uppercase tracking-[3px] text-cyan-300">
          AI Powered Travel Platform
        </span>
      </div>

      <h1 className="max-w-5xl text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
        Explore the World
        <br />

        <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
          With AI
        </span>
      </h1>

      <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
        Compare destinations, estimate budgets, monitor live weather,
        generate intelligent itineraries and build complete trips in
        seconds.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-5">

        <button className="flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-semibold transition hover:scale-105">
          Explore Now
          <FaArrowRight />
        </button>

        <button className="flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-md transition hover:bg-white/20">
          <FaPlay />
          Watch Demo
        </button>

      </div>
    </div>
  );
}