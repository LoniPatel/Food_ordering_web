import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { ArrowLeft } from 'lucide-react';

export default function EditProduct({ product, onBack }) {
  const { editProduct } = useProducts();
  const [form, setForm] = useState({ name: product.name, price: product.price, description: product.description || '', image: product.image });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    editProduct(product.id, form);
    onBack();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-all">
        <ArrowLeft size={16} /> Rollback Modifications Without Storing
      </button>

      <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-xl font-black text-white uppercase tracking-wide mb-6">Modify Entity Payload Target: <span className="text-amber-400 font-mono text-sm">{product.id}</span></h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Asset Designation Label</label>
            <input 
              type="text" required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Base Cost Pricing Matrix</label>
              <input 
                type="number" required min="1" step="0.01" value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Protected Tax Schema</label>
              <input type="text" disabled value="Fixed 5.00% Standard Layer" className="w-full bg-slate-900/40 border border-slate-800 text-slate-500 rounded-xl p-3 text-sm cursor-not-allowed font-medium" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Visual Source Route Address</label>
            <input 
              type="url" value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Logistics Description</label>
            <textarea 
              rows="4" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-lg shadow-amber-500/10 transition-all">
            Overwrite Pipeline Mappings
          </button>
        </form>
      </div>
    </div>
  );
}
