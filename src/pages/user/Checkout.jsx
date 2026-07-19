import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function Checkout({ onBack, onOrderPlaced }) {
  const { cart, grandTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  
  const [businessName, setBusinessName] = useState(user?.name || '');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!businessName || !address || !phone) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Place order using OrderContext
    placeOrder(businessName, cart, grandTotal);
    clearCart();
    onOrderPlaced(); // Navigate to orders ledger
  };
  
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button onClick={onBack} className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-sm font-medium transition-all">
        <ArrowLeft size={16} /> Return to Cart
      </button>
      
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Wholesale Checkout</h2>
          <p className="text-slate-500 text-sm mt-0.5">Confirm logistics and dispatch parameters</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Registered Business Name</label>
            <input 
              type="text" required value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Gourmet Food Shop"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Delivery Address (Logistics Hub)</label>
            <textarea 
              rows="3" required value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
              placeholder="Full dispatch address details..."
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Contact Authority Phone</label>
            <input 
              type="tel" required value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-4 space-y-2 text-sm text-slate-600 border border-slate-100">
            <div className="flex justify-between font-medium">
              <span>Fulfillment Total</span>
              <span className="font-mono text-slate-900 font-bold">₹{grandTotal.toFixed(2)}</span>
            </div>
            <div className="text-xs text-slate-400">Payment term: Net 30 wholesale invoice credit line.</div>
          </div>
          
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3.5 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 transition-all">
            <ShoppingBag size={16} /> Place B2B Bulk Order
          </button>
        </form>
      </div>
    </div>
  );
}
