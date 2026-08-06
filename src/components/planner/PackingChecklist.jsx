import React, { useState } from "react";
import { FiCheckSquare, FiPlus, FiTrash2 } from "react-icons/fi";

const INITIAL_ITEMS = [
  { id: "1", label: "Government ID & Passport copies", category: "Documents", checked: true },
  { id: "2", label: "Universal travel adapter & power bank", category: "Electronics", checked: false },
  { id: "3", label: "Sunscreen & SPF lip balm", category: "Toiletries", checked: true },
  { id: "4", label: "Weather-appropriate jacket / raincoat", category: "Clothing", checked: false },
  { id: "5", label: "Personal medication & first aid kit", category: "Health", checked: false }
];

export default function PackingChecklist() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [newItemText, setNewItemText] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Essentials");

  const toggleCheck = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      label: newItemText.trim(),
      category: newItemCategory,
      checked: false
    };

    setItems((prev) => [newItem, ...prev]);
    setNewItemText("");
  };

  const totalCount = items.length;
  const packedCount = items.filter((item) => item.checked).length;
  const progressPercent = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-7 shadow-xl dark:shadow-2xl transition-colors">
      
      {/* 1. Header with Live Progress Counter */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 font-extrabold text-xl">
            <FiCheckSquare />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Smart Packing Checklist
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Categorized packing list to ensure you're fully prepared
            </p>
          </div>
        </div>

        {/* Packed Progress Badge */}
        <div className="bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-3">
          <div className="text-right">
            <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider block">
              PACKED
            </span>
            <span className="text-xs font-black text-slate-900 dark:text-white">
              {packedCount} / {totalCount} ({progressPercent}%)
            </span>
          </div>
          <div className="w-16 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Add New Item Input Bar */}
      <form onSubmit={addItem} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        
        {/* Item Name Input */}
        <div className="sm:col-span-7 bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 rounded-2xl p-3 focus-within:border-teal-500/60 transition-all">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add new item (e.g. Waterproof Camera, Sunglasses)..."
            className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
        </div>

        {/* Category Select */}
        <div className="sm:col-span-3 bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 rounded-2xl p-3">
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer appearance-none"
          >
            <option value="Essentials" className="bg-white dark:bg-[#0b1220]">Essentials</option>
            <option value="Documents" className="bg-white dark:bg-[#0b1220]">Documents</option>
            <option value="Electronics" className="bg-white dark:bg-[#0b1220]">Electronics</option>
            <option value="Toiletries" className="bg-white dark:bg-[#0b1220]">Toiletries</option>
            <option value="Clothing" className="bg-white dark:bg-[#0b1220]">Clothing</option>
            <option value="Health" className="bg-white dark:bg-[#0b1220]">Health</option>
          </select>
        </div>

        {/* Add Button */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full py-3.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-teal-500/20 cursor-pointer"
          >
            <FiPlus className="text-sm font-extrabold" /> Add
          </button>
        </div>

      </form>

      {/* 3. Items List Stack */}
      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                item.checked
                  ? "bg-teal-50/60 dark:bg-teal-500/10 border-teal-300 dark:border-teal-500/30 text-slate-400 dark:text-slate-500 line-through"
                  : "bg-slate-50 dark:bg-[#060a12] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => {}}
                  className="accent-teal-400 w-4 h-4 rounded cursor-pointer shrink-0"
                />
                <span className="text-xs font-bold">{item.label}</span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-2.5 py-1 bg-slate-200 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase rounded-lg">
                  {item.category}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(item.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                  title="Delete item"
                >
                  <FiTrash2 className="text-sm" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-400 dark:text-slate-500 text-xs font-bold border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            Your packing list is empty. Add some items above!
          </div>
        )}
      </div>

    </div>
  );
}