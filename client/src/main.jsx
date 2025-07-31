import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import axios from 'axios';
import { AuthProvider } from './AuthContext.jsx';

// In development, requests will be proxied through Vite's dev server
// In production, this will use the full URL from the environment variable
const baseURL = import.meta.env.DEV 
  ? '/api' 
  : import.meta.env.VITE_API_BASE_URL || 'https://web-production-254279.up.railway.app';

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
