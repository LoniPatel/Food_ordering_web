import React from 'react';
import { useCart } from '../../context/CartContext';
import { Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export default function Cart({ onNavigateToCheckout }) {
  const { cart, updateQuantity, removeFromCart, subtotal, totalGst, grandTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl max-w-xl mx-auto p-8 space-y-4">
        <p className="text-slate-400 font-bold tracking-wide uppercase text-sm">Active configuration procurement cart memory block is vacant.</p>
        <p className="text-xs text-slate-400">Navigate to the wholesale ingredient matrix marketplace to fill asset objects.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm divide-y divide-slate-100">
        <div className="p-5 bg-slate-50/50">
          <h3 className="font-black text-slate-900 tracking-wide uppercase text-xs">Procured Line Object Items</h3>
        </div>
        {cart.map(item => (
          <div key={item.id} className="p-5 flex items-center gap-4 flex-wrap md:flex-nowrap justify-between">
            <img src={item.image} alt="" className="w-16 h-16 object-cover rounded-xl border border-slate-100 bg-slate-50" />
            <div className="flex-1 min-w-[200px]">
              <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.name}</h4>
              <p className="text-xs font-mono text-indigo-600 mt-0.5">₹{item.finalPrice.toFixed(2)} / unit</p>
            </div>
            
            <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
              <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 text-slate-500 hover:bg-white rounded-lg transition-all"><Minus size={14}/></button>
              <span className="w-10 text-center font-bold font-mono text-xs text-slate-800">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 text-slate-500 hover:bg-white rounded-lg transition-all"><Plus size={14}/></button>
            </div>

            <div className="text-right min-w-[100px]">
              <span className="block text-xs font-bold text-slate-900 font-mono">₹{(item.finalPrice * item.quantity).toFixed(2)}</span>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-400 hover:text-rose-600 transition-all" title="Remove item">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      
      {/* Checkout summary details column */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
        <h3 className="font-bold text-slate-900 text-lg">Order Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span className="font-mono">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>GST (5%)</span>
            <span className="font-mono">₹{totalGst.toFixed(2)}</span>
          </div>
          <div className="h-px bg-slate-100"></div>
          <div className="flex justify-between text-base font-bold text-slate-950">
            <span>Total Gross</span>
            <span className="font-mono text-indigo-600 text-lg">₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
        
        <button
          onClick={onNavigateToCheckout}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3.5 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 transition-all"
        >
          Proceed to Checkout <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
