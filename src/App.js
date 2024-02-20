import './App.css';
// import Navbar from './Components/NavBar/Navbar';
import React, { useState } from 'react';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Logic to determine if the user is authenticated, e.g., check for the presence of the access token
  // This logic may vary based on your authentication implementation
  const checkAuthentication = () => {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken; // Return true if the access token is present, otherwise false
  };

  // Function to handle authentication status change
  const handleAuthenticationChange = () => {
    const isAuthenticatedNow = checkAuthentication();
    setIsAuthenticated(isAuthenticatedNow);
  };

  return (
    <div className="App">
      {/* Use conditional rendering to show LoginSignup or Home based on authentication status */}
      {isAuthenticated ? (
        <Home />
      ) : (
        <LoginSignup onAuthenticationChange={handleAuthenticationChange} />
      )}
    </div>
  );
};

export default App;
