import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Feed from './component/Feed';  
import Auth from './component/Auth';  
import SignUp from './component/SignupPage';
import Profile from "./component/Profile";
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  const [isSignUp, setIsSignUp] = React.useState(false);

  return (
    <Routes>
      <Route path="/" element={isSignUp ? <SignUp setIsSignUp={setIsSignUp} /> : <Auth setIsSignUp={setIsSignUp} />} />
      <Route path="/login" element={<Auth setIsSignUp={setIsSignUp} />} />
      <Route path="/signup" element={<SignUp setIsSignUp={setIsSignUp} />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/profile" element={<Profile />} />
     
    </Routes>
  );
};

export default App;
