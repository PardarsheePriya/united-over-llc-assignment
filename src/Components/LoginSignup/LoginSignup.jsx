import React, { useState, useEffect } from 'react';
import './LoginSignup.css';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import Home from '../Home/Home'; // Import the Home component

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    // Check if user is already logged in
    const token = getCookie('custom_auth_token');
    if (token) {
      setLoggedIn(true);
      // You can fetch user information from cookies and perform necessary actions here
    }
  }, []);

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://pardarsheelocal.local/wp-json/custom-auth/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          email,
          password,
        }),
      });
  
      if (response.ok) {
        console.log('Signup successful');
        // Handle success, maybe redirect or show success message
      } else {
        console.error('Signup failed');
        // Handle failure, maybe show error message
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  
  const handleLogin = async () => {
    try {
      const response = await fetch('https://pardarsheelocal.local/wp-json/custom-auth/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful');
        console.log(data);
        // Handle success, maybe show success message
        setLoggedIn(true); // Update login state to true
        // Store token in browser's cookies
        document.cookie = `custom_auth_token=${data.token}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/;`; // Token expires in 30 days
        document.cookie = `username=${data.username}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/;`; // Save username to cookie
        document.cookie = `email=${email}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/;`; // Save email to cookie
      } else {
        console.error('Login failed');
        // Handle failure, maybe show error message
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Function to get cookie by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <div className='container'>
      {!loggedIn ? ( // Conditionally render login/signup form if not logged in
        <>
          <div className='header'>
            <div className='text'>Sign Up</div>
            <div className='underline'></div>
          </div>
          <div className='inputs'>
            <div className='input'>
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='input'>
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className='forgot-password'>
            Forgot Your Password? <span>Click here</span>
          </div>
          <div className='submit-container'>
            <div className='submit' onClick={handleSignUp}>
              Sign Up
            </div>
            <div className='submit' onClick={handleLogin}>
              Login
            </div>
          </div>
        </>
      ) : (
        <Home /> // Render Home component if logged in
      )}
    </div>
  );
};

export default LoginSignup;