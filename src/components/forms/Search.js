import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LISTINGS_URL } from '../constants/api';

const ListingSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${LISTINGS_URL}/search?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setSearchResults(data.data); // Update to access the data property
      onSearch(data.data); // Pass search results to parent component
    } catch (error) {
      console.error('Error searching listings:', error.message);
    }
  };

  return (
    <div className="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search listings"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {Array.isArray(searchResults) && searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

ListingSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default ListingSearch;