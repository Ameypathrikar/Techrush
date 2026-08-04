import React, { useState } from "react";
import { FiDollarSign, FiHome, FiNavigation, FiCoffee, FiActivity } from "react-icons/fi";

export default function BudgetCalculator() {
  const [stayCost, setStayCost] = useState(1200);
  const [transportCost, setTransportCost] = useState(500);
  const [foodCost, setFoodCost] = useState(800);
  const [activityCost, setActivityCost] = useState(500);
  const [days, setDays] = useState(3);

  const dailyTotal = Number(stayCost) + Number(transportCost) + Number(foodCost) + Number(activityCost);
  const grandTotal = dailyTotal * days;

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
          <FiDollarSign className="text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Trip Budget Estimator</h3>
          <p className="text-xs text-slate-500">Calculate estimated daily and total trip expenses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-500 mb-1">Trip Duration (Days)</label>
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
            <FiHome className="text-emerald-600" /> Accommodation / day
          </label>
          <input
            type="number"
            value={stayCost}
            onChange={(e) => setStayCost(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
            <FiNavigation className="text-teal-600" /> Transport / day
          </label>
          <input
            type="number"
            value={transportCost}
            onChange={(e) => setTransportCost(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
            <FiCoffee className="text-amber-600" /> Food & Dining / day
          </label>
          <input
            type="number"
            value={foodCost}
            onChange={(e) => setFoodCost(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
            <FiActivity className="text-purple-600" /> Activities / day
          </label>
          <input
            type="number"
            value={activityCost}
            onChange={(e) => setActivityCost(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Estimated Total ({days} Days)</span>
          <h4 className="text-2xl font-black text-slate-900">₹{grandTotal.toLocaleString()}</h4>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Daily Cost</span>
          <span className="text-sm font-extrabold text-slate-700">₹{dailyTotal.toLocaleString()} / day</span>
        </div>
      </div>
    </div>
  );
}