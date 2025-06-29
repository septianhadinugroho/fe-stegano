import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="hero min-h-fit bg-base-200 rounded-lg py-16">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <motion.h1 
            className="text-5xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sembunyikan Pesan Anda
          </motion.h1>
          <motion.p 
            className="py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Selamat datang di aplikasi steganografi pvd. Dengan mudah sembunyikan teks rahasia di dalam gambar dan ekstrak kembali dengan aman.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/embed" className="btn btn-primary w-full sm:w-auto">Mulai Menyisipkan</Link>
            <Link to="/extract" className="btn btn-secondary w-full sm:w-auto">Mulai Mengekstrak</Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;