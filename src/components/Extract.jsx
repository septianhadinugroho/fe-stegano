// src/components/Extract.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api'; // Impor base URL

const Extract = () => {
  const [stegoImage, setStegoImage] = useState(null);
  const [secretText, setSecretText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExtract = async () => {
    if (!stegoImage) {
      setError('Silakan pilih gambar steganografi.');
      return;
    }

    setLoading(true);
    setError(null);
    setSecretText(null);

    const formData = new FormData();
    formData.append('stego_image', stegoImage);

    try {
      // Gunakan base URL yang sudah diimpor
      const response = await axios.post(`${API_BASE_URL}/extract-text/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSecretText(response.data.secret_text);
    } catch (err) {
      setError('Terjadi kesalahan saat mengekstrak teks.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-700 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Ekstrak Teks</h2>
      <div className="mb-4">
        <label htmlFor="stegoImage" className="block text-white mb-2">Pilih Gambar Steganografi</label>
        <input
          type="file"
          id="stegoImage"
          accept="image/*"
          onChange={(e) => setStegoImage(e.target.files[0])}
          className="w-full text-white"
        />
      </div>
      <button
        onClick={handleExtract}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Mengekstrak...' : 'Ekstrak'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {secretText !== null && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white">Teks Rahasia:</h3>
          <p className="text-white bg-gray-800 p-2 rounded">{secretText}</p>
        </div>
      )}
    </div>
  );
};

export default Extract;