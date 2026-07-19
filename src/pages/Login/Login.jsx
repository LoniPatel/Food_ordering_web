import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, AlertCircle, User } from 'lucide-react';

export default function Login() {
  const { login, register } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (isSignUp && !name) errs.name = 'Profile display name is required';
    if (!email) errs.email = 'Email address field required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Malformed email string schema';
    if (!password) errs.password = 'Authentication credentials key signature required';
    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;
    
    if (isSignUp) {
      const outcome = register(name, email, password, role);
      if (!outcome.success) {
        setError(outcome.message);
      }
    } else {
      const outcome = login(email, password);
      if (!outcome.success) {
        setError(outcome.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800/80 p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">
            {isSignUp ? 'Registration Gateway' : 'Gateway Terminal'}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {isSignUp ? 'Create a localized client profile role' : 'Provide credential tokens to step down roles'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm flex items-center gap-3">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">Display Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-500" size={18} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                  placeholder="e.g. Gourmet Food Shop"
                />
              </div>
              {validationErrors.name && <p className="text-rose-400 text-xs mt-1.5 font-medium">{validationErrors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">Profile Mail Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-500" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                placeholder="master@test.com / user@test.com"
              />
            </div>
            {validationErrors.email && <p className="text-rose-400 text-xs mt-1.5 font-medium">{validationErrors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">Cryptographic Signature</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                placeholder="••••••"
              />
            </div>
            {validationErrors.password && <p className="text-rose-400 text-xs mt-1.5 font-medium">{validationErrors.password}</p>}
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">Access Clearance Role</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
              >
                <option value="user">Wholesale Client (User Role)</option>
                <option value="master">System Administrator (Master Role)</option>
              </select>
            </div>
          )}

          <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all uppercase tracking-wide text-xs">
            {isSignUp ? 'Create Profile & Access' : 'Authenticate & Handshake'}
          </button>
        </form>

        <div className="text-center mt-6">
          <button 
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setValidationErrors({});
            }}
            className="text-indigo-400 hover:text-indigo-300 text-xs font-medium transition-all"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
