import React from 'react';
import Header from './components/Header';
import Embed from './components/Embed';
import Extract from './components/Extract';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      <main className="container mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-8">
          <Embed />
          <Extract />
        </div>
      </main>
    </div>
  );
}

export default App;