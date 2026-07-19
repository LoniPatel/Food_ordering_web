import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Store, ShoppingCart, Package, LogOut } from 'lucide-react';

export const UserLayout = ({ children, currentTab, setCurrentTab }) => {
  const { logout, user } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Navigation Top Header Bar */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">FOOD<span className="text-indigo-600">B2B</span></h1>
            <nav className="flex gap-1">
              <button onClick={() => setCurrentTab('home')} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentTab === 'home' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}>
                <span className="flex items-center gap-2"><Store size={18}/> Marketplace</span>
              </button>
              <button onClick={() => setCurrentTab('orders')} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentTab === 'orders' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}>
                <span className="flex items-center gap-2"><Package size={18}/> Order Ledger</span>
              </button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentTab('cart')} className="relative p-2 text-slate-600 hover:text-indigo-600 transition-all">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <span className="text-sm font-medium text-slate-600 hidden md:inline">{user?.name}</span>
            <button onClick={logout} className="p-2 text-slate-400 hover:text-rose-600 transition-all" title="Sign Out">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>
      
      {/* Content Space Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">{children}</main>
    </div>
  );
};
