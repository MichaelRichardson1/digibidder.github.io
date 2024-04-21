import { useState } from 'react';
import { useRouter } from 'next/router'; 
import { REGISTER_URL } from '../constants/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string()
    .matches(/^[a-zA-Z]+(?:_[a-zA-Z]+)*$/, 'Name must not contain punctuation symbols apart from underscore (_)') // Restriction for name
    .required('Name is required'), 
  email: yup.string()
    .email('Must be a valid email') 
    .matches(/@stud\.noroff\.no$/, 'Must be a stud.noroff.no email address') 
    .required('Email is required'), 
  password: yup.string()
    .min(8, 'Password must be at least 8 characters') 
    .required('Password is required'), 
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match') // 
    .required('Confirm Password is required'), 
});

const RegistrationForm = ({ handleRegistrationStatus }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter(); 

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      }); // Successful registration assigns an accessToken to the user
  
      const responseData = await response.json();
  
      if (!response.ok) {
        if (responseData.error && responseData.error.message) {
          throw new Error(responseData.error.message);
        } else {
          throw new Error('Registration failed due to an unknown error');
        }
      }
  
      // Redirect to login page upon successful registration
      alert('Registration successful. You will now be redirected to the login page.');
      router.push('/login');
    } catch (error) {
      handleRegistrationStatus(`Registration failed: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="regform-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input type="text" name="name" {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" {...register('confirmPassword')} />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
      {/* Optional fields */}
      {/* <div>
        <label>Bio</label>
        <input type="text" name="bio" {...register('bio')} />
        {errors.bio && <p>{errors.bio.message}</p>}
      </div>
      <div>
        <label>Avatar URL</label>
        <input type="text" name="avatar.url" {...register('avatar.url')} />
        {errors.avatar && errors.avatar.url && <p>{errors.avatar.url.message}</p>}
      </div>
      <div>
        <label>Avatar Alt Text</label>
        <input type="text" name="avatar.alt" {...register('avatar.alt')} />
        {errors.avatar && errors.avatar.alt && <p>{errors.avatar.alt.message}</p>}
      </div>
      <div>
        <label>Banner URL</label>
        <input type="text" name="banner.url" {...register('banner.url')} />
        {errors.banner && errors.banner.url && <p>{errors.banner.url.message}</p>}
      </div>
      <div>
        <label>Banner Alt Text</label>
        <input type="text" name="banner.alt" {...register('banner.alt')} />
        {errors.banner && errors.banner.alt && <p>{errors.banner.alt.message}</p>}
      </div>
      <div>
        <label>Venue Manager</label>
        <input type="checkbox" name="venueManager" {...register('venueManager')} />
        {errors.venueManager && <p>{errors.venueManager.message}</p>}
      </div> */}
        <button type="submit" disabled={submitting}>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;