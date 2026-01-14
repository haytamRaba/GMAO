import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../Modal/Modal';
import './ProfileModal.css';

/**
 * ProfileModal Component
 * Displays and allows editing of user profile information
 * Includes avatar, matricule, password change, and personal info
 */
const ProfileModal = ({ isOpen, onClose }) => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    matricule: user?.matricule || '',
    phone: user?.phone || '',
    department: user?.department || '',
    avatar: user?.avatar || null
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      // Update user data
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        matricule: formData.matricule,
        phone: formData.phone,
        department: formData.department,
        avatar: formData.avatar || user?.avatar
      };

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      setIsEditing(false);
      setMessage('Profil mis à jour avec succès');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Erreur lors de la mise à jour du profil');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (passwordData.oldPassword === passwordData.newPassword) {
      setError('Le nouveau mot de passe doit être différent de l\'ancien');
      return;
    }

    try {
      // Update password (in real app, verify oldPassword first)
      const updatedUser = {
        ...user,
        password: passwordData.newPassword
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      setShowPasswordChange(false);
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setMessage('Mot de passe changé avec succès');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Erreur lors du changement de mot de passe');
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mon Profil">
      <div className="profile-modal-content">
        {/* Alert Messages */}
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {!isEditing && !showPasswordChange ? (
          // View Mode
          <>
            <div className="profile-view">
              <div className="avatar-section">
                <div className="avatar-large">
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="Avatar" />
                  ) : (
                    <div className="avatar-placeholder">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              <div className="profile-info">
                <div className="info-group">
                  <label>Nom Complet</label>
                  <p>{user?.name}</p>
                </div>

                <div className="info-group">
                  <label>Email</label>
                  <p>{user?.email}</p>
                </div>

                <div className="info-group">
                  <label>Matricule</label>
                  <p>{user?.matricule || 'Non défini'}</p>
                </div>

                <div className="info-group">
                  <label>Téléphone</label>
                  <p>{user?.phone || 'Non défini'}</p>
                </div>

                <div className="info-group">
                  <label>Département</label>
                  <p>{user?.department || 'Non défini'}</p>
                </div>

                <div className="info-group">
                  <label>Rôle</label>
                  <p>
                    <span className="role-badge">{user?.role}</span>
                  </p>
                </div>
              </div>

              <div className="profile-actions">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-edit-profile"
                >
                  ✎ Modifier le profil
                </button>
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="btn-change-password"
                >
                  🔐 Changer le mot de passe
                </button>
              </div>
            </div>
          </>
        ) : showPasswordChange ? (
          // Change Password Mode
          <>
            <form onSubmit={handleChangePassword} className="password-form">
              <div className="form-group">
                <label>Ancien mot de passe</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  placeholder="Entrez votre ancien mot de passe"
                  required
                />
              </div>

              <div className="form-group">
                <label>Nouveau mot de passe</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Entrez votre nouveau mot de passe"
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirmer le mot de passe</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirmez votre nouveau mot de passe"
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordChange(false);
                    setPasswordData({
                      oldPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                  className="btn-cancel"
                >
                  Annuler
                </button>
                <button type="submit" className="btn-submit">
                  Changer le mot de passe
                </button>
              </div>
            </form>
          </>
        ) : (
          // Edit Mode
          <>
            <form onSubmit={handleSaveProfile} className="profile-form">
              <div className="avatar-upload-section">
                <div className="avatar-preview">
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="Aperçu" />
                  ) : (
                    <div className="avatar-placeholder">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="upload-controls">
                  <label htmlFor="avatar-input" className="btn-upload">
                    📷 Changer la photo
                  </label>
                  <input
                    id="avatar-input"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    hidden
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Nom Complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Matricule</label>
                <input
                  type="text"
                  name="matricule"
                  value={formData.matricule}
                  onChange={handleInputChange}
                  placeholder="Ex: MAT-2024-001"
                />
              </div>

              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Ex: +212 6 XX XX XX XX"
                />
              </div>

              <div className="form-group">
                <label>Département</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Ex: Maintenance"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || '',
                      email: user?.email || '',
                      matricule: user?.matricule || '',
                      phone: user?.phone || '',
                      department: user?.department || '',
                      avatar: user?.avatar || null
                    });
                  }}
                  className="btn-cancel"
                >
                  Annuler
                </button>
                <button type="submit" className="btn-submit">
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ProfileModal;
