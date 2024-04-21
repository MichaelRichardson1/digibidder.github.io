import Layout from '../components/layout/Layout';
import HtmlHead from '../components/constants/HtmlHead';
import VisitorHeader from '../components/layout/VisitorHeader';
import VisitorListings from '../components/listings/VisitorListings';
import Footer from '../components/layout/Footer';
import Search from '../components/forms/Search';
import Link from 'next/link';
import { useState } from 'react'; // Import useState

const VisitorsPage = () => {
  const [searchResults, setSearchResults] = useState([]); // State for search results

  // Function to handle search results
  const handleSearch = (data) => {
    setSearchResults(data);
  };

  return (
    <Layout>
      <HtmlHead title="Visitor" />
      <VisitorHeader />
      <main>
        <div className="disclaimer">
          <p>Want to bid? Register <Link href="/register">here</Link>.</p>
        </div>
        {/* Pass handleSearch function as onSearch prop */}
        <Search onSearch={handleSearch} />
        <h2>Current Auctions</h2>
        {/* Pass searchResults state as prop to VisitorListings */}
        <VisitorListings searchResults={searchResults} />
      </main>
      <Footer />
    </Layout>
  );
};

export default VisitorsPage;