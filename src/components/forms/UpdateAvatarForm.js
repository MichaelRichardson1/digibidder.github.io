import React, { useState } from 'react';
import { PROFILE_URL } from '../constants/api';

const UpdateAvatarForm = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const authToken = localStorage.getItem('authToken');
      const apiKey = localStorage.getItem('apiKey');
      const userName = localStorage.getItem('userName');

      if (!authToken || !apiKey || !userName) {
        throw new Error('Authentication data not found');
      }

      // PUT request with authorization
      const response = await fetch(`${PROFILE_URL}/${userName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
          'X-Noroff-API-Key': apiKey,
        },
        body: JSON.stringify({ avatar: { url: avatarUrl } }),
      });

      if (!response.ok) {
        throw new Error('Failed to update avatar');
      }

      setAvatarUrl('');
      alert('Avatar image updated successfully!');
    } catch (error) {
      console.error('Error updating avatar:', error.message);
    }
  };

  return (
    <div className="update-avatar-form">      
      <form onSubmit={handleFormSubmit}>
        <label>Avatar URL:</label>
        <input
          type="text"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="Enter avatar URL"
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateAvatarForm;