import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './css/signup.css';

const SignUp = ({ setIsSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSignUp = () => {
    if (!email.trim() || !password.trim() || !name.trim()) {
      alert('Please fill in all fields!');
      return;
    }

    const newUser = {
      email: email.trim(),
      password: password.trim(),
      name: name.trim(),
    };
    localStorage.setItem('user', JSON.stringify(newUser));

    alert('Sign up successful!');

    if (typeof setIsSignUp === 'function') {
      setIsSignUp(false); 
    } else {
      console.error('setIsSignUp is not defined or not a function!');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
          alt="Facebook Logo"
          className="facebook-logo"
        />
        <h2>Facebook</h2>
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
          <button onClick={() => setIsSignUp(false)}>Log In</button>        </div>
      </div>
    </div>
  );
};

export default SignUp;
