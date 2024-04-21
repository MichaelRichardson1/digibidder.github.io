import { useState, useEffect } from 'react';
import MembersItem from './MembersItem';
import { LISTINGS_URL } from '../constants/api';

const MembersList = ({ updateUserInfo, searchResults }) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        let url = `${LISTINGS_URL}?_bids=true&limit=10&page=${currentPage}`;
        if (searchResults.length > 0) {
          url += `&q=${searchResults}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const { data, meta } = await response.json();
        setItems(data);
        setTotalPages(meta.pageCount);
      } catch (error) {
        console.error('Error fetching listings:', error.message);
      }
    };

    fetchListings();
  }, [currentPage, searchResults]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="members-list">
      {items && items.map((item) => (
        <MembersItem key={item.id} item={item} updateUserInfo={updateUserInfo} />
      ))}
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>{page}</button>
        ))}
      </div>
    </div>
  );
};

export default MembersList;