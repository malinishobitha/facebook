import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client' for React 18+
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create the root element

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
