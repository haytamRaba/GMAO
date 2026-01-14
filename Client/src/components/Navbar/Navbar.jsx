import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProfileModal from '../ProfileModal/ProfileModal';
import './Navbar.css';
import ck from  '../../../public/ck-logo.png'; 
/**
 * Navbar Component
 * Main navigation bar with links to all pages
 * Includes user info, profile access, and logout functionality
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  /**
   * Check if current route is active
   */
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Don't show navbar on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/dashboard">
            <div className="brand-top">
              {/* <div className="logo-mark" aria-hidden="true">CHK</div> */}
              <img src={ck} alt="Hôpital Cheikh Khalifa" className="logo-mark" />
              <div>
                <h2>GMAO</h2>
                <p>Hôpital Cheikh Khalifa</p>
              </div>
            </div>
            <p className="brand-subtitle">Gestion de Maintenance Assistée par Ordinateur</p>
          </Link>
        </div>

        <div className="navbar-menu">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Tableau de bord
          </Link>
          
          <Link 
            to="/equipments" 
            className={`nav-link ${isActive('/equipments') ? 'active' : ''}`}
          >
             Équipements
          </Link>
          
          <Link 
            to="/interventions" 
            className={`nav-link ${isActive('/interventions') ? 'active' : ''}`}
          >
             Interventions
          </Link>
          
          <Link 
            to="/stock" 
            className={`nav-link ${isActive('/stock') ? 'active' : ''}`}
          >
             Stock
          </Link>
        </div>

        <div className="navbar-user">
          <div className="user-menu-container">
            <button 
              className="user-menu-toggle"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="user-avatar">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <span>{user?.name?.charAt(0)?.toUpperCase()}</span>
                )}
              </div>
              <div className="user-info">
                <span className="user-name"> {user?.name || 'Utilisateur'}</span>
                <span className="user-role">{user?.role || 'Admin'}</span>
              </div>
              <span className={`menu-arrow ${showUserMenu ? 'open' : ''}`}>▼</span>
            </button>

            {showUserMenu && (
              <div className="user-menu-dropdown">
                <button 
                  onClick={() => {
                    setIsProfileOpen(true);
                    setShowUserMenu(false);
                  }}
                  className="menu-item"
                >
                  👤 Mon Profil
                </button>
                <button 
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                    navigate('/login');
                  }}
                  className="menu-item danger"
                >
                  🚪 Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </nav>
  );
};

export default Navbar;
