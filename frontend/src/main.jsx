import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom'; // Import createRoot
import App from './App.jsx';
import './index.css';
import Appbar from './Appbar.jsx';

const root = createRoot(document.getElementById('root')); // Create a root

root.render(
  
    <React.StrictMode>
   
    <App />
  </React.StrictMode>
 
  
);
