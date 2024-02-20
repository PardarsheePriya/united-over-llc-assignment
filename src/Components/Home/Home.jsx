import React from 'react';
import './Home.css'

const Home = () => {
  // Function to get cookie by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  // Function to delete a cookie by name
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  // Get user information from cookies
  const username = getCookie('username');
  const email = getCookie('email');

  // Function to handle logout
  const handleLogout = () => {
    // Clear cookies
    deleteCookie('custom_auth_token');
    deleteCookie('username');
    deleteCookie('email');

    // Redirect to login page or perform any other necessary actions
    window.location.reload(); // Reload the page for simplicity in this example
  };

  return (
    <div className="home-container">
      <h1>Welcome, {username}!</h1>
      <div className="user-details">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        {/* Add more details if needed */}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;