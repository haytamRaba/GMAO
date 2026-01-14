import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, logout as logoutService } from '../services/authService';

/**
 * Authentication Context
 * Provides authentication state and functions throughout the application
 * Manages user login state and role-based access control
 */

const AuthContext = createContext(null);

/**
 * Custom hook to use the Auth context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * AuthProvider Component
 * Wraps the application to provide authentication context
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Initialize user from localStorage on mount
   */
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  /**
   * Logout user and clear state
   */
  const logout = () => {
    logoutService();
    setUser(null);
  };

  /**
   * Check if user has specific role
   * @param {string|Array} roles - Role(s) to check
   * @returns {boolean}
   */
  const hasRole = (roles) => {
    if (!user) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    
    return user.role === roles;
  };

  /**
   * Check if user is admin
   * @returns {boolean}
   */
  const isAdmin = () => {
    return hasRole('Admin');
  };

  /**
   * Check if user can edit (Admin or Ingénieur Biomédical)
   * @returns {boolean}
   */
  const canEdit = () => {
    return hasRole(['Admin', 'Ingénieur Biomédical']);
  };

  /**
   * Check if user can manage (Admin, Ingénieur Biomédical, or Chef de Service)
   * @returns {boolean}
   */
  const canManage = () => {
    return hasRole(['Admin', 'Ingénieur Biomédical', 'Chef de Service']);
  };

  const value = {
    user,
    setUser,
    logout,
    hasRole,
    isAdmin,
    canEdit,
    canManage,
    isAuthenticated: !!user
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#667eea'
      }}>
        Chargement...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
