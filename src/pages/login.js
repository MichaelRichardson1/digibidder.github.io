import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import HtmlHead from '@/components/constants/HtmlHead';
import LoginHeader from '@/components/layout/LoginHeader';
import LoginForm from '@/components/forms/LoginForm';
import Footer from '@/components/layout/Footer';

const LoginPage = () => {
  const [loginStatus, setLoginStatus] = useState(null);

  const handleLoginStatus = (status) => {
    setLoginStatus(status);
  };

  return (
    <Layout>
      <HtmlHead title="Login" />
      <LoginHeader />
      <main>
        <h2>Login</h2>
        <LoginForm handleLoginStatus={handleLoginStatus} />
        {loginStatus && <p>{loginStatus}</p>}
      </main>
      <Footer />
    </Layout>
  );
};

export default LoginPage;