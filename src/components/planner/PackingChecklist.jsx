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
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <FiCheckSquare className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Smart Packing Checklist</h3>
            <p className="text-xs text-slate-500">Categorized packing list to ensure you're fully prepared</p>
          </div>
        </div>

        {/* Progress Pill */}
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Packed</span>
            <span className="text-xs font-black text-slate-800">
              {completedCount} / {items.length} ({progressPercent}%)
            </span>
          </div>
          <div className="w-12 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-600 transition-all duration-300"
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
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value="Essentials">Essentials</option>
            <option value="Documents">Documents</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Toiletries">Toiletries</option>
            <option value="Health">Health</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full h-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <FiPlus className="text-sm" />
            <span>Add</span>
          </button>
        </div>
      </form>

      {/* Item List */}
      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            Your packing checklist is empty. Add your first item above!
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                item.checked
                  ? "bg-slate-50 border-slate-200 text-slate-400 line-through"
                  : "bg-white border-slate-200 text-slate-800 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    item.checked ? "bg-teal-600 border-teal-600 text-white" : "border-slate-300 bg-white"
                  }`}
                >
                  {item.checked && <FiCheck className="text-xs stroke-[3]" />}
                </div>
                <span className="text-xs font-semibold">{item.text}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
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