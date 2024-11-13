import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './StokKaryawan.css'

function StockTableKaryawan() {
    const navigate = useNavigate();

    const initialData = [
        { no: 1, nama: "Obat A", id: "A001", jenis: "PILL", stok: 50 },
        { no: 2, nama: "Obat B", id: "B001", jenis: "SIRUP", stok: 30 },
        { no: 3, nama: "Obat C", id: "C001", jenis: "PILL", stok: 20 },
        { no: 4, nama: "Obat D", id: "D001", jenis: "SIRUP", stok: 10 },
        { no: 5, nama: "Obat E", id: "E001", jenis: "PILL", stok: 5 },
    ];

    const [data,] = useState(initialData);
    const [jenisFilter, setJenisFilter] = useState("");

    const handleFilterChange = (event) => {
        setJenisFilter(event.target.value);
    };

    const filteredData = jenisFilter
        ? data.filter(item => item.jenis === jenisFilter)
        : data;

    const handleTambahStokClick = () => {
        navigate("/TambahStokKaryawan");
    };

    const handleTambahObatClick = () => {
        navigate("/TambahObatKaryawan");
    };

    const handleEditClick = () => {
        navigate("/EditObatKaryawan"); // Navigate to Edit Obat page
    };

    const handleHomeClick = () => {
        navigate('/karyawan');
    };

    return (
        <div className="stock-container">
             <div className="home-button">
                <button onClick={handleHomeClick}>🏠 Home</button>
            </div>
            <h1 className="stock-title">DAFTAR STOK OBAT</h1>
            <div className="search-container">
                <input type="text" placeholder="Search" className="search-input" />
                <button className="search-button">Search</button>
            </div>
            <div className="button-group">
                <button className="button" onClick={handleTambahStokClick}>Tambah Stok</button>
                <button className="button" onClick={handleTambahObatClick}>Tambah Obat Baru</button>
            </div>
            <table className="stock-table">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>NAMA OBAT</th>
                        <th>ID OBAT</th>
                        <th>
                            <div className="header-filter">
                                JENIS OBAT
                                <select
                                    value={jenisFilter}
                                    onChange={handleFilterChange}
                                    className="jenis-dropdown"
                                >
                                    <option value="">All</option>
                                    <option value="PILL">PILL</option>
                                    <option value="SIRUP">SIRUP</option>
                                </select>
                            </div>
                        </th>
                        <th>JUMLAH STOK</th>
                        <th>EDIT</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.no}>
                            <td>{item.no}.</td>
                            <td>{item.nama}</td>
                            <td>{item.id}</td>
                            <td>{item.jenis}</td>
                            <td>{item.stok}</td>
                            <td><button className="edit-button" onClick={handleEditClick}>Edit Obat</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StockTableKaryawan;
