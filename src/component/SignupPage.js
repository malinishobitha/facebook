import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { Link } from 'react-router-dom';
function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate is used for navigation

  const signup = () => {
    const newUser = { username, password };
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign up successful!');
    navigate('/login'); // Redirect to login page using navigate
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={e => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      <button onClick={signup}>Sign Up</button>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default SignupPage;
