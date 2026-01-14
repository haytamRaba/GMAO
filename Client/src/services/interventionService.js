/**
 * Intervention Service
 * Handles all intervention/maintenance-related API operations
 * Currently uses mock data - replace with actual API calls when backend is ready
 */

// import axios from "axios";
// const API_URL = "http://localhost:5000/api";

import { interventions as mockInterventions } from '../utils/mockData';

// In-memory storage for demo (simulates database)
let interventions = [...mockInterventions];

/**
 * Get all interventions
 * @returns {Promise<Array>} List of all interventions
 */
export const getInterventions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...interventions]);
    }, 300);
  });

  // Real API call:
  // const response = await axios.get(`${API_URL}/interventions`);
  // return response.data;
};

/**
 * Get single intervention by ID
 * @param {number} id - Intervention ID
 * @returns {Promise<Object>} Intervention object
 */
export const getInterventionById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const intervention = interventions.find(int => int.id === id);
      if (intervention) {
        resolve(intervention);
      } else {
        reject(new Error('Intervention non trouvée'));
      }
    }, 300);
  });

  // Real API call:
  // const response = await axios.get(`${API_URL}/interventions/${id}`);
  // return response.data;
};

/**
 * Create new intervention
 * @param {Object} interventionData - Intervention data
 * @returns {Promise<Object>} Created intervention
 */
export const createIntervention = async (interventionData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newIntervention = {
        id: Math.max(...interventions.map(i => i.id), 0) + 1,
        ...interventionData,
        createdAt: new Date().toISOString()
      };
      interventions.push(newIntervention);
      resolve(newIntervention);
    }, 300);
  });

  // Real API call:
  // const response = await axios.post(`${API_URL}/interventions`, interventionData);
  // return response.data;
};

/**
 * Update intervention
 * @param {number} id - Intervention ID
 * @param {Object} interventionData - Updated intervention data
 * @returns {Promise<Object>} Updated intervention
 */
export const updateIntervention = async (id, interventionData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = interventions.findIndex(int => int.id === id);
      if (index !== -1) {
        interventions[index] = { ...interventions[index], ...interventionData };
        resolve(interventions[index]);
      } else {
        reject(new Error('Intervention non trouvée'));
      }
    }, 300);
  });

  // Real API call:
  // const response = await axios.put(`${API_URL}/interventions/${id}`, interventionData);
  // return response.data;
};

/**
 * Delete intervention
 * @param {number} id - Intervention ID
 * @returns {Promise<void>}
 */
export const deleteIntervention = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = interventions.findIndex(int => int.id === id);
      if (index !== -1) {
        interventions.splice(index, 1);
        resolve();
      } else {
        reject(new Error('Intervention non trouvée'));
      }
    }, 300);
  });

  // Real API call:
  // await axios.delete(`${API_URL}/interventions/${id}`);
};

/**
 * Get interventions by status
 * @param {string} status - Intervention status
 * @returns {Promise<Array>} Filtered interventions
 */
export const getInterventionsByStatus = async (status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = interventions.filter(int => int.status === status);
      resolve(filtered);
    }, 300);
  });

  // Real API call:
  // const response = await axios.get(`${API_URL}/interventions?status=${status}`);
  // return response.data;
};
