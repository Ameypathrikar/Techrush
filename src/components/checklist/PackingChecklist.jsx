import React, { useState } from "react";
import { FiCheckSquare, FiSquare, FiPlus, FiTrash2 } from "react-icons/fi";

const INITIAL_ITEMS = [
  { id: 1, text: "Government ID / Passport", category: "Documents", packed: false },
  { id: 2, text: "Phone Charger & Power Bank", category: "Electronics", packed: true },
  { id: 3, text: "Weather Appropriate Clothing", category: "Apparel", packed: false },
  { id: 4, text: "First Aid & Medications", category: "Essentials", packed: false },
];

export default function PackingChecklist() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [newItem, setNewItem] = useState("");

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems([...items, { id: Date.now(), text: newItem, category: "Custom", packed: false }]);
    setNewItem("");
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const packedCount = items.filter(i => i.packed).length;
  const progress = items.length > 0 ? Math.round((packedCount / items.length) * 100) : 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">🧳 Trip Packing Checklist</h3>
          <p className="text-sm text-slate-500">Track your essential luggage items</p>
        </div>
        <span className="bg-teal-50 text-teal-700 font-bold px-3 py-1 rounded-full text-xs">
          {progress}% Packed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
        <div className="bg-teal-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Add Item Form */}
      <form onSubmit={addItem} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add new item (e.g., Sunscreen)..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1 transition-colors">
          <FiPlus /> Add
        </button>
      </form>

      {/* Item List */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <button onClick={() => toggleItem(item.id)} className="flex items-center gap-3 text-sm text-slate-700">
              {item.packed ? <FiCheckSquare className="text-teal-600 text-lg" /> : <FiSquare className="text-slate-400 text-lg" />}
              <span className={item.packed ? "line-through text-slate-400" : "font-medium"}>{item.text}</span>
            </button>
            <button onClick={() => deleteItem(item.id)} className="text-slate-400 hover:text-red-500 p-1">
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}