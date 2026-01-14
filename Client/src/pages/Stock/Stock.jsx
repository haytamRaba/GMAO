import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import { getStockItems, createStockItem, updateStockItem, deleteStockItem } from '../../services/stockService';
import './Stock.css';

/**
 * Stock Page Component
 * Manages inventory of consumables and spare parts
 * Includes add, edit, delete operations and low stock alerts
 */
const Stock = () => {
  const { user } = useAuth();
  const [stockItems, setStockItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAlertsOnly, setShowAlertsOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Consommable',
    reference: '',
    quantity: 0,
    minQuantity: 0,
    unit: 'pièce',
    location: '',
    supplier: '',
    unitPrice: 0
  });

  /**
   * Load stock items on component mount
   */
  useEffect(() => {
    loadStockItems();
  }, []);

  /**
   * Apply filters when search, category, or alerts change
   */
  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterCategory, showAlertsOnly, stockItems]);

  /**
   * Fetch all stock items from service
   */
  const loadStockItems = async () => {
    try {
      setLoading(true);
      const data = await getStockItems();
      setStockItems(data);
    } catch (error) {
      console.error('Error loading stock items:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Apply search, category, and alert filters
   */
  const applyFilters = () => {
    let filtered = [...stockItems];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    // Apply alerts filter (low stock)
    if (showAlertsOnly) {
      filtered = filtered.filter(item => item.quantity <= item.minQuantity);
    }

    setFilteredItems(filtered);
  };

  /**
   * Open modal to add new stock item
   */
  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'Consommable',
      reference: '',
      quantity: 0,
      minQuantity: 0,
      unit: 'pièce',
      location: '',
      supplier: '',
      unitPrice: 0
    });
    setIsModalOpen(true);
  };

  /**
   * Open modal to edit stock item
   */
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  /**
   * Delete stock item with confirmation
   */
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await deleteStockItem(id);
        loadStockItems();
      } catch (error) {
        console.error('Error deleting stock item:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  /**
   * Handle form input changes
   */
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  /**
   * Submit form to create or update stock item
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        await updateStockItem(editingItem.id, formData);
      } else {
        await createStockItem(formData);
      }
      
      setIsModalOpen(false);
      loadStockItems();
    } catch (error) {
      console.error('Error saving stock item:', error);
      alert('Erreur lors de l\'enregistrement');
    }
  };

  /**
   * Calculate total stock value
   */
  const getTotalValue = () => {
    return stockItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  };

  /**
   * Get count of low stock items
   */
  const getLowStockCount = () => {
    return stockItems.filter(item => item.quantity <= item.minQuantity).length;
  };

  /**
   * Table columns configuration
   */
  const columns = [
    { key: 'name', label: 'Nom' },
    { key: 'category', label: 'Catégorie' },
    { key: 'reference', label: 'Référence' },
    { 
      key: 'quantity', 
      label: 'Quantité',
      render: (value, item) => (
        <span className={value <= item.minQuantity ? 'low-stock' : ''}>
          {value} {item.unit}
          {value <= item.minQuantity && ' ⚠️'}
        </span>
      )
    },
    { 
      key: 'minQuantity', 
      label: 'Stock Min',
      render: (value, item) => `${value} ${item.unit}`
    },
    { key: 'location', label: 'Emplacement' },
    { key: 'supplier', label: 'Fournisseur' },
    { 
      key: 'unitPrice', 
      label: 'Prix Unit.',
      render: (value) => `${value.toFixed(2)} MAD`
    }
  ];

  /**
   * Table actions based on user role
   */
  const actions = (user?.role === 'Admin' || user?.role === 'Ingénieur Biomédical')
    ? [
        { label: 'Modifier', onClick: handleEdit, className: 'btn-edit' },
        { label: 'Supprimer', onClick: handleDelete, className: 'btn-delete' }
      ]
    : [];

  return (
    <div className="stock-container">
      <div className="stock-header">
        <div>
          <h1>Gestion du Stock</h1>
          <div className="stock-summary">
            <span className="summary-item">
               Total articles: <strong>{stockItems.length}</strong>
            </span>
            <span className="summary-item">
              Alertes: <strong>{getLowStockCount()}</strong>
            </span>
            <span className="summary-item">
               Valeur totale: <strong>{getTotalValue().toFixed(2)} MAD</strong>
            </span>
          </div>
        </div>
        {(user?.role === 'Admin' || user?.role === 'Ingénieur Biomédical') && (
          <button onClick={handleAdd} className="btn-add">
             Ajouter un article
          </button>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="stock-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher (nom, référence, fournisseur...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">Toutes catégories</option>
            <option value="Consommable">Consommable</option>
            <option value="Pièce de rechange">Pièce de rechange</option>
            <option value="Outil">Outil</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div className="checkbox-filter">
          <label>
            <input
              type="checkbox"
              checked={showAlertsOnly}
              onChange={(e) => setShowAlertsOnly(e.target.checked)}
            />
            Afficher uniquement les alertes
          </label>
        </div>
      </div>

      {/* Results count */}
      <div className="results-info">
        {filteredItems.length} article(s) trouvé(s)
      </div>

      {/* Stock Table */}
      {loading ? (
        <div className="loading">Chargement du stock...</div>
      ) : (
        <Table
          data={filteredItems}
          columns={columns}
          actions={actions}
        />
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Modifier l\'article' : 'Ajouter un article'}
      >
        <form onSubmit={handleSubmit} className="stock-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nom *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Ex: Gants stériles"
              />
            </div>
            <div className="form-group">
              <label>Catégorie *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="Consommable">Consommable</option>
                <option value="Pièce de rechange">Pièce de rechange</option>
                <option value="Outil">Outil</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Référence *</label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
                required
                placeholder="Ex: REF-12345"
              />
            </div>
            <div className="form-group">
              <label>Unité *</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                required
              >
                <option value="pièce">Pièce</option>
                <option value="boîte">Boîte</option>
                <option value="litre">Litre</option>
                <option value="kg">Kilogramme</option>
                <option value="mètre">Mètre</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Quantité *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Quantité minimale *</label>
              <input
                type="number"
                name="minQuantity"
                value={formData.minQuantity}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Emplacement *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="Ex: Magasin A - Étagère 3"
              />
            </div>
            <div className="form-group">
              <label>Fournisseur</label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                placeholder="Ex: Medico Supply"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Prix unitaire (€)</label>
            <input
              type="number"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">
              Annuler
            </button>
            <button type="submit" className="btn-submit">
              {editingItem ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Stock;
