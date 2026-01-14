/**
 * Equipment Service
 * Handles all equipment-related API operations
 * Currently uses mock data - replace with actual API calls when backend is ready
 */

// import axios from "axios";
// const API_URL = "http://localhost:5000/api";

import { equipments as mockEquipments } from '../utils/mockData';

// In-memory storage
let equipments = [...mockEquipments];

/**
 * Get all equipments
 * @returns {Promise<Array>} List of all equipments
 */
export const getEquipments = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...equipments]);
    }, 300);
  });

  // Real API call:
  // const response = await axios.get(`${API_URL}/equipments`);
  // return response.data;
};

/**
 * Get single equipment by ID
 * @param {number} id - Equipment ID
 * @returns {Promise<Object>} Equipment object
 */
export const getEquipmentById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const equipment = equipments.find(eq => eq.id === id);
      if (equipment) {
        resolve(equipment);
      } else {
        reject(new Error('Équipement non trouvé'));
      }
    }, 300);
  });

  // Real API call:
  // const response = await axios.get(`${API_URL}/equipments/${id}`);
  // return response.data;
};

/**
 * Create new equipment
 * @param {Object} equipmentData - Equipment data
 * @returns {Promise<Object>} Created equipment
 */
export const createEquipment = async (equipmentData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEquipment = {
        id: Math.max(...equipments.map(e => e.id), 0) + 1,
        ...equipmentData,
        createdAt: new Date().toISOString()
      };
      equipments.push(newEquipment);
      resolve(newEquipment);
    }, 300);
  });

  // Real API call:
  // const response = await axios.post(`${API_URL}/equipments`, equipmentData);
  // return response.data;
};

/**
 * Update equipment
 * @param {number} id - Equipment ID
 * @param {Object} equipmentData - Updated equipment data
 * @returns {Promise<Object>} Updated equipment
 */
export const updateEquipment = async (id, equipmentData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = equipments.findIndex(eq => eq.id === id);
      if (index !== -1) {
        equipments[index] = { ...equipments[index], ...equipmentData };
        resolve(equipments[index]);
      } else {
        reject(new Error('Équipement non trouvé'));
      }
    }, 300);
  });

  // Real API call:
  // const response = await axios.put(`${API_URL}/equipments/${id}`, equipmentData);
  // return response.data;
};

/**
 * Delete equipment
 * @param {number} id - Equipment ID
 * @returns {Promise<void>}
 */
export const deleteEquipment = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = equipments.findIndex(eq => eq.id === id);
      if (index !== -1) {
        equipments.splice(index, 1);
        resolve();
      } else {
        reject(new Error('Équipement non trouvé'));
      }
    }, 300);
  });

  // Real API call:
  // await axios.delete(`${API_URL}/equipments/${id}`);
};
