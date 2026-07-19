import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShoppingBag, ShoppingCart, LogOut } from 'lucide-react';

export const AdminLayout = ({ children, currentTab, setCurrentTab }) => {
  const { logout, user } = useAuth();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', name: 'Products Management', icon: ShoppingBag },
    { id: 'orders', name: 'System Orders', icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between">
        <div className="p-6">
          <h2 className="text-xl font-black tracking-wider text-emerald-400 mb-8 uppercase">B2B Core Panel</h2>
          <nav className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    currentTab === item.id ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6 border-t border-slate-800">
          <div className="mb-4 text-xs text-slate-500">Logged in as: <span className="text-slate-300 font-medium">{user?.name}</span></div>
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 py-2.5 rounded-xl transition-all font-semibold">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>
      
      {/* Main Content Arena */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};
