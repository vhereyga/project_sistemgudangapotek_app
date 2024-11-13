// TambahObat.js

import React, { useState } from 'react';
import './TambahObat.css'; // Pastikan file CSS sudah terhubung
import { useNavigate } from 'react-router-dom';

function TambahObat() {
    const [namaObat, setNamaObat] = useState('');
    const [idObat, setIdObat] = useState('');
    const [jumlahStok, setJumlahStok] = useState('');
    const [jenisObat, setJenisObat] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    
    const handleSubmit = (e) => {
        e.preventDefault(); // Mencegah refresh halaman

        // Validasi: Pastikan semua field diisi
        if (!namaObat || !idObat || !jumlahStok || !jenisObat) {
            setNotification({ message: 'Semua field harus diisi!', type: 'error' });
            return;
        }

        // Jika semua field terisi, lakukan tindakan untuk menambah obat
        // Misalnya, simpan data ke API atau state
        console.log('Obat berhasil ditambahkan:', { namaObat, idObat, jumlahStok, jenisObat });

        // Reset form dan notification setelah berhasil
        setNamaObat('');
        setIdObat('');
        setJumlahStok('');
        setJenisObat('');
        setNotification({ message: 'Obat berhasil ditambahkan!', type: 'success' });
    };

        const navigate = useNavigate(); // useNavigate is called inside the component
    
        const handleBack = () => {
            navigate(-1); // Example of using navigate to go back
        };

    return (
        <div className="tambah-obat-container">
            <div className="home-button"> <button onClick={handleBack}>🏠 Home</button>
                {/* Optionally, add back button UI */}
            </div>
            <div className="tambah-obat-box">
        
                <h1 className="tambah-obat-title">TAMBAH OBAT</h1>

                {/* Menampilkan notifikasi */}
                {notification.message && (
                    <div className={`notification ${notification.type}`}>
                        {notification.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Nama Obat</label>
                        <input
                            type="text"
                            className="form-input"
                            value={namaObat}
                            onChange={(e) => setNamaObat(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">ID Obat</label>
                        <input
                            type="text"
                            className="form-input"
                            value={idObat}
                            onChange={(e) => setIdObat(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Jumlah Stok</label>
                        <input
                            type="number"
                            className="form-input"
                            value={jumlahStok}
                            onChange={(e) => setJumlahStok(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Jenis Obat</label>
                        <input
                            type="text"
                            className="form-input"
                            value={jenisObat}
                            onChange={(e) => setJenisObat(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="confirm-button">Konfirmasi</button>
                </form>
            </div>
        </div>
    );
}

export default TambahObat;
