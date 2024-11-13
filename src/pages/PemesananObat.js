import React, { useState } from 'react';
import './PemesananObat.css';
import { useNavigate } from "react-router-dom";

function PemesananObat() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [showFailureModal, setShowFailureModal] = useState(false); // State for failure modal
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
    const [medicines] = useState([
        { id: 1, name: "Obat 1" },
        { id: 2, name: "Obat 2" },
        { id: 3, name: "Obat 3" },
        { id: 4, name: "Obat 4" }
    ]);

    const handleHomeClick = () => {
        navigate('/index');
    };
    
    const addToCart = (medicine) => {
        setCart((prevCart) => {
            const itemExists = prevCart.find(item => item.id === medicine.id);
            if (itemExists) {
                return prevCart.map(item =>
                    item.id === medicine.id ? { ...item, qty: item.qty + 1 } : item
                );
            } else {
                return [...prevCart, { ...medicine, qty: 1 }];
            }
        });
    };

    const updateQty = (id, increment) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === id ? { ...item, qty: item.qty + increment } : item
            ).filter(item => item.qty > 0)
        );
    };

    // Check if cart is empty or has items and show the respective modal
    const confirmOrder = () => {
        if (cart.length === 0) {
            setShowFailureModal(true); // Show failure modal if cart is empty
        } else {
            setShowSuccessModal(true); // Show success modal if cart has items
        }
    };

    const closeFailureModal = () => setShowFailureModal(false);
    const closeSuccessModal = () => setShowSuccessModal(false);

    return (
        
        <div className={`pemesanan-container ${showFailureModal || showSuccessModal ? "blur" : ""}`}>
            <div className="home-button">
                <button onClick={handleHomeClick}>🏠 Home</button>
            </div>
            <h1 className="title">PEMESANAN OBAT</h1>
            <div className="search-container">
                <input type="text" placeholder="Cari obat..." className="search-input" />
                <button className="search-button">Search</button>
            </div>

            {/* Bagian Tabel Obat */}
            <table className="medicine-table">
                <thead>
                    <tr>
                        <th>Nama Obat</th>
                        <th>Button</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map(medicine => (
                        <tr key={medicine.id}>
                            <td>{medicine.name}</td>
                            <td>
                                <button onClick={() => addToCart(medicine)} className="add-button">Tambah Obat ke Keranjang</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="cart-container">
                {cart.length === 0 ? (
                    <p className="empty-cart">Tidak ada pesanan dalam keranjang</p>
                ) : (
                    <div className="cart-list">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <span className="cart-name">{item.name}</span>
                                <div className="quantity-controls">
                                    <button onClick={() => updateQty(item.id, -1)} className="qty-button">-</button>
                                    <span className="qty">{item.qty}</span>
                                    <button onClick={() => updateQty(item.id, 1)} className="qty-button">+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <button onClick={confirmOrder} className="confirm-button">Konfirmasi Pemesanan</button>
            </div>

            {showFailureModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Konfirmasi Pemesanan gagal, harap pilih barang yang ingin di pesan</p>
                        <button onClick={closeFailureModal} className="close-button">Tutup</button>
                    </div>
                </div>
            )}

            {showSuccessModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Konfirmasi pesanan berhasil, tunggu konfirmasi pembelian dari admin</p>
                        <button onClick={closeSuccessModal} className="close-button">Tutup</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PemesananObat;
