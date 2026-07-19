import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { RefreshCw } from 'lucide-react';

export default function Orders() {
  const { orders, updateOrderStatus } = useOrders();

  const statuses = ['Pending', 'Processing', 'Delivered'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">System Order Registry Ledger</h2>
        <p className="text-slate-400 text-sm">Intercept state status steps for wholesale execution cycles</p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-16 text-center text-slate-500">No transactions recorded inside central ledger storage.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-slate-400 text-xs font-bold uppercase border-b border-slate-800">
                  <th className="p-4">Timestamp ID</th>
                  <th className="p-4">Client Business Entity</th>
                  <th className="p-4">SKU Manifest Content</th>
                  <th className="p-4 text-center">Volume Unit Count</th>
                  <th className="p-4 text-right">Settled Gross Price</th>
                  <th className="p-4 text-center">Lifecycle State Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm text-slate-200">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-900/20">
                    <td className="p-4">
                      <div className="font-mono text-emerald-400 font-bold">{o.id}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{o.date}</div>
                    </td>
                    <td className="p-4 font-semibold text-white">{o.customerName}</td>
                    <td className="p-4 text-slate-400 max-w-sm">{o.products}</td>
                    <td className="p-4 text-center font-mono font-medium">{o.quantity}</td>
                    <td className="p-4 text-right font-mono text-emerald-400 font-bold">₹{o.totalAmount.toFixed(2)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        <select 
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-medium focus:outline-none focus:border-indigo-500"
                        >
                          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
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
