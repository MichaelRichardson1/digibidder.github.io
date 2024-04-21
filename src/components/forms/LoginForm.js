import { useState } from 'react';
import { useRouter } from 'next/router'; 
import { LOGIN_URL, APIKEY_URL, PROFILE_URL } from '../constants/api'; 

const LoginForm = ({ handleLoginStatus }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  const handleLogin = async (event) => {
    event.preventDefault(); 

    try {
      // Login returns the access token in the response
      const loginResponse = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        throw new Error('Email or password is invalid');
      }

      const loginData = await loginResponse.json();
      const accessToken = loginData.data.accessToken;

      // Use access token to create API Key
      const apiKeyResponse = await fetch(APIKEY_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!apiKeyResponse.ok) {
        throw new Error('Failed to create API key');
      }

      const apiKeyData = await apiKeyResponse.json();
      const apiKey = apiKeyData.data.key;

      // Fetch user profile using the user's email as a unique identifier
      const profileResponse = await fetch(`${PROFILE_URL}?email=${email}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': apiKey,
        },
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch user profile');
      }

      // Store authToken, apiKey, and userEmail in localStorage
      localStorage.setItem('authToken', accessToken);
      localStorage.setItem('apiKey', apiKey);
      localStorage.setItem('userName', loginData.data.name); // Store the user's name
      localStorage.setItem('userEmail', loginData.data.email); // Store the user's email address

      // Authorization successful message/alert
      handleLoginStatus('Login successful. You will now be redirected to the members page.');
      window.alert('Login successful. You will now be redirected to the members page.');

      // Redirect to members page if login is successful
      router.push('/members');
    } catch (error) {
      handleLoginStatus(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="loginform-container">
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;