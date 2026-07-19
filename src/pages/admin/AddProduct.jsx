import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { ArrowLeft } from 'lucide-react';

export default function AddProduct({ onBack }) {
  const { addProduct } = useProducts();
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return alert('Complete matching constraint requirements.');
    addProduct(form);
    onBack();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-all">
        <ArrowLeft size={16} /> Return to Inventory Grid
      </button>

      <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-xl font-black text-white uppercase tracking-wide mb-6">Initialize New wholesale Asset Item</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Corporate Display Title</label>
            <input 
              type="text" required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              placeholder="e.g. Premium Avocado Oil 10L Case"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Base Cost Rate (INR)</label>
              <input 
                type="number" required min="1" step="0.01" value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Aggregated System GST</label>
              <input type="text" disabled value="Fixed 5.00% Override Layer" className="w-full bg-slate-900/40 border border-slate-800 text-slate-500 rounded-xl p-3 text-sm cursor-not-allowed font-medium" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Resource Image URI String Link</label>
            <input 
              type="url" value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Detailed Logistics Specifications Description</label>
            <textarea 
              rows="4" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              placeholder="Provide packing format metrics, moisture tolerance factors, shelf lifetime declarations..."
            />
          </div>

          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-lg shadow-emerald-500/10 transition-all">
            Commit Entity Mapping Data
          </button>
        </form>
      </div>
    </div>
  );
}
