import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

// Gateways
import Splash from './pages/Splash/Splash';
import Login from './pages/Login/Login';

// Layouts
import { AdminLayout } from './layouts/AdminLayout';
import { UserLayout } from './layouts/UserLayout';

// Protections
import { ProtectedRoute } from './components/ProtectedRoute';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import Orders from './pages/admin/Orders';

// User Pages
import Home from './pages/user/Home';
import ProductDetails from './pages/user/ProductDetails';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import UserOrders from './pages/user/Orders';

function AppContent() {
  const { user, loading } = useAuth();
  const [splashComplete, setSplashComplete] = useState(false);
  const [adminTab, setAdminTab] = useState('dashboard');
  const [userTab, setUserTab] = useState('home');

  // Navigation sub-states
  const [addingProduct, setAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutActive, setCheckoutActive] = useState(false);

  // 1. Show Splash Screen first
  if (!splashComplete) {
    return <Splash onComplete={() => setSplashComplete(true)} />;
  }

  // 2. Wait if Auth session is restoring
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-emerald-400 font-mono">
        Restoring session data state mappings...
      </div>
    );
  }

  // 3. User Login gateway
  if (!user) {
    return <Login />;
  }

  // 4. Role Segregation: Admin vs. Buyer
  if (user.role === 'master') {
    return (
      <ProtectedRoute allowedRole="master">
        <AdminLayout currentTab={adminTab} setCurrentTab={(tab) => {
          setAdminTab(tab);
          setAddingProduct(false);
          setEditingProduct(null);
        }}>
          {addingProduct ? (
            <AddProduct onBack={() => setAddingProduct(false)} />
          ) : editingProduct ? (
            <EditProduct product={editingProduct} onBack={() => setEditingProduct(null)} />
          ) : adminTab === 'dashboard' ? (
            <Dashboard />
          ) : adminTab === 'products' ? (
            <Products 
              onNavigateToAdd={() => setAddingProduct(true)} 
              onNavigateToEdit={(prod) => setEditingProduct(prod)} 
            />
          ) : adminTab === 'orders' ? (
            <Orders />
          ) : null}
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  // Regular Buyer Portal
  return (
    <ProtectedRoute allowedRole="user">
      <UserLayout currentTab={userTab} setCurrentTab={(tab) => {
        setUserTab(tab);
        setSelectedProduct(null);
        setCheckoutActive(false);
      }}>
        {userTab === 'home' ? (
          selectedProduct ? (
            <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} />
          ) : (
            <Home onSelectProduct={(prod) => setSelectedProduct(prod)} />
          )
        ) : userTab === 'cart' ? (
          checkoutActive ? (
            <Checkout 
              onBack={() => setCheckoutActive(false)} 
              onOrderPlaced={() => {
                setCheckoutActive(false);
                setUserTab('orders');
              }} 
            />
          ) : (
            <Cart onNavigateToCheckout={() => setCheckoutActive(true)} />
          )
        ) : userTab === 'orders' ? (
          <UserOrders />
        ) : null}
      </UserLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <AppContent />
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
