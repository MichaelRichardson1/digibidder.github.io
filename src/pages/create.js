import Layout from '@/components/layout/Layout';
import HtmlHead from '@/components/constants/HtmlHead';
import MainHeader from '@/components/layout/MainHeader';
import CreateListingForm from '@/components/forms/CreateListingForm';
import Footer from '@/components/layout/Footer';

const CreatePage = () => {
  return (
    <Layout>
      <HtmlHead title="Create Auction" />
      <MainHeader />
      <main>    
        <h2>Create Auction</h2>
        <CreateListingForm />
      </main>  
      <Footer />
    </Layout>
  );
};

export default CreatePage;