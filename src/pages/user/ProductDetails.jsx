import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';

export default function ProductDetails({ product, onBack }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    addToCart(product, qty);
    onBack();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={onBack} className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-sm font-medium transition-all">
        <ArrowLeft size={16} /> Return to Marketplace Index Matrix
      </button>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
          <img src={product.image} alt="" className="w-full h-full object-cover" />
        </div>
        
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{product.name}</h2>
            <div className="h-px bg-slate-100"></div>
            <p className="text-sm text-slate-500 leading-relaxed font-normal">{product.description || 'No wholesale infrastructure technical descriptions provided for current item entity mapping parameters.'}</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 space-y-2.5">
            <div className="flex justify-between text-xs font-medium text-slate-500"><span>Wholesale Item Base Base Rate:</span><span className="font-mono">₹{product.price.toFixed(2)}</span></div>
            <div className="flex justify-between text-xs font-medium text-slate-500"><span>Fixed Subsystem Tax Factor (5%):</span><span className="font-mono">₹{product.gst.toFixed(2)}</span></div>
            <div className="h-px bg-slate-200/60 my-1"></div>
            <div className="flex justify-between items-center text-sm"><span className="font-bold text-slate-800">Aggregated Net Gross Rate:</span><span className="text-xl font-black text-indigo-600 font-mono">₹{product.finalPrice.toFixed(2)}</span></div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
              <button disabled={qty <= 1} onClick={() => setQty(qty - 1)} className="p-2 text-slate-500 hover:bg-white rounded-lg transition-all disabled:opacity-40"><Minus size={16}/></button>
              <span className="w-12 text-center font-bold font-mono text-sm text-slate-800">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2 text-slate-500 hover:bg-white rounded-lg transition-all"><Plus size={16}/></button>
            </div>
            
            <button onClick={handleAdd} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3.5 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 transition-all">
              <ShoppingCart size={16}/> Allocate Units into Active Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
