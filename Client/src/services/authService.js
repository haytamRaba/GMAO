/**
 * Authentication Service
 * Handles user authentication and session management
 * Currently uses mock data - replace with actual API calls when backend is ready
 */

// import axios from "axios";
// const API_URL = "http://localhost:5000/api";

import { users } from '../utils/mockData';

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} User object with role and permissions
 */
export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Find user in mock data
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        resolve(userWithoutPassword);
      } else {
        reject(new Error('Email ou mot de passe incorrect'));
      }
    }, 500);
  });

  // Real API call (uncomment when backend is ready):
  // const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  // localStorage.setItem('user', JSON.stringify(response.data));
  // return response.data;
};

/**
 * Logout current user
 */
export const logout = () => {
  localStorage.removeItem('user');
};

/**
 * Get current user from localStorage
 * @returns {Object|null} Current user or null
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is logged in
 */
export const isAuthenticated = () => {
  return !!getCurrentUser();
};
