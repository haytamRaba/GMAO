/**
 * Mock Data for GMAO Application
 * Contains sample data for development and testing
 * Replace with actual API calls when backend is ready
 */

/**
 * Mock Users Data
 * Different roles: Admin, Technicien, Ingénieur Biomédical, Chef de Service
 */
export const users = [
  {
    id: 1,
    name: 'Meyssem Elouahabi',
    email: 'meyssem@um6ss.ma',
    password: 'meyssem123',
    role: 'Admin',
    matricule: 'MAT-2024-001',
    phone: '+212 6 12 34 56 78',
    department: 'Direction'
  },
  {
    id: 2,
    name: 'john doe',
    email: 'john.doe@um6ss.ma',
    password: 'tech123',
    role: 'Technicien',
    matricule: 'MAT-2024-002',
    phone: '+212 6 23 45 67 89',
    department: 'Maintenance'
  },
  {
    id: 3,
    name: 'Mohamed Obadi',
    email: 'obadi.moha@um6ss.ma',
    password: 'ing123',
    role: 'Ingénieur Biomédical',
    matricule: 'MAT-2024-003',
    phone: '+212 6 34 56 78 90',
    department: 'Biomédicale'
  },
  {
    id: 4,
    name: 'Mimon Khalid',
    email: 'mimon.col@um6ss.ma',
    password: 'chef123',
    role: 'Chef de Service',
    matricule: 'MAT-2024-004',
    phone: '+212 6 45 67 89 01',
    department: 'Maintenance'
  }
];

/**
 * Mock Equipments Data
 * Medical equipment inventory
 */
export const equipments = [
  {
    id: 1,
    name: 'Scanner IRM Siemens',
    type: 'Imagerie médicale',
    serialNumber: 'SN-IRM-001',
    manufacturer: 'Siemens',
    location: 'Service Radiologie - Salle 1',
    status: 'Opérationnel',
    purchaseDate: '2020-03-15',
    warrantyEnd: '2025-03-15'
  },
  {
    id: 2,
    name: 'Échographe GE Healthcare',
    type: 'Imagerie médicale',
    serialNumber: 'SN-ECHO-002',
    manufacturer: 'GE Healthcare',
    location: 'Service Obstétrique',
    status: 'Opérationnel',
    purchaseDate: '2021-06-20',
    warrantyEnd: '2024-06-20'
  },
  {
    id: 3,
    name: 'Respirateur Dräger',
    type: 'Équipement vital',
    serialNumber: 'SN-RESP-003',
    manufacturer: 'Dräger',
    location: 'Réanimation - Box 3',
    status: 'En maintenance',
    purchaseDate: '2019-11-10',
    warrantyEnd: '2023-11-10'
  },
  {
    id: 4,
    name: 'Moniteur cardiaque Philips',
    type: 'Monitoring',
    serialNumber: 'SN-MON-004',
    manufacturer: 'Philips',
    location: 'Cardiologie - Chambre 201',
    status: 'Opérationnel',
    purchaseDate: '2022-01-05',
    warrantyEnd: '2027-01-05'
  },
  {
    id: 5,
    name: 'Table d\'opération Maquet',
    type: 'Équipement chirurgical',
    serialNumber: 'SN-TABLE-005',
    manufacturer: 'Maquet',
    location: 'Bloc opératoire 2',
    status: 'Opérationnel',
    purchaseDate: '2018-09-12',
    warrantyEnd: '2023-09-12'
  },
  {
    id: 6,
    name: 'Défibrillateur Zoll',
    type: 'Équipement vital',
    serialNumber: 'SN-DEF-006',
    manufacturer: 'Zoll',
    location: 'Urgences - Salle de soins',
    status: 'Hors service',
    purchaseDate: '2017-04-22',
    warrantyEnd: '2022-04-22'
  },
  {
    id: 7,
    name: 'Microscope chirurgical Zeiss',
    type: 'Équipement chirurgical',
    serialNumber: 'SN-MICRO-007',
    manufacturer: 'Zeiss',
    location: 'Bloc opératoire 1',
    status: 'Opérationnel',
    purchaseDate: '2021-08-30',
    warrantyEnd: '2026-08-30'
  },
  {
    id: 8,
    name: 'Appareil de radiologie portable',
    type: 'Imagerie médicale',
    serialNumber: 'SN-RADIO-008',
    manufacturer: 'Canon Medical',
    location: 'Service Urgences',
    status: 'Opérationnel',
    purchaseDate: '2022-05-15',
    warrantyEnd: '2027-05-15'
  }
];

