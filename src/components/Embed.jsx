import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';

const Embed = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [secretText, setSecretText] = useState('');
  const [stegoImageUrl, setStegoImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDownload = async () => {
    if (!stegoImageUrl) return;
    try {
      const response = await axios.get(stegoImageUrl, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'stego_image.png');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Gagal mengunduh gambar.');
      console.error(err);
    }
  };
  
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
      const response = await axios.post(`${API_BASE_URL}/embed-text/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStegoImageUrl(response.data.stego_image_url);
    } catch (err) {
      setError('Terjadi kesalahan saat menyisipkan teks.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Sisipkan Teks</h2>
        {preview && <img src={preview} alt="Preview" className="rounded-lg max-h-64 object-contain mx-auto" />}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pilih Gambar Cover</span>
          </label>
          <input type="file" className="file-input file-input-bordered w-full" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Teks Rahasia</span>
          </label>
          <textarea className="textarea textarea-bordered h-24" placeholder="Masukkan teks di sini" value={secretText} onChange={(e) => setSecretText(e.target.value)}></textarea>
        </div>
        <div className="card-actions justify-end">
          <button onClick={handleEmbed} disabled={loading} className="btn btn-primary">
            {loading ? <span className="loading loading-spinner"></span> : 'Sisipkan'}
          </button>
        </div>
        {error && <div className="alert alert-error mt-4">{error}</div>}
        {stegoImageUrl && (
          <div className="alert alert-success mt-4">
            <div>
              <span>Teks berhasil disisipkan!</span>
              <button onClick={handleDownload} className="btn btn-sm btn-ghost">
                Unduh Gambar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Embed;