import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Don't import BrowserRouter here
import Feed from './component/Feed';  
import Auth from './component/Auth';  
import SignUp from './component/SignupPage';
import Profile from "./component/Profile";

const App = () => {
  const [isSignUp, setIsSignUp] = React.useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={isSignUp ? <SignUp setIsSignUp={setIsSignUp} /> : <Auth setIsSignUp={setIsSignUp} />}
      />
      <Route path="/feed" element={<Feed />} />
      <Route path="/posts" element={<Feed />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/Auth" element={<Auth/>} />
    </Routes>
  );
};

export default App;
