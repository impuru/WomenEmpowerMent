import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [username, setUsername] = useState('');

  const login = (user) => {
    setUsername(user);
    setIsAuthenticated(true);
    // Store both user and login status
    localStorage.setItem('adminUser', user);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loginTimestamp', new Date().toISOString());
  };

  const logout = () => {
    setUsername('');
    setIsAuthenticated(false);
    // Clear all login-related data
    localStorage.removeItem('adminUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTimestamp');
  };

  const checkAuth = () => {
    const storedUser = localStorage.getItem('adminUser');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (storedUser && isLoggedIn) {
      setUsername(storedUser);
      setIsAuthenticated(true);
      return true;
    }
    
    // Clear invalid state
    localStorage.removeItem('adminUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTimestamp');
    setIsAuthenticated(false);
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
