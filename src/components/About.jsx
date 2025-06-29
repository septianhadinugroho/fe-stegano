import React from 'react';

const About = () => {
  const team = [
    { name: 'Nama Anggota 1', role: 'Peran' },
    { name: 'Nama Anggota 2', role: 'Peran' },
    { name: 'Nama Anggota 3', role: 'Peran' },
    { name: 'Nama Anggota 4', role: 'Peran' },
  ];

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold mb-4">Tentang Steganografi PVD</h2>
      <p className="mb-4">
        Aplikasi ini adalah alat untuk menyembunyikan pesan rahasia di dalam gambar menggunakan teknik steganografi.
      </p>

      <h3 className="text-xl font-semibold mb-2">Teknologi yang Digunakan</h3>
      <ul className="list-disc list-inside mb-4">
        <li>React</li>
        <li>Tailwind CSS</li>
        <li>Axios</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Fitur</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Menyisipkan teks ke dalam gambar (Embed)</li>
        <li>Mengekstrak teks dari gambar (Extract)</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Tim Pengembang</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {team.map((member, index) => (
          <div key={index} className="text-center">
            <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-2"></div>
            <p className="font-bold">{member.name}</p>
            <p className="text-sm text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;