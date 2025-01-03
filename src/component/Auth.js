import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom'; // Correct import for navigation
import './Auth.css';

const Auth = ({ setIsSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Create navigate instance here (useNavigate instead of history)

  const handleLogin = () => {
    const existingUser = localStorage.getItem('user');
    
    if (existingUser) {
      const user = JSON.parse(existingUser);
  
      console.log('Retrieved user from localStorage:', user);  // Check what is in localStorage
      console.log('Entered email and password:', email.trim(), password.trim());  // Check entered values
  
      if (user.email === email.trim() && user.password === password.trim()) {
        dispatch(login({ email, name: user.name }));
        setErrorMessage('');
        alert('Logged in successfully!');
        navigate('/feed');
      } else {
        setErrorMessage('Invalid email or password');
      }
    } else {
      setErrorMessage('No user found. Please sign up.');
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-box">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
          alt="Facebook Logo"
          className="facebook-logo"
        />
        <h2>Facebook</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log In</button>
        
        {/* Show error message if login fails */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Forgotten password?</p>
        <div className="signup-link">
          <p>Don't have an account?</p>
          {/* Clicking this will show the SignUp page */}
          <button onClick={() => setIsSignUp(true)}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
