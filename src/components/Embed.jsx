// src/components/Embed.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api'; // Impor base URL

const Embed = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [secretText, setSecretText] = useState('');
  const [stegoImageUrl, setStegoImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEmbed = async () => {
    if (!coverImage || !secretText) {
      setError('Silakan pilih gambar dan masukkan teks rahasia.');
      return;
    }

    setLoading(true);
    setError(null);
    setStegoImageUrl(null);

    const formData = new FormData();
    formData.append('cover_image', coverImage);
    formData.append('secret_text', secretText);

    try {
      // Gunakan base URL yang sudah diimpor
      const response = await axios.post(`${API_BASE_URL}/embed-text/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStegoImageUrl(response.data.stego_image_url);
    } catch (err) {
      setError('Terjadi kesalahan saat menyisipkan teks. Pastikan backend berjalan.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-700 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Sisipkan Teks</h2>
      <div className="mb-4">
        <label htmlFor="coverImage" className="block text-white mb-2">Pilih Gambar Cover</label>
        <input
          type="file"
          id="coverImage"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          className="w-full text-white"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="secretText" className="block text-white mb-2">Teks Rahasia</label>
        <textarea
          id="secretText"
          rows="4"
          value={secretText}
          onChange={(e) => setSecretText(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        ></textarea>
      </div>
      <button
        onClick={handleEmbed}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Menyisipkan...' : 'Sisipkan'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {stegoImageUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white">Hasil:</h3>
          <a
            href={stegoImageUrl}
            download
            className="text-blue-400 hover:underline"
          >
            Unduh Gambar Steganografi
          </a>
        </div>
      )}
    </div>
  );
};

export default Embed;