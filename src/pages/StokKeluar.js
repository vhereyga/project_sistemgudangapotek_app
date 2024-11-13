import React, { useState } from 'react';
import './StokKeluar.css';
import { useNavigate } from "react-router-dom";

function StokKeluar() {
    const navigate = useNavigate();
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // Second modal

    const medicines = [
        { id: 1, name: 'Obat 1', type: 'PILL' },
        { id: 2, name: 'Obat 2', type: 'PILL' }
    ];

    const addToConfirmationList = (medicine) => {
        setSelectedMedicine({ ...medicine, quantity: 1 });
        setIsModalOpen(true);
    };

    const updateQuantity = (amount) => {
        setSelectedMedicine((prevMedicine) => ({
            ...prevMedicine,
            quantity: Math.max(1, prevMedicine.quantity + amount)
        }));
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMedicine(null);
    };

    const openFinalConfirmation = () => {
        setIsConfirmationOpen(true);
    };

    const confirmAction = () => {
        setIsConfirmationOpen(false);
        closeModal();
    };

    const cancelAction = () => {
        setIsConfirmationOpen(false);
    };

    const handleHomeClick = () => {
        navigate('/index');
    };

    return (
        <div className="kontainer">
            <div className="header">
            <div className="home-button">
                <button onClick={handleHomeClick}>🏠 Home</button>
            </div>
                <h1>STOK OBAT KELUAR</h1>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search" />
                <button className="search-button">Search</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Obat</th>
                        <th>ID Obat</th>
                        <th>Jenis Obat</th>
                        <th>Jumlah Stok</th>
                        <th>Jumlah Keluar</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((medicine, index) => (
                        <tr key={medicine.id}>
                            <td>{index + 1}</td>
                            <td>{medicine.name}</td>
                            <td>{medicine.id}</td>
                            <td>{medicine.type}</td>
                            <td>100</td>
                            <td>
                                <button
                                    className="add-button"
                                    onClick={() => addToConfirmationList(medicine)}
                                >
                                    Tambah Obat ke List Keluar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* First Confirmation Modal */}
            {isModalOpen && selectedMedicine && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Konfirmasi Obat Keluar</h2>
                        <div className="order-item">
                            <span>• {selectedMedicine.name}</span>
                            <div className="quantity-controls">
                                <button
                                    className="quantity-button"
                                    onClick={() => updateQuantity(-1)}
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={selectedMedicine.quantity}
                                    readOnly
                                    className="quantity-input"
                                />
                                <button
                                    className="quantity-button"
                                    onClick={() => updateQuantity(1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button className="confirm-button" onClick={openFinalConfirmation}>
                            Konfirmasi Obat Keluar
                        </button>
                        <button className="close-button" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Second Confirmation Modal */}
            {isConfirmationOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Apakah anda ingin mengkonfirmasi pengeluaran obat?</p>
                        <div className="confirmation-buttons">
                            <button className="confirm-button" onClick={confirmAction}>
                                Ya
                            </button>
                            <button className="close-button" onClick={cancelAction}>
                                Tidak
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StokKeluar;
