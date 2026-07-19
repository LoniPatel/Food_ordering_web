import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageData, setStorageData, removeStorageData } from '../utils/storage';

const AuthContext = createContext();

const defaultUsers = [
  { email: 'master@test.com', password: '123456', role: 'master', name: 'Admin Master' },
  { email: 'user@test.com', password: '123456', role: 'user', name: 'Gourmet Food Shop' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = getStorageData('auth_session', null);
    if (savedUser) setUser(savedUser);
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const existingUsers = getStorageData('b2b_registered_users', defaultUsers);
    const found = existingUsers.find(u => u.email === email && u.password === password);
    if (found) {
      const loggedUser = { email: found.email, role: found.role, name: found.name };
      setUser(loggedUser);
      setStorageData('auth_session', loggedUser);
      return { success: true, role: found.role };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const register = (name, email, password, role) => {
    const existingUsers = getStorageData('b2b_registered_users', defaultUsers);
    if (existingUsers.some(u => u.email === email)) {
      return { success: false, message: 'Email address already registered' };
    }
    const newUser = { name, email, password, role };
    const updatedUsers = [...existingUsers, newUser];
    setStorageData('b2b_registered_users', updatedUsers);

    const loggedUser = { email, role, name };
    setUser(loggedUser);
    setStorageData('auth_session', loggedUser);
    return { success: true, role };
  };

  const logout = () => {
    setUser(null);
    removeStorageData('auth_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);