// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import { ThemeProvider } from './context/ThemeContext'; // ← ADD THIS LINE

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>  {/* ← WRAP HERE */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);