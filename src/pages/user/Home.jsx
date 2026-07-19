import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Search, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Home({ onSelectProduct }) {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [query, setQuery] = useState('');

  const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="max-w-xl space-y-3 z-10">
          <span className="bg-indigo-500/20 border border-indigo-400/20 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-indigo-300">Wholesale Verified Supply Hub</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none">PROCURE PREMIUM INGREDIENTS AT VOLUME SCALE</h2>
          <p className="text-slate-300 text-sm">Direct fulfillment loops, automated flat rate 5% state tax computations.</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-4 text-slate-400" size={20} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Query B2B marketplace database matching standard items catalog nomenclature..."
          className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 transition-all"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl text-slate-400 font-medium">No wholesale supply matches located for string signature query.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="relative overflow-hidden aspect-video bg-slate-100">
                <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-base line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{p.description || 'No specialized metadata description allocated to item entity profile record.'}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center text-xs text-slate-500">
                    <div>Net: <span className="font-mono text-slate-800 font-medium">₹{p.price.toFixed(2)}</span></div>
                    <div>GST (5%): <span className="font-mono text-slate-800 font-medium">₹{p.gst.toFixed(2)}</span></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 block uppercase tracking-wide">Gross Price</span>
                      <span className="text-lg font-black text-indigo-600 font-mono">₹{p.finalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => onSelectProduct(p)} className="p-2.5 border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="Inspect Parameters">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => addToCart(p, 1)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 text-xs transition-all">
                        <ShoppingCart size={14}/> Procure Unit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
