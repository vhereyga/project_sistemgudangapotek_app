import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TambahStok.css';

const TambahStok = () => {
    const navigate = useNavigate();

    const [quantities, setQuantities] = useState(Array(5).fill(0));
    const [jenisObat, setJenisObat] = useState(""); // State to store selected jenis obat

    const handleIncrement = (index) => {
        setQuantities((prevQuantities) =>
            prevQuantities.map((quantity, i) =>
                i === index ? quantity + 1 : quantity
            )
        );
    };

    const handleDecrement = (index) => {
        setQuantities((prevQuantities) =>
            prevQuantities.map((quantity, i) =>
                i === index && quantity > 0 ? quantity - 1 : quantity
            )
        );
    };

    const handleConfirm = () => {
        navigate('/DaftarStok');
    };

    const handleBack = () => {
        navigate(-1); // Example of using navigate to go back
    };

    // Function to handle dropdown change
    const handleJenisChange = (event) => {
        setJenisObat(event.target.value);
    };

    // Sample data for nama obat and id obat
    const obatData = [
        { nama: "Obat A", id: "001", jenis: "PILL" },
        { nama: "Obat B", id: "002", jenis: "SIRUP" },
        { nama: "Obat C", id: "003", jenis: "PILL" },
        { nama: "Obat D", id: "004", jenis: "SIRUP" },
        { nama: "Obat E", id: "005", jenis: "PILL" },
    ];

    // Filter obat data based on jenisObat
    const filteredObatData = jenisObat
        ? obatData.filter(obat => obat.jenis === jenisObat)
        : obatData;

    return (
        <div className="stock-container">
            <div className="home-button"> <button onClick={handleBack}>🏠 Home</button>
                {/* Optionally, add back button UI */}
            </div>

            {/* Page Title */}
            <div className="stock-title">TAMBAH STOK OBAT</div>

            {/* Search Container */}
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Search..." />
                <button className="search-button">Search</button>
            </div>

            {/* Confirm Button */}
            <div className="button-group">
                <button className="button" onClick={handleConfirm}>Konfirmasi</button>
            </div>

            {/* Stock Table */}
            <table className="stock-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Obat</th>
                        <th>ID Obat</th>
                        <th className="header-filter">
                            Jenis Obat
                            <select
                                value={jenisObat}
                                onChange={handleJenisChange}
                                className="jenis-dropdown"
                            >
                                <option value="">All</option>
                                <option value="PILL">PILL</option>
                                <option value="SIRUP">SIRUP</option>
                            </select>
                        </th>
                        <th>Tambah Jumlah Stok</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredObatData.map((obat, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{obat.nama}</td>
                            <td>{obat.id}</td>
                            <td>{obat.jenis}</td>
                            <td>
                                <div className="stock-adjust">
                                    <button
                                        className="adjust-button"
                                        onClick={() => handleDecrement(index)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        className="stock-input"
                                        value={quantities[index]}
                                        readOnly
                                    />
                                    <button
                                        className="adjust-button"
                                        onClick={() => handleIncrement(index)}
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TambahStok;
