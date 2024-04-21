import { useState, useEffect } from 'react';
import { BIDS_URL, PLACE_BID_URL, PROFILE_URL } from '../constants/api';
import ListingCarousel from './ListingCarousel';

const MembersItem = ({ item, updateUserInfo }) => {
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');

  const fetchBids = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const apiKey = localStorage.getItem('apiKey');

      const response = await fetch(BIDS_URL(item.id), {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'X-Noroff-API-Key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bids');
      }

      const { data } = await response.json();
      setBids(data.bids); // Update state with bids array from data
    } catch (error) {
      console.error('Error fetching bids:', error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const apiKey = localStorage.getItem('apiKey');
      const userName = localStorage.getItem('userName'); // fetch localStorage data for authorization

      const response = await fetch(`${PROFILE_URL}/${userName}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'X-Noroff-API-Key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      return null;
    }
  };

  const handleBidSubmit = async (event) => {
    event.preventDefault();

    try {
      const authToken = localStorage.getItem('authToken');
      const apiKey = localStorage.getItem('apiKey'); // make authorization available for use inside function

      const response = await fetch(PLACE_BID_URL(item.id), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
          'X-Noroff-API-Key': apiKey,
        },
        body: JSON.stringify({
          amount: parseInt(bidAmount),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place bid');
      }

      setBidAmount('');

      // Refresh bids after successful bid submission
      await fetchBids();

      // Fetch updated user data after placing bid
      const updatedUserData = await fetchUserData();
      if (updatedUserData) {
        // Update userInfo in parent component with the updated credits
        updateUserInfo(updatedUserData);
      }

      // Show alert for successful bid placement
      window.alert('Bid placed successfully.');

    } catch (error) {
      console.error('Error placing bid:', error.message);
    }
  };

  useEffect(() => {
    fetchBids(); // Fetch bids when the component mounts
  }, [item.id]);

  return (
    <div className="members-item">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>Deadline: {item.endsAt}</p>
      <ListingCarousel media={item.media} />
      <ul>
        {bids.map((bid, index) => (
          <li key={index}>
            Bidder: {bid.bidder.name}, Amount: {bid.amount} credits
          </li>
        ))}
      </ul>
      <form onSubmit={handleBidSubmit}>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter bid amount"
          required
        />
        <button type="submit">Place Bid</button>
      </form>
    </div>
  );
};

export default MembersItem;