import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Don't import BrowserRouter here
import Feed from './component/Feed';  
import Auth from './component/Auth';  
import SignUp from './component/SignupPage';

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
    </Routes>
  );
};

export default App;
