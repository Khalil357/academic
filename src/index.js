// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // We'll add some basic styling
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
