import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import EmbedPage from './pages/EmbedPage';
import ExtractPage from './pages/ExtractPage';
import About from './components/About';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-base-200 text-base-content">
      <Header />
      <main className="flex-grow container mx-auto p-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/embed" element={<EmbedPage />} />
              <Route path="/extract" element={<ExtractPage />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;