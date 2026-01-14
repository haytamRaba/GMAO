import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Equipments from './pages/Equipments/Equipments';
import Interventions from './pages/Interventions/Interventions';
import Stock from './pages/Stock/Stock';
import './App.css';

/**
 * PrivateRoute Component
 * Protects routes that require authentication
 * Redirects to login if user is not authenticated
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

/**
 * Main App Component
 * Sets up routing, authentication, and overall application structure
 */
function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/equipments" 
          element={
            <PrivateRoute>
              <Equipments />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/interventions" 
          element={
            <PrivateRoute>
              <Interventions />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/stock" 
          element={
            <PrivateRoute>
              <Stock />
            </PrivateRoute>
          } 
        />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
