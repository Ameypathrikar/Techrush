import React from "react";

export default function CrowdBadge({ status }) {
  const getBadgeStyle = () => {
    switch (status?.toLowerCase()) {
      case "overcrowded":
        return "bg-rose-500 text-white font-extrabold border-rose-400";
      case "busy":
        return "bg-amber-500 text-slate-950 font-extrabold border-amber-400";
      case "normal":
      default:
        return "bg-emerald-500 text-slate-950 font-extrabold border-emerald-400";
    }
  };

  return (
    <span
      className={`px-3 py-1 text-[11px] rounded-lg shadow-md border tracking-tight ${getBadgeStyle()}`}
    >
      {status || "Normal"}
    </span>
  );
}