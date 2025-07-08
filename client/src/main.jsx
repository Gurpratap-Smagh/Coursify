import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import axios from 'axios';
import { AuthProvider } from './AuthContext.jsx';

axios.defaults.baseURL = "https://coursify-bcdxe5enb5b9g3gb.canadacentral-01.azurewebsites.net";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
