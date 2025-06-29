import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Impor untuk animasi
import 'aos/dist/aos.css'; 
import AOS from 'aos';

// Inisialisasi AOS
AOS.init({
  duration: 1000, // Durasi animasi dalam milidetik
  once: true,     // Animasi hanya berjalan sekali
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);