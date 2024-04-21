import Layout from '../components/layout/Layout';
import HtmlHead from '../components/constants/HtmlHead';
import IndexHeader from '../components/layout/IndexHeader';
import Footer from '../components/layout/Footer';
import Link from 'next/link'; 

const IndexPage = () => {
  return (
    <Layout>
      <HtmlHead title="Home" />
      <IndexHeader />
      <main>        
        <nav className="index-nav">
          <ul>
            <li>
              <Link href="/visitors">Visitors</Link>
            </li>
            <li>
              <Link href="/login">Members</Link>
            </li>
          </ul>
        </nav>      
      </main>
      <Footer />      
    </Layout>
  );
};

export default IndexPage;