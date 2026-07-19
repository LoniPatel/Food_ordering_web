import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageData, setStorageData } from '../utils/storage';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => getStorageData('b2b_orders', []));

  useEffect(() => {
    setStorageData('b2b_orders', orders);
  }, [orders]);

  const placeOrder = (customerName, items, totalAmount) => {
    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      customerName,
      products: items.map(i => `${i.name} (x${i.quantity})`).join(', '),
      quantity: items.reduce((sum, i) => sum + i.quantity, 0),
      totalAmount,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      status: 'Pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
