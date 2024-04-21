import MainHeader from '@/components/layout/MainHeader';
import { useEffect, useState } from 'react';
import { PROFILE_URL } from '@/components/constants/api';
import UpdateAvatarForm from '@/components/forms/UpdateAvatarForm';
import Layout from '@/components/layout/Layout';
import HtmlHead from '@/components/constants/HtmlHead';
import Footer from '@/components/layout/Footer';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const apiKey = localStorage.getItem('apiKey');
        const userName = localStorage.getItem('userName');
        
        if (!authToken || !apiKey || !userName) {
          throw new Error('Authentication data not found');
        }

        const response = await fetch(`${PROFILE_URL}/${userName}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'X-Noroff-API-Key': apiKey,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUserData(userData.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Layout>
      <HtmlHead title="Profile" />
      <MainHeader />
      <main>
        <h2>Profile</h2>
        {userData && (
          <div className="email-credits-display">
            <p>Email: {userData.email}</p>
            <p>Credits: {userData.credits}</p>
            <UpdateAvatarForm />
          </div>
        )}
      </main>
      <Footer />
    </Layout>
  );
};

export default ProfilePage;