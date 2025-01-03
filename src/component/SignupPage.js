import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './signup.css';

const SignUp = ({ setIsSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSignUp = () => {
    // Create a new user object with the correct state variables
    const newUser = {
      email: email.trim(),  
      password: password.trim(),  
      name: name.trim(),  
    };

    // Log to check the user data
    console.log('Saving user:', newUser);

    // Save the new user to localStorage
    localStorage.setItem('user', JSON.stringify(newUser));  

    alert('Sign up successful!');
    setIsSignUp(false);  // Optionally redirect to login page after signup
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button onClick={handleSignUp}>Sign Up</button>
        <div className="login-link">
          <p>Already have an account?</p>
          <button onClick={() => setIsSignUp(false)}>Log In</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
