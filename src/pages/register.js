import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import HtmlHead from '@/components/constants/HtmlHead';
import RegisterHeader from '@/components/layout/RegisterHeader';
import RegistrationForm from '@/components/forms/RegistrationForm';
import Footer from '@/components/layout/Footer';

const RegisterPage = () => {
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleRegistrationStatus = (status) => {
    setRegistrationStatus(status);
  };

  return (
    <Layout>
      <HtmlHead title="Register" />
      <RegisterHeader />
      <main>
        <h2>Register</h2>
        <RegistrationForm handleRegistrationStatus={handleRegistrationStatus} />
        {registrationStatus && <p>{registrationStatus}</p>}
      </main>
      <Footer />
    </Layout>
  );
};

export default RegisterPage;