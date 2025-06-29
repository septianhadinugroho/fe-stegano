import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';

const Extract = () => {
  const [stegoImage, setStegoImage] = useState(null);
  const [secretText, setSecretText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStegoImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

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
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Ekstrak Teks</h2>
        {preview && <img src={preview} alt="Preview" className="rounded-lg max-h-64 object-contain mx-auto" />}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pilih Gambar Steganografi</span>
          </label>
          <input type="file" className="file-input file-input-bordered w-full" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="card-actions justify-end">
          <button onClick={handleExtract} disabled={loading} className="btn btn-primary">
            {loading ? <span className="loading loading-spinner"></span> : 'Ekstrak'}
          </button>
        </div>
        {error && <div className="alert alert-error mt-4">{error}</div>}
        {secretText !== null && (
          <div className="alert alert-success mt-4">
            <div>
              <h3 className="font-bold">Teks Rahasia:</h3>
              <p>{secretText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Extract;