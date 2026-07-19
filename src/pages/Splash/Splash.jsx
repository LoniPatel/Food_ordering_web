import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Splash({ onComplete }) {
  const { loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading, onComplete]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4">
      <div className="space-y-4">
        <div className="h-16 w-16 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-indigo-500/20 animate-spin">
          <div className="h-8 w-8 bg-slate-950 rounded-xl"></div>
        </div>
        <h1 className="text-3xl font-black text-white tracking-widest uppercase">Food B2B Enterprise</h1>
        <p className="text-slate-500 text-sm tracking-wider uppercase font-medium">Securing local cache state storage...</p>
      </div>
    </div>
  );
}
