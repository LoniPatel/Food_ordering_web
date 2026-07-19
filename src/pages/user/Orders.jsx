import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';

export default function Orders() {
  const { orders } = useOrders();
  const { user } = useAuth();

  // Filter orders for the logged-in user
  const userOrders = orders.filter(o => o.customerName === user?.name);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Your Order Ledger</h2>
        <p className="text-slate-500 text-sm">Track real-time wholesale execution cycles and dispatch status</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        {userOrders.length === 0 ? (
          <div className="p-16 text-center text-slate-400 font-medium">No B2B transactions recorded for your business account.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                  <th className="p-4">Timestamp ID</th>
                  <th className="p-4">SKU Manifest Content</th>
                  <th className="p-4 text-center">Volume Unit Count</th>
                  <th className="p-4 text-right">Settled Gross Price</th>
                  <th className="p-4 text-center">Execution Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {userOrders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-50/50">
                    <td className="p-4">
                      <div className="font-mono text-indigo-600 font-bold">{o.id}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{o.date}</div>
                    </td>
                    <td className="p-4 font-medium text-slate-900 max-w-sm">{o.products}</td>
                    <td className="p-4 text-center font-mono">{o.quantity}</td>
                    <td className="p-4 text-right font-mono font-bold text-slate-900">₹{o.totalAmount.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        o.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : o.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'
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
