import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { Package, ClipboardList, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard() {
  const { products } = useProducts();
  const { orders } = useOrders();

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">SYSTEM CONSOLE OVERVIEW</h2>
        <p className="text-slate-400 text-sm mt-0.5">High-level real-time infrastructure data metrics</p>
      </div>

      {/* Analytics Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">SKUs Stored</p>
            <p className="text-3xl font-black text-white mt-1">{products.length}</p>
          </div>
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl"><Package size={24}/></div>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders Run</p>
            <p className="text-3xl font-black text-white mt-1">{orders.length}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl"><ClipboardList size={24}/></div>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Tasks</p>
            <p className="text-3xl font-black text-amber-400 mt-1">{orders.filter(o => o.status === 'Pending').length}</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><Clock size={24}/></div>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fulfilled Pipeline</p>
            <p className="text-3xl font-black text-teal-400 mt-1">{orders.filter(o => o.status === 'Delivered').length}</p>
          </div>
          <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl"><CheckCircle size={24}/></div>
        </div>
      </div>

      {/* Recent Activity Table Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800"><h3 className="font-bold text-white tracking-wide">Recent Operational Orders</h3></div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No recent transactions located inside pipeline storage.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-slate-400 text-xs font-bold uppercase border-b border-slate-800">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Target Business</th>
                  <th className="p-4">Summary</th>
                  <th className="p-4 text-right">Settled Gross</th>
                  <th className="p-4 text-center">Execution Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {recentOrders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-900/30">
                    <td className="p-4 font-mono text-emerald-400">{o.id}</td>
                    <td className="p-4 font-semibold text-white">{o.customerName}</td>
                    <td className="p-4 text-slate-400 max-w-xs truncate">{o.products}</td>
                    <td className="p-4 text-right text-slate-200 font-medium">₹{o.totalAmount.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        o.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : o.status === 'Processing' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'
                      }`}>{o.status}</span>
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
