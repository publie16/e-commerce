import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch(e){ return null; }
  });

  // Login function
  const login = (email, password, role = null) => {
    // demo-only: assign admin if email matches or role explicitly set
    const assignedRole = role === 'admin' || email === 'admin@demo.com' ? 'admin' : 'user';
    const mock = { id: Date.now(), email, name: email.split('@')[0], role: assignedRole };
    setUser(mock);
    localStorage.setItem('user', JSON.stringify(mock));
    return mock;
  };

  // Signup function
  const signup = (email, password, name, role = 'user') => {
    // For demo: only allow admin if email is 'admin@demo.com'
    let assignedRole = role === 'admin' && email === 'admin@demo.com' ? 'admin' : 'user';
    const mock = { id: Date.now(), email, name, role: assignedRole };
    setUser(mock);
    localStorage.setItem('user', JSON.stringify(mock));
    return mock;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
