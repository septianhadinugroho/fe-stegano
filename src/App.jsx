import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Embed from './components/Embed';
import Extract from './components/Extract';
import About from './components/About'; // Komponen baru

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      <nav className="bg-gray-800 text-white p-4 text-center">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={
            <div className="grid md:grid-cols-2 gap-8">
              <Embed />
              <Extract />
            </div>
          } />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;