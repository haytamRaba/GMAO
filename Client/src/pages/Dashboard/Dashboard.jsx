import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card/Card';
import { getEquipments } from '../../services/equipmentService';
import { getInterventions } from '../../services/interventionService';
import { getStockItems } from '../../services/stockService';
import './Dashboard.css';

/**
 * Dashboard Page Component
 * Displays summary statistics and key metrics for the GMAO system
 * Shows equipment count, ongoing interventions, stock alerts, and recent activities
 */
const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEquipments: 0,
    ongoingInterventions: 0,
    stockAlerts: 0,
    completedInterventions: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Load dashboard data on component mount
   */
  useEffect(() => {
    loadDashboardData();
  }, []);

  /**
   * Fetch and calculate dashboard statistics
   */
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch data from services
      const equipments = await getEquipments();
      const interventions = await getInterventions();
      const stockItems = await getStockItems();

      // Calculate statistics
      const ongoing = interventions.filter(i => i.status === 'En cours').length;
      const completed = interventions.filter(i => i.status === 'Terminée').length;
      const alerts = stockItems.filter(item => item.quantity <= item.minQuantity).length;

      setStats({
        totalEquipments: equipments.length,
        ongoingInterventions: ongoing,
        stockAlerts: alerts,
        completedInterventions: completed
      });

      // Get recent activities (last 5 interventions)
      const recent = interventions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
      setRecentActivities(recent);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get status badge class based on intervention status
   */
  const getStatusClass = (status) => {
    switch (status) {
      case 'En cours':
        return 'status-ongoing';
      case 'Terminée':
        return 'status-completed';
      case 'En attente':
        return 'status-pending';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Chargement des données...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Tableau de Bord</h1>
        <p>Bienvenue, <strong>{user?.name || 'Utilisateur'}</strong> - {user?.role || 'Admin'}</p>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard-stats">
        <Card
          title="Total Équipements"
          value={stats.totalEquipments}
          icon="T"
          color="#0ea5e9"
        />
        <Card
          title="Interventions en cours"
          value={stats.ongoingInterventions}
            icon="I"
          color="#f59e0b"
        />
        <Card
          title="Alertes Stock"
          value={stats.stockAlerts}
          icon="!"
          color="#ef4444"
        />
        <Card
          title="Interventions terminées"
          value={stats.completedInterventions}
          icon="V"
          color="#0f766e"
        />
      </div>

      {/* Recent Activities */}
      <div className="dashboard-section">
        <h2>Activités Récentes</h2>
        <div className="activities-list">
          {recentActivities.length === 0 ? (
            <p className="no-data">Aucune activité récente</p>
          ) : (
            recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.status === 'Terminée' ? '✅' : 'Encours' }
                </div>
                <div className="activity-content">
                  <h4>{activity.equipment}</h4>
                  <p>{activity.description}</p>
                  <div className="activity-meta">
                    <span className="activity-technician">👤 {activity.technician}</span>
                    <span className="activity-date">📅 {new Date(activity.date).toLocaleDateString('fr-FR')}</span>
                    <span className={`activity-status ${getStatusClass(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions - Role-based */}
      {(user?.role === 'Admin' || user?.role === 'Ingénieur Biomédical') && (
        <div className="dashboard-section">
          <h2>Actions Rapides</h2>
          <div className="quick-actions">
            <button className="action-btn">
          
              Nouvel Équipement
            </button>
            <button className="action-btn">
             
              Nouvelle Intervention
            </button>
            <button className="action-btn">
            
              Gérer Stock
            </button>
            <button className="action-btn">
             
              Rapports
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
