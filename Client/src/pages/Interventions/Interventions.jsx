import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import { getInterventions, createIntervention, updateIntervention, deleteIntervention } from '../../services/interventionService';
import { getEquipments } from '../../services/equipmentService';
import './Interventions.css';

/**
 * Interventions Page Component
 * Manages maintenance interventions and work orders
 * Allows creating, editing, marking as complete, and deleting interventions
 */
const Interventions = () => {
  const { user } = useAuth();
  const [interventions, setInterventions] = useState([]);
  const [filteredInterventions, setFilteredInterventions] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIntervention, setEditingIntervention] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    equipmentId: '',
    equipment: '',
    type: 'Préventive',
    description: '',
    priority: 'Moyenne',
    status: 'En attente',
    technician: '',
    date: new Date().toISOString().split('T')[0],
    estimatedDuration: ''
  });

  /**
   * Load interventions and equipments on component mount
   */
  useEffect(() => {
    loadData();
  }, []);

  /**
   * Apply filters when search term or status changes
   */
  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterStatus, interventions]);

  /**
   * Fetch interventions and equipments data
   */
  const loadData = async () => {
    try {
      setLoading(true);
      const [interventionsData, equipmentsData] = await Promise.all([
        getInterventions(),
        getEquipments()
      ]);
      setInterventions(interventionsData);
      setEquipments(equipmentsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Apply search and status filters
   */
  const applyFilters = () => {
    let filtered = [...interventions];

    if (searchTerm) {
      filtered = filtered.filter(int =>
        int.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        int.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        int.technician.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(int => int.status === filterStatus);
    }

    setFilteredInterventions(filtered);
  };

  /**
   * Open modal to add new intervention
   */
  const handleAdd = () => {
    setEditingIntervention(null);
    setFormData({
      equipmentId: '',
      equipment: '',
      type: 'Préventive',
      description: '',
      priority: 'Moyenne',
      status: 'En attente',
      technician: user?.name || '',
      date: new Date().toISOString().split('T')[0],
      estimatedDuration: ''
    });
    setIsModalOpen(true);
  };

  /**
   * Open modal to edit intervention
   */
  const handleEdit = (intervention) => {
    setEditingIntervention(intervention);
    setFormData(intervention);
    setIsModalOpen(true);
  };

  /**
   * Mark intervention as completed
   */
  const handleMarkComplete = async (intervention) => {
    try {
      await updateIntervention(intervention.id, {
        ...intervention,
        status: 'Terminée'
      });
      loadData();
    } catch (error) {
      console.error('Error updating intervention:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  /**
   * Delete intervention with confirmation
   */
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) {
      try {
        await deleteIntervention(id);
        loadData();
      } catch (error) {
        console.error('Error deleting intervention:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  /**
   * Handle form input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'equipmentId') {
      const selectedEquipment = equipments.find(eq => eq.id === parseInt(value));
      setFormData(prev => ({
        ...prev,
        equipmentId: value,
        equipment: selectedEquipment ? selectedEquipment.name : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  /**
   * Submit form to create or update intervention
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingIntervention) {
        await updateIntervention(editingIntervention.id, formData);
      } else {
        await createIntervention(formData);
      }
      
      setIsModalOpen(false);
      loadData();
    } catch (error) {
      console.error('Error saving intervention:', error);
      alert('Erreur lors de l\'enregistrement');
    }
  };

  /**
   * Table columns configuration
   */
  const columns = [
    { key: 'equipment', label: 'Équipement' },
    { key: 'type', label: 'Type' },
    { key: 'description', label: 'Description' },
    { 
      key: 'priority', 
      label: 'Priorité',
      render: (value) => (
        <span className={`priority-badge priority-${value.toLowerCase()}`}>
          {value}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'Statut',
      render: (value) => (
        <span className={`status-badge status-${value.toLowerCase().replace(/é/g, 'e').replace(/\s/g, '-')}`}>
          {value}
        </span>
      )
    },
    { key: 'technician', label: 'Technicien' },
    { 
      key: 'date', 
      label: 'Date',
      render: (value) => new Date(value).toLocaleDateString('fr-FR')
    }
  ];

  /**
   * Table actions based on user role and intervention status
   */
  const getActions = (intervention) => {
    const actions = [];

    // All users can mark as complete if intervention is in progress
    if (intervention.status === 'En cours') {
      actions.push({
        label: '✓ Terminer',
        onClick: () => handleMarkComplete(intervention),
        className: 'btn-complete'
      });
    }

    // Admin and Engineers can edit and delete
    if (user?.role === 'Admin' || user?.role === 'Ingénieur Biomédical') {
      actions.push({
        label: 'Modifier',
        onClick: handleEdit,
        className: 'btn-edit'
      });
      actions.push({
        label: 'Supprimer',
        onClick: handleDelete,
        className: 'btn-delete'
      });
    }

    return actions;
  };

  return (
    <div className="interventions-container">
      <div className="interventions-header">
        <h1>Gestion des Interventions</h1>
        {(user?.role === 'Admin' || user?.role === 'Ingénieur Biomédical' || user?.role === 'Chef de Service') && (
          <button onClick={handleAdd} className="btn-add">
             Nouvelle intervention
          </button>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="interventions-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder=" Rechercher (équipement, description, technicien...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="En cours">En cours</option>
            <option value="Terminée">Terminée</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="results-info">
        {filteredInterventions.length} intervention(s) trouvée(s)
      </div>

      {/* Interventions Table */}
      {loading ? (
        <div className="loading">Chargement des interventions...</div>
      ) : (
        <Table
          data={filteredInterventions}
          columns={columns}
          actions={getActions}
        />
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingIntervention ? 'Modifier l\'intervention' : 'Nouvelle intervention'}
      >
        <form onSubmit={handleSubmit} className="intervention-form">
          <div className="form-row">
            <div className="form-group">
              <label>Équipement *</label>
              <select
                name="equipmentId"
                value={formData.equipmentId}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionner un équipement</option>
                {equipments.map(eq => (
                  <option key={eq.id} value={eq.id}>
                    {eq.name} - {eq.serialNumber}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="Préventive">Préventive</option>
                <option value="Corrective">Corrective</option>
                <option value="Urgente">Urgente</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="3"
              placeholder="Décrire l'intervention..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priorité *</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                required
              >
                <option value="Faible">Faible</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Haute">Haute</option>
                <option value="Critique">Critique</option>
              </select>
            </div>
            <div className="form-group">
              <label>Statut *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="En attente">En attente</option>
                <option value="En cours">En cours</option>
                <option value="Terminée">Terminée</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Technicien assigné *</label>
              <input
                type="text"
                name="technician"
                value={formData.technician}
                onChange={handleInputChange}
                required
                placeholder="Nom du technicien"
              />
            </div>
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Durée estimée (heures)</label>
            <input
              type="number"
              name="estimatedDuration"
              value={formData.estimatedDuration}
              onChange={handleInputChange}
              placeholder="Ex: 2"
              min="0"
              step="0.5"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">
              Annuler
            </button>
            <button type="submit" className="btn-submit">
              {editingIntervention ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Interventions;
