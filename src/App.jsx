import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; // Impor Footer
import Home from './pages/Home'; // Halaman baru untuk Home
import EmbedPage from './pages/EmbedPage'; // Halaman baru untuk Embed
import ExtractPage from './pages/ExtractPage'; // Halaman baru untuk Extract
import About from './components/About';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-base-200 text-base-content">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/embed" element={<EmbedPage />} />
          <Route path="/extract" element={<ExtractPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;