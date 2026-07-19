import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Search, Plus, Trash2, Edit } from 'lucide-react';

export default function Products({ onNavigateToAdd, onNavigateToEdit }) {
  const { products, deleteProduct } = useProducts();
  const [query, setQuery] = useState('');

  const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Active Catalog Inventory</h2>
          <p className="text-slate-400 text-sm">Synchronize wholesale SKU availability mappings</p>
        </div>
        <button onClick={onNavigateToAdd} className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm transition-all shadow-lg shadow-emerald-500/10">
          <Plus size={18} /> Add New B2B SKU
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-3.5 text-slate-500" size={18} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter catalog assets globally by structural name..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all"
        />
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500">Query condition returned zero matching array structures.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-slate-400 text-xs font-bold uppercase border-b border-slate-800">
                  <th className="p-4">Visual asset</th>
                  <th className="p-4">SKU Designation</th>
                  <th className="p-4 text-right">Base Net Rate</th>
                  <th className="p-4 text-right">Fixed GST (5%)</th>
                  <th className="p-4 text-right">Gross Cost</th>
                  <th className="p-4 text-center">Admin Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm text-slate-200">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-slate-900/20">
                    <td className="p-4">
                      <img src={p.image} alt="" className="w-12 h-12 object-cover rounded-xl border border-slate-800" />
                    </td>
                    <td className="p-4 font-semibold text-white max-w-xs">{p.name}</td>
                    <td className="p-4 text-right font-mono text-slate-400">₹{p.price.toFixed(2)}</td>
                    <td className="p-4 text-right font-mono text-slate-500">₹{p.gst.toFixed(2)}</td>
                    <td className="p-4 text-right font-mono font-bold text-emerald-400">₹{p.finalPrice.toFixed(2)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => onNavigateToEdit(p)} className="p-2 text-slate-400 hover:text-amber-400 transition-all" title="Modify SKU metadata">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => deleteProduct(p.id)} className="p-2 text-slate-400 hover:text-rose-500 transition-all" title="Purge database entity">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