/**
 * Mock Interventions Data
 * Maintenance and repair interventions
 */
export const interventions = [
  {
    id: 1,
    equipmentId: 3,
    equipment: 'Respirateur Dräger',
    type: 'Préventive',
    description: 'Maintenance préventive trimestrielle - Vérification complète du système',
    priority: 'Haute',
    status: 'En cours',
    technician: 'Jean Dupont',
    date: '2026-01-10',
    estimatedDuration: 3
  },
  {
    id: 2,
    equipmentId: 6,
    equipment: 'Défibrillateur Zoll',
    type: 'Corrective',
    description: 'Remplacement de la batterie défectueuse',
    priority: 'Critique',
    status: 'En attente',
    technician: 'Marie Martin',
    date: '2026-01-12',
    estimatedDuration: 2
  },
  {
    id: 3,
    equipmentId: 1,
    equipment: 'Scanner IRM Siemens',
    type: 'Préventive',
    description: 'Calibration annuelle et mise à jour logicielle',
    priority: 'Moyenne',
    status: 'Terminée',
    technician: 'Jean Dupont',
    date: '2026-01-05',
    estimatedDuration: 4
  },
  {
    id: 4,
    equipmentId: 4,
    equipment: 'Moniteur cardiaque Philips',
    type: 'Corrective',
    description: 'Réparation de l\'écran tactile non réactif',
    priority: 'Haute',
    status: 'En cours',
    technician: 'Marie Martin',
    date: '2026-01-08',
    estimatedDuration: 2
  },
  {
    id: 5,
    equipmentId: 2,
    equipment: 'Échographe GE Healthcare',
    type: 'Préventive',
    description: 'Nettoyage des sondes et vérification de l\'étalonnage',
    priority: 'Moyenne',
    status: 'Terminée',
    technician: 'Jean Dupont',
    date: '2026-01-03',
    estimatedDuration: 1.5
  },
  {
    id: 6,
    equipmentId: 7,
    equipment: 'Microscope chirurgical Zeiss',
    type: 'Préventive',
    description: 'Nettoyage optique et vérification de l\'alignement',
    priority: 'Faible',
    status: 'En attente',
    technician: 'Jean Dupont',
    date: '2026-01-15',
    estimatedDuration: 2
  },
  {
    id: 7,
    equipmentId: 5,
    equipment: 'Table d\'opération Maquet',
    type: 'Corrective',
    description: 'Remplacement du moteur de levage défectueux',
    priority: 'Critique',
    status: 'En cours',
    technician: 'Marie Martin',
    date: '2026-01-11',
    estimatedDuration: 5
  },
  {
    id: 8,
    equipmentId: 8,
    equipment: 'Appareil de radiologie portable',
    type: 'Urgente',
    description: 'Problème de qualité d\'image - Nécessite intervention immédiate',
    priority: 'Critique',
    status: 'En attente',
    technician: 'Marie Martin',
    date: '2026-01-14',
    estimatedDuration: 3
  }
];

/**
 * Mock Stock Items Data
 * Consumables and spare parts inventory
 */
