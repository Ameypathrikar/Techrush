import React, { useState } from "react";
import AIPlanner from "../components/planner/AIPlanner";
import BudgetCalculator from "../components/planner/BudgetCalculator";
import PackingChecklist from "../components/planner/PackingChecklist";
import { FiCalendar, FiDollarSign, FiCheckSquare } from "react-icons/fi";

export default function Planner() {
  const [activeTab, setActiveTab] = useState("itinerary");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold mb-2">
          <FiCalendar className="text-teal-600" />
          <span>Smart Trip Workbench</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Trip Planner & Estimator</h1>
        <p className="text-sm text-slate-500 mt-1">
          Auto-generate daily activity schedules, calculate travel budgets, and organize your packing list.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab("itinerary")}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "itinerary"
              ? "border-teal-600 text-teal-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <FiCalendar />
          <span>AI Itinerary Builder</span>
        </button>

        <button
          onClick={() => setActiveTab("budget")}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "budget"
              ? "border-teal-600 text-teal-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <FiDollarSign />
          <span>Budget Estimator</span>
        </button>

        <button
          onClick={() => setActiveTab("checklist")}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "checklist"
              ? "border-teal-600 text-teal-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <FiCheckSquare />
          <span>Packing Checklist</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === "itinerary" && <AIPlanner />}
        {activeTab === "budget" && <BudgetCalculator />}
        {activeTab === "checklist" && <PackingChecklist />}
      </div>
    </div>
  );
}