/**
 * Stock Service
 * Handles all stock/inventory-related API operations
 * Currently uses mock data - replace with actual API calls when backend is ready
 */

// import axios from "axios";
// const API_URL = "http://localhost:5000/api";

import { stockItems as mockStockItems } from '../utils/mockData';

// In-memory storage for demo (simulates database)
let stockItems = [...mockStockItems];

/**
 * Get all stock items
 * @returns {Promise<Array>} List of all stock items
 */
export const getStockItems = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...stockItems]);
    }, 300);
  });

  // Real API call:
  // const response = await axios.get(`${API_URL}/stock`);
  // return response.data;
};

/**
 * Get single stock item by ID
 * @param {number} id - Stock item ID
 * @returns {Promise<Object>} Stock item object
 */
export const getStockItemById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = stockItems.find(item => item.id === id);
      if (item) {
        resolve(item);
      } else {
        reject(new Error('Article non trouvé'));
      }
    }, 300);
  });

  // Real API call:
  // const response = await axios.get(`${API_URL}/stock/${id}`);
  // return response.data;
};

/**
 * Create new stock item
 * @param {Object} itemData - Stock item data
 * @returns {Promise<Object>} Created stock item
 */
export const createStockItem = async (itemData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItem = {
        id: Math.max(...stockItems.map(i => i.id), 0) + 1,
        ...itemData,
        createdAt: new Date().toISOString()
      };
      stockItems.push(newItem);
      resolve(newItem);
    }, 300);
  });

  // Real API call:
  // const response = await axios.post(`${API_URL}/stock`, itemData);
  // return response.data;
};

/**
 * Update stock item
 * @param {number} id - Stock item ID
 * @param {Object} itemData - Updated stock item data
 * @returns {Promise<Object>} Updated stock item
 */
export const updateStockItem = async (id, itemData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = stockItems.findIndex(item => item.id === id);
      if (index !== -1) {
        stockItems[index] = { ...stockItems[index], ...itemData };
        resolve(stockItems[index]);
      } else {
        reject(new Error('Article non trouvé'));
      }
    }, 300);
  });

  // Real API call:
  // const response = await axios.put(`${API_URL}/stock/${id}`, itemData);
  // return response.data;
};

/**
 * Delete stock item
 * @param {number} id - Stock item ID
 * @returns {Promise<void>}
 */
export const deleteStockItem = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = stockItems.findIndex(item => item.id === id);
      if (index !== -1) {
        stockItems.splice(index, 1);
        resolve();
      } else {
        reject(new Error('Article non trouvé'));
      }
    }, 300);
  });

  // Real API call:
  // await axios.delete(`${API_URL}/stock/${id}`);
};

/**
 * Get low stock items (quantity <= minQuantity)
 * @returns {Promise<Array>} List of low stock items
 */
export const getLowStockItems = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowStock = stockItems.filter(item => item.quantity <= item.minQuantity);
      resolve(lowStock);
    }, 300);
  });

  // Real API call:
  // const response = await axios.get(`${API_URL}/stock/low-stock`);
  // return response.data;
};

/**
 * Update stock quantity
 * @param {number} id - Stock item ID
 * @param {number} quantity - New quantity
 * @returns {Promise<Object>} Updated stock item
 */
export const updateStockQuantity = async (id, quantity) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = stockItems.findIndex(item => item.id === id);
      if (index !== -1) {
        stockItems[index].quantity = quantity;
        resolve(stockItems[index]);
      } else {
        reject(new Error('Article non trouvé'));
      }
    }, 300);
  });

  // Real API call:
  // const response = await axios.patch(`${API_URL}/stock/${id}/quantity`, { quantity });
  // return response.data;
};
