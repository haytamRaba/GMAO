import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import { getEquipments, createEquipment, updateEquipment, deleteEquipment } from '../../services/equipmentService';
import './Equipments.css';

/**
 * Equipments Page Component
 * Manages the list of medical equipment with CRUD operations
 * Includes search, filter, add, edit, and delete functionalities
 */
const Equipments = () => {
  const { user } = useAuth();
  const [equipments, setEquipments] = useState([]);
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    serialNumber: '',
    manufacturer: '',
    location: '',
    status: 'Opérationnel',
    purchaseDate: '',
    warrantyEnd: ''
  });

  /**
   * Load equipments on component mount
   */
  useEffect(() => {
    loadEquipments();
  }, []);

  /**
   * Apply filters when search term or filter status changes
   */
  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterStatus, equipments]);

  /**
   * Fetch all equipments from service
   */
  const loadEquipments = async () => {
    try {
      setLoading(true);
      const data = await getEquipments();
      setEquipments(data);
    } catch (error) {
      console.error('Error loading equipments:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Apply search and filter to equipments list
   */
  const applyFilters = () => {
    let filtered = [...equipments];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(eq =>
        eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(eq => eq.status === filterStatus);
    }

    setFilteredEquipments(filtered);
  };

  /**
   * Open modal for adding new equipment
   */
  const handleAdd = () => {
    setEditingEquipment(null);
    setFormData({
      name: '',
      type: '',
      serialNumber: '',
      manufacturer: '',
      location: '',
      status: 'Opérationnel',
      purchaseDate: '',
      warrantyEnd: ''
    });
    setIsModalOpen(true);
  };

  /**
   * Open modal for editing existing equipment
   */
  const handleEdit = (equipment) => {
    setEditingEquipment(equipment);
    setFormData(equipment);
    setIsModalOpen(true);
  };

  /**
   * Delete equipment with confirmation
   */
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet équipement ?')) {
      try {
        await deleteEquipment(id);
        loadEquipments();
      } catch (error) {
        console.error('Error deleting equipment:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  /**
   * Handle form input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Submit form to create or update equipment
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingEquipment) {
        await updateEquipment(editingEquipment.id, formData);
      } else {
        await createEquipment(formData);
      }
      
      setIsModalOpen(false);
      loadEquipments();
    } catch (error) {
      console.error('Error saving equipment:', error);
      alert('Erreur lors de l\'enregistrement');
    }
  };

  /**
   * Define table columns configuration
   */
  const columns = [
    { key: 'name', label: 'Nom' },
    { key: 'type', label: 'Type' },
    { key: 'serialNumber', label: 'N° Série' },
    { key: 'manufacturer', label: 'Fabricant' },
    { key: 'location', label: 'Localisation' },
    { 
      key: 'status', 
      label: 'Statut',
      render: (value) => (
        <span className={`status-badge status-${value.toLowerCase().replace(/é/g, 'e').replace(/\s/g, '-')}`}>
          {value}
        </span>
      )
    }
  ];

  /**
   * Define table actions based on user role
   */
  const actions = (user?.role === 'Admin' || user?.role === 'Ingénieur Biomédical') 
    ? [
        { label: 'Modifier', onClick: handleEdit, className: 'btn-edit' },
        { label: 'Supprimer', onClick: handleDelete, className: 'btn-delete' }
      ]
    : [];

  return (
    <div className="equipments-container">
      <div className="equipments-header">
        <h1>Gestion des Équipements</h1>
        {(user?.role === 'Admin' || user?.role === 'Ingénieur Biomédical') && (
          <button onClick={handleAdd} className="btn-add">
             Ajouter un équipement
          </button>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="equipments-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder=" Rechercher (nom, n° série, fabricant, localisation...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Tous les statuts</option>
            <option value="Opérationnel">Opérationnel</option>
            <option value="En maintenance">En maintenance</option>
            <option value="Hors service">Hors service</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="results-info">
        {filteredEquipments.length} équipement(s) trouvé(s)
      </div>

      {/* Equipments Table */}
      {loading ? (
        <div className="loading">Chargement des équipements...</div>
      ) : (
        <Table
          data={filteredEquipments}
          columns={columns}
          actions={actions}
        />
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEquipment ? 'Modifier l\'équipement' : 'Ajouter un équipement'}
      >
        <form onSubmit={handleSubmit} className="equipment-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nom *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Ex: Scanner IRM"
              />
            </div>
            <div className="form-group">
              <label>Type *</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                placeholder="Ex: Imagerie"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>N° de Série *</label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleInputChange}
                required
                placeholder="Ex: SN-12345"
              />
            </div>
            <div className="form-group">
              <label>Fabricant *</label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
                required
                placeholder="Ex: Siemens"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Localisation *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="Ex: Service Radiologie"
              />
            </div>
            <div className="form-group">
              <label>Statut *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="Opérationnel">Opérationnel</option>
                <option value="En maintenance">En maintenance</option>
                <option value="Hors service">Hors service</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date d'achat</label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Fin de garantie</label>
              <input
                type="date"
                name="warrantyEnd"
                value={formData.warrantyEnd}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">
              Annuler
            </button>
            <button type="submit" className="btn-submit">
              {editingEquipment ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Equipments;
