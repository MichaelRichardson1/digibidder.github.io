import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PROFILE_URL } from '../constants/api';
import Image from 'next/image';
import digibidderLogo from '../../images/auction-site-logo.png';
import defaultAvatar from '../../images/default-avatar-icon.png';

const MainHeader = () => {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // fetch authorization headers from localStorage
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Authentication token not found');
      }

      const apiKey = localStorage.getItem('apiKey');
      if (!apiKey) {
        throw new Error('API key not found');
      }

      const userName = localStorage.getItem('userName');
      // get profile data to populate header details for the user
      const profileResponse = await fetch(`${PROFILE_URL}/${userName}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'X-Noroff-API-Key': apiKey,
        },
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const { data } = await profileResponse.json();
      setUserInfo(data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };
  // empty localStorage upon logout and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('apiKey');
    localStorage.removeItem('userName');
    router.push('/login');
  };
  // set a default avatar in case empty
  const defaultAvatarPath = {defaultAvatar};

  return (
    <header>
      <div className="logo">
        <Image src={digibidderLogo} alt="company-logo" width={150} height={75} />
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/create">Create Auction</Link>
          </li>
          <li>
            <Link href="/members">Members</Link>
          </li>
        </ul>
      </nav>
      {userInfo && (
        <div className="user-info">
          <p>Welcome, {userInfo.name}</p>
          <p>Credits: {userInfo.credits}</p>
          <Image
            src={userInfo.avatar ? userInfo.avatar.url : defaultAvatarPath}
            alt="User Avatar"
            width={75}
            height={75}
          />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default MainHeader;