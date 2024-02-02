// EditProfile.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProfile = ({ user, onUpdateProfile, onCancel }) => {
  const [newPassword, setNewPassword] = useState(user.password);

  const handleSaveChanges = () => {
    // Basic validation
    if (!newPassword) {
      alert('Please enter a new password.');
      return;
    }

    // Trigger the onUpdateProfile callback with the updated user data
    const updatedUser = { ...user, password: newPassword };
    onUpdateProfile(updatedUser);
  };

  return (
    <div className="container mt-5">
      <h2>Edit Profile</h2>
      <div>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary mr-2" onClick={handleSaveChanges}>
          Save Changes
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