export const stockItems = [
  {
    id: 1,
    name: 'Gants stériles (taille M)',
    category: 'Consommable',
    reference: 'REF-GANT-M-001',
    quantity: 500,
    minQuantity: 200,
    unit: 'boîte',
    location: 'Magasin A - Étagère 1',
    supplier: 'Medico Supply',
    unitPrice: 8.50
  },
  {
    id: 2,
    name: 'Électrodes ECG jetables',
    category: 'Consommable',
    reference: 'REF-ECG-002',
    quantity: 1200,
    minQuantity: 500,
    unit: 'pièce',
    location: 'Magasin A - Étagère 2',
    supplier: 'CardioMed',
    unitPrice: 0.35
  },
  {
    id: 3,
    name: 'Batterie pour défibrillateur Zoll',
    category: 'Pièce de rechange',
    reference: 'REF-BAT-ZOLL-003',
    quantity: 3,
    minQuantity: 5,
    unit: 'pièce',
    location: 'Magasin B - Armoire sécurisée',
    supplier: 'Zoll Medical',
    unitPrice: 450.00
  },
  {
    id: 4,
    name: 'Filtre HEPA pour respirateur',
    category: 'Consommable',
    reference: 'REF-HEPA-004',
    quantity: 150,
    minQuantity: 100,
    unit: 'pièce',
    location: 'Magasin A - Étagère 3',
    supplier: 'Respiratory Care',
    unitPrice: 12.00
  },
  {
    id: 5,
    name: 'Lampe pour microscope Zeiss',
    category: 'Pièce de rechange',
    reference: 'REF-LAMP-ZEISS-005',
    quantity: 8,
    minQuantity: 10,
    unit: 'pièce',
    location: 'Magasin B - Étagère 1',
    supplier: 'Zeiss Medical',
    unitPrice: 180.00
  },
  {
    id: 6,
    name: 'Désinfectant surfaces (1L)',
    category: 'Consommable',
    reference: 'REF-DESINF-006',
    quantity: 80,
    minQuantity: 50,
    unit: 'litre',
    location: 'Magasin A - Étagère 5',
    supplier: 'HygiènePro',
    unitPrice: 6.50
  },
  {
    id: 7,
    name: 'Câble d\'alimentation universel',
    category: 'Pièce de rechange',
    reference: 'REF-CABLE-007',
    quantity: 25,
    minQuantity: 15,
    unit: 'pièce',
    location: 'Magasin B - Étagère 2',
    supplier: 'ElectroMed',
    unitPrice: 22.00
  },
  {
    id: 8,
    name: 'Gel échographie (5L)',
    category: 'Consommable',
    reference: 'REF-GEL-ECHO-008',
    quantity: 30,
    minQuantity: 20,
    unit: 'bidon',
    location: 'Magasin A - Étagère 4',
    supplier: 'UltraSound Supplies',
    unitPrice: 35.00
  },
  {
    id: 9,
    name: 'Papier thermique pour ECG',
    category: 'Consommable',
    reference: 'REF-PAPIER-ECG-009',
    quantity: 45,
    minQuantity: 30,
    unit: 'rouleau',
    location: 'Magasin A - Étagère 2',
    supplier: 'CardioMed',
    unitPrice: 4.20
  },
  {
    id: 10,
    name: 'Fusibles de sécurité (assortiment)',
    category: 'Pièce de rechange',
    reference: 'REF-FUSIBLE-010',
    quantity: 12,
    minQuantity: 20,
    unit: 'boîte',
    location: 'Magasin B - Étagère 3',
    supplier: 'ElectroMed',
    unitPrice: 15.00
  },
  {
    id: 11,
    name: 'Compresses stériles 10x10cm',
    category: 'Consommable',
    reference: 'REF-COMP-011',
    quantity: 800,
    minQuantity: 400,
    unit: 'pièce',
    location: 'Magasin A - Étagère 1',
    supplier: 'Medico Supply',
    unitPrice: 0.15
  },
  {
    id: 12,
    name: 'Lubrifiant médical (tube 50ml)',
    category: 'Consommable',
    reference: 'REF-LUB-012',
    quantity: 60,
    minQuantity: 40,
    unit: 'tube',
    location: 'Magasin A - Étagère 4',
    supplier: 'MediCare Products',
    unitPrice: 3.80
  }
];

/**
 * Helper function to get user by email
 */
export const getUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

/**
 * Helper function to get equipment by ID
 */
export const getEquipmentById = (id) => {
  return equipments.find(eq => eq.id === id);
};

/**
 * Helper function to get low stock items
 */
export const getLowStockItems = () => {
  return stockItems.filter(item => item.quantity <= item.minQuantity);
};
