import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import HtmlHead from '@/components/constants/HtmlHead';
import MainHeader from '@/components/layout/MainHeader';
import MembersList from '@/components/listings/MembersList';
import Footer from '@/components/layout/Footer';
import ListingSearch from '@/components/forms/Search';

const MembersPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleUpdateUserInfo = (userData) => {
    // Update user info here
    console.log('Updated user data:', userData); // for updates and error checking
  };

  return (
    <Layout>
      <HtmlHead title="Members" />
      <MainHeader />
      <main>
        <ListingSearch onSearch={handleSearch} />
        <h2>Current Auctions</h2>
        <MembersList searchResults={searchResults} updateUserInfo={handleUpdateUserInfo} />
      </main>
      <Footer />
    </Layout>
  );
};

export default MembersPage;