import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../api';

const Embed = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [secretText, setSecretText] = useState('');
  const [stegoImageUrl, setStegoImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
      setStegoImageUrl(null); // Reset stego image on new file selection
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
      Swal.fire('Error', 'Gagal mengunduh gambar.', 'error');
      console.error(err);
    }
  };
  
  const handleEmbed = async () => {
    if (!coverImage || !secretText) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Silakan pilih gambar dan masukkan teks rahasia.',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    setLoading(true);
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
      const newStegoImageUrl = response.data.stego_image_url;
      setStegoImageUrl(newStegoImageUrl);

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Teks berhasil disisipkan ke dalam gambar.',
        showCancelButton: true,
        confirmButtonText: 'Unduh Gambar',
        cancelButtonText: 'Tutup',
        confirmButtonColor: '#3b82f6',
      }).then((result) => {
        if (result.isConfirmed) {
          // We need to pass the new URL directly as setState is async
          handleDownloadWithUrl(newStegoImageUrl);
        }
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Terjadi Kesalahan',
        text: 'Gagal menyisipkan teks. Silakan coba lagi.',
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper for downloading immediately after success
  const handleDownloadWithUrl = async (urlToDownload) => {
    try {
        const response = await axios.get(urlToDownload, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'stego_image.png');
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (err) {
        Swal.fire('Error', 'Gagal mengunduh gambar.', 'error');
        console.error(err);
    }
  };


  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body p-6 md:p-8">
        <h2 className="card-title text-2xl mb-4">Sisipkan Teks</h2>
        
        {preview && (
          <div className="mb-4">
            <img src={preview} alt="Preview" className="rounded-lg max-h-64 object-contain mx-auto border border-base-300" />
          </div>
        )}
        
        <div className="form-control gap-y-4">
          <div>
            <label className="label">
              <span className="label-text">Pilih Gambar Cover</span>
            </label>
            <input type="file" className="file-input file-input-bordered w-full" accept="image/*" onChange={handleImageChange} />
          </div>
          
          <div>
            <label className="label">
              <span className="label-text">Teks Rahasia</span>
            </label>
            <textarea className="textarea textarea-bordered h-24 w-full" placeholder="Masukkan teks di sini" value={secretText} onChange={(e) => setSecretText(e.target.value)}></textarea>
          </div>
        </div>

        <div className="card-actions justify-end mt-6">
          <button onClick={handleEmbed} disabled={loading} className="btn btn-primary w-full sm:w-auto">
            {loading ? <span className="loading loading-spinner"></span> : 'Sisipkan Teks'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Embed;