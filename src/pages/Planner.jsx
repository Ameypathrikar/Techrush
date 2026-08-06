import React, { useState } from "react";
import { 
  FiCalendar, 
  FiDollarSign, 
  FiCompass, 
  FiCheckSquare, 
  FiBookmark 
} from "react-icons/fi";

import AIPlanner from "../components/planner/AIPlanner";
import BudgetCalculator from "../components/planner/BudgetCalculator";
import ConnectivityHub from "../components/planner/ConnectivityHub";
import PackingChecklist from "../components/planner/PackingChecklist";
import CompleteTripSummary from "../components/planner/CompleteTripSummary";

export default function Planner() {
  const [activeTab, setActiveTab] = useState("builder");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0e1726] text-slate-900 dark:text-white pt-28 pb-20 px-4 sm:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Trip Planner & Estimator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
            Auto-generate daily activity schedules, calculate travel budgets, compare transit options, and save complete trips.
          </p>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-700">
          {[
            { id: "builder", name: "AI Itinerary Builder", icon: FiCalendar },
            { id: "budget", name: "Budget Estimator", icon: FiDollarSign },
            { id: "transit", name: "Transit & Connectivity", icon: FiCompass },
            { id: "checklist", name: "Packing Checklist", icon: FiCheckSquare },
            { id: "saved", name: "Saved Master Trips", icon: FiBookmark },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-teal-400 text-slate-950 shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#141f33]"
                }`}
              >
                <Icon />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Rendering with View Callback Support */}
        <div className="transition-all">
          {activeTab === "builder" && <AIPlanner onViewSaved={() => setActiveTab("saved")} />}
          {activeTab === "budget" && <BudgetCalculator />}
          {activeTab === "transit" && <ConnectivityHub />}
          {activeTab === "checklist" && <PackingChecklist />}
          {activeTab === "saved" && <CompleteTripSummary />}
        </div>

      </div>
    </div>
  );
}