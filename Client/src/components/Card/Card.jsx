import React from 'react';
import './Card.css';

/**
 * Card Component
 * Reusable card component for displaying summary statistics on dashboard
 * 
 * @param {string} title - Card title
 * @param {number|string} value - Main value to display
 * @param {string} icon - Emoji or icon to display
 * @param {string} color - Card accent color
 * @param {string} subtitle - Optional subtitle text
 */
const Card = ({ title, value, icon, color = '#667eea', subtitle }) => {
  return (
    <div className="card" style={{ borderLeftColor: color }}>
      <div className="card-icon" style={{ backgroundColor: `${color}20` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <div className="card-value" style={{ color }}>
          {value}
        </div>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default Card;
