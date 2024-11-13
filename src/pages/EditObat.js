import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditObat.css';

function EditObat() {
    const [namaObat, setNamaObat] = useState('');
    const [idObat, setIdObat] = useState('');
    const [jumlahStok, setJumlahStok] = useState('');
    const [jenisObat, setJenisObat] = useState('');
    const navigate = useNavigate();

    
    const handleBack = () => {
        navigate(-1); // Example of using navigate to go back
    };
    
    const jenisObatOptions = ["Pill", "Sirup"]; // predefined types

    const simpanData = () => {
        if (namaObat === '' || idObat === '' || jumlahStok === '' || jenisObat === '') {
            alert('Semua field harus diisi!');
            return;
        }

        // Logic to save data can be added here

        alert(`Data berhasil disimpan!\nNama Obat: ${namaObat}\nID Obat: ${idObat}\nJumlah Stok: ${jumlahStok}\nJenis Obat: ${jenisObat}`);

        // Navigate back to the stock list page
        navigate('/DaftarStok'); // Adjust the path to the stock list page as needed

        // Reset form after saving
        setNamaObat('');
        setIdObat('');
        setJumlahStok('');
        setJenisObat('');
    };

    return (
        <div className="edit-obat-container">
            <div className="home-button"> <button onClick={handleBack}>🏠 Home</button>
                {/* Optionally, add back button UI */}
            </div>
            <div className="edit-obat-box">
                <h1 className="edit-obat-title">EDIT OBAT</h1>

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
                        type="text"
                        className="form-input"
                        value={jumlahStok}
                        onChange={(e) => setJumlahStok(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Jenis Obat</label>
                    <select
                        className="form-input"
                        value={jenisObat}
                        onChange={(e) => setJenisObat(e.target.value)}
                    >
                        <option value="">Pilih Jenis Obat</option>
                        {jenisObatOptions.map((jenis, index) => (
                            <option key={index} value={jenis}>
                                {jenis}
                            </option>
                        ))}
                    </select>
                </div>

                <button className="confirm-button" onClick={simpanData}>Konfirmasi</button>
            </div>
        </div>
    );
}

export default EditObat;
