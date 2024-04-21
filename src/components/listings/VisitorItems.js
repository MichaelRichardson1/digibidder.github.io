import { useState, useEffect } from 'react';
import ListingCarousel from './ListingCarousel';
import { LISTINGS_URL } from '../constants/api';

const VisitorItems = ({ searchResults }) => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        let data = [];
        if (searchResults && searchResults.length > 0) {
          data = searchResults;
        } else {
          const response = await fetch(`${LISTINGS_URL}?limit=100`);
          if (!response.ok) {
            throw new Error('Failed to fetch listings');
          }
          const responseData = await response.json();
          data = responseData.data; // Extract listings from data property
        }

        setListings(data);
        const totalPagesCount = Math.ceil(data.length / itemsPerPage);
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [searchResults]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, listings.length);

  return (
    <div className="listing-container">
      {listings.slice(startIndex, endIndex).map(listing => (
        <div className="listing-card" key={listing.id}>
          <h3>{listing.title}</h3>
          <p>{listing.description}</p>
          <p>Ends at: {listing.endsAt}</p>
          {/* Pass media array to ListingCarousel */}
          <ListingCarousel media={listing.media} />
        </div>
      ))}
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>{page}</button>
        ))}
      </div>
    </div>
  );
};

export default VisitorItems;