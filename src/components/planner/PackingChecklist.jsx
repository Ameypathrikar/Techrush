import React, { useState } from "react";
import { FiCheckSquare, FiPlus, FiTrash2, FiCheck } from "react-icons/fi";

export default function PackingChecklist() {
  const [items, setItems] = useState([
    { id: 1, text: "Government ID & Passport copies", checked: true, category: "Documents" },
    { id: 2, text: "Universal travel adapter & power bank", checked: false, category: "Electronics" },
    { id: 3, text: "Sunscreen & SPF lip balm", checked: true, category: "Toiletries" },
    { id: 4, text: "Weather-appropriate jacket / raincoat", checked: false, category: "Clothing" },
    { id: 5, text: "Personal medication & first aid kit", checked: false, category: "Health" },
  ]);
  const [newItem, setNewItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Essentials");

  const toggleCheck = (id) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems([
      ...items,
      { id: Date.now(), text: newItem.trim(), checked: false, category: selectedCategory },
    ]);
    setNewItem("");
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const completedCount = items.filter((i) => i.checked).length;
  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl">
            <FiCheckSquare className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Smart Packing Checklist</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Categorized packing list to ensure you're fully prepared</p>
          </div>
        </div>

        {/* Progress Pill */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Packed</span>
            <span className="text-xs font-black text-slate-800 dark:text-white">
              {completedCount} / {items.length} ({progressPercent}%)
            </span>
          </div>
          <div className="w-12 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Add Item Form */}
      <form onSubmit={addItem} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-7">
          <input
            type="text"
            placeholder="Add new item (e.g., Waterproof Camera, Sunglasses)..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value="Essentials" className="bg-white dark:bg-slate-900">Essentials</option>
            <option value="Documents" className="bg-white dark:bg-slate-900">Documents</option>
            <option value="Electronics" className="bg-white dark:bg-slate-900">Electronics</option>
            <option value="Clothing" className="bg-white dark:bg-slate-900">Clothing</option>
            <option value="Toiletries" className="bg-white dark:bg-slate-900">Toiletries</option>
            <option value="Health" className="bg-white dark:bg-slate-900">Health</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full h-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <FiPlus className="text-sm stroke-[3]" />
            <span>Add</span>
          </button>
        </div>
      </form>

      {/* Item List */}
      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            Your packing checklist is empty. Add your first item above!
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                item.checked
                  ? "bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 line-through"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    item.checked ? "bg-teal-500 border-teal-500 text-slate-950" : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  }`}
                >
                  {item.checked && <FiCheck className="text-xs stroke-[3]" />}
                </div>
                <span className="text-xs font-semibold">{item.text}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  {item.category}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(item.id);
                  }}
                  className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  title="Delete item"
                >
                  <FiTrash2 className="text-xs" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}