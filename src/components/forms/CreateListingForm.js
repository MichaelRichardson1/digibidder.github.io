import { useState } from 'react';
import { LISTINGS_URL } from '../constants/api';

const CreateListingForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [media, setMedia] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Acquire authorization from localStorage
      const authToken = localStorage.getItem('authToken');
      const apiKey = localStorage.getItem('apiKey');

      // Create new listing with authorization headers
      const response = await fetch(LISTINGS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
          'X-Noroff-API-Key': apiKey,
        },
        body: JSON.stringify({
          title,
          description,
          endsAt: deadline,
          media: [{ url: media }], 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create auction item');
      }

      // Reset fields after submission
      setTitle('');
      setDescription('');
      setDeadline('');
      setMedia('');
      window.alert('Auction item created successfully!');
    } catch (error) {
      console.error('Error creating auction item:', error.message);
      window.alert('Failed to create auction item. Please try again.');
    }
  };

  return (
    <div className="create-listing-container">      
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
        />
        <label>Deadline:</label>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <label>Image URL:</label>
        <input
          type="text"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
          placeholder="Enter URL for image"
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateListingForm;