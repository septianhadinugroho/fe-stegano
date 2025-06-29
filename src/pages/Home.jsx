import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="hero min-h-fit bg-base-200 rounded-lg">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Sembunyikan Pesan Anda</h1>
          <p className="py-6">Selamat datang di aplikasi steganografi modern. Dengan mudah sembunyikan teks rahasia di dalam gambar dan ekstrak kembali dengan aman.</p>
          <div className="space-x-4">
            <Link to="/embed" className="btn btn-primary">Mulai Menyisipkan</Link>
            <Link to="/extract" className="btn btn-secondary">Mulai Mengekstrak</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;