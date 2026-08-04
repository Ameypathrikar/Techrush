import React, { useState } from "react";
import AIPlanner from "../components/planner/AIPlanner";
import BudgetCalculator from "../components/planner/BudgetCalculator";
import PackingChecklist from "../components/planner/PackingChecklist";
import ConnectivityHub from "../components/planner/ConnectivityHub";
import CompleteTripSummary from "../components/planner/CompleteTripSummary";
import { FiCalendar, FiDollarSign, FiCheckSquare, FiNavigation, FiBookmark } from "react-icons/fi";

export default function Planner() {
  const [activeTab, setActiveTab] = useState("itinerary");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 text-slate-900 dark:text-slate-100">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold mb-2">
          <FiCalendar className="text-teal-600 dark:text-teal-400" />
          <span>Smart Trip Workbench</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Trip Planner & Estimator</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Auto-generate daily activity schedules, calculate travel budgets, compare transit options, and save complete trips.
        </p>
      </div>

      {/* Workbench Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 overflow-x-auto">
        
        <button
          onClick={() => setActiveTab("itinerary")}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "itinerary"
              ? "border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <FiCalendar />
          <span>AI Itinerary Builder</span>
        </button>

        <button
          onClick={() => setActiveTab("budget")}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "budget"
              ? "border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <FiDollarSign />
          <span>Budget Estimator</span>
        </button>

        <button
          onClick={() => setActiveTab("transit")}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "transit"
              ? "border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <FiNavigation />
          <span>Transit & Connectivity</span>
        </button>

        <button
          onClick={() => setActiveTab("checklist")}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "checklist"
              ? "border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <FiCheckSquare />
          <span>Packing Checklist</span>
        </button>

        <button
          onClick={() => setActiveTab("summary")}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "summary"
              ? "border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <FiBookmark />
          <span>Saved Master Trips</span>
        </button>

      </div>

      {/* Active Tab Component */}
      <div>
        {activeTab === "itinerary" && <AIPlanner />}
        {activeTab === "budget" && <BudgetCalculator />}
        {activeTab === "transit" && <ConnectivityHub />}
        {activeTab === "checklist" && <PackingChecklist />}
        {activeTab === "summary" && <CompleteTripSummary />}
      </div>
    </div>
  );
}