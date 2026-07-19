import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageData, setStorageData } from '../utils/storage';

const ProductContext = createContext();

const initialProducts = [
  { id: '1', name: 'Premium Burger Patties (Bulk)', price: 450, gst: 22.5, finalPrice: 472.5, description: 'High-quality beef patties for premium restaurants.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60' },
  { id: '2', name: 'Organic Tomato Puree x10', price: 800, gst: 40, finalPrice: 840, description: 'Rich organic tomato paste for pizza bases.', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60' },
  { id: '3', name: 'Artisan Whole Wheat Flour 25kg', price: 1200, gst: 60, finalPrice: 1260, description: 'Stoneground artisanal baking flour.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60' }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => getStorageData('b2b_products', initialProducts));

  useEffect(() => {
    setStorageData('b2b_products', products);
  }, [products]);

  const addProduct = (productData) => {
    const price = parseFloat(productData.price);
    const gst = price * 0.05;
    const finalPrice = price + gst;
    const newProduct = {
      id: Date.now().toString(),
      ...productData,
      price,
      gst,
      finalPrice,
      image: productData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60'
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const editProduct = (id, updatedData) => {
    const price = parseFloat(updatedData.price);
    const gst = price * 0.05;
    const finalPrice = price + gst;
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData, price, gst, finalPrice } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, editProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
