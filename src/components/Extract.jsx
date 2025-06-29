import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../api';

const Extract = () => {
  const [stegoImage, setStegoImage] = useState(null);
  const [loading, setLoading] = useState(false);
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Silakan pilih gambar steganografi terlebih dahulu.',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('stego_image', stegoImage);

    try {
      const response = await axios.post(`${API_BASE_URL}/extract-text/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Teks Ditemukan!',
        html: `<p class="text-left">Berikut adalah pesan rahasia yang berhasil diekstrak:</p><pre class="text-left bg-base-200 p-2 rounded mt-2"><code>${response.data.secret_text}</code></pre>`,
        confirmButtonColor: '#3b82f6',
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengekstrak',
        text: 'Tidak ada pesan rahasia yang ditemukan atau terjadi kesalahan pada server.',
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
       <div className="card-body p-6 md:p-8">
        <h2 className="card-title text-2xl mb-4">Ekstrak Teks</h2>
        
        {preview && (
           <div className="mb-4">
            <img src={preview} alt="Preview" className="rounded-lg max-h-64 object-contain mx-auto border border-base-300" />
           </div>
        )}
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pilih Gambar Steganografi</span>
          </label>
          <input type="file" className="file-input file-input-bordered w-full" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="card-actions justify-end mt-6">
          <button onClick={handleExtract} disabled={loading} className="btn btn-primary w-full sm:w-auto">
            {loading ? <span className="loading loading-spinner"></span> : 'Ekstrak Teks'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Extract;