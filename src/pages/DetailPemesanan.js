import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure import is done correctly
import './DetailPemesanan1.css';

const dataDetailLaporan = [
    { tanggal: '01/01/2021', user: 'USER 1', mataUang: 'IDR', jumlah: 500000, obat: 'OBAT 1' },
    { tanggal: '02/01/2021', user: 'USER 1', mataUang: 'IDR', jumlah: 300000, obat: 'OBAT 2' },
    { tanggal: '03/01/2021', user: 'USER 1', mataUang: 'IDR', jumlah: 450000, obat: 'OBAT 3' },
    { tanggal: '04/01/2021', user: 'USER 1', mataUang: 'IDR', jumlah: 250000, obat: 'OBAT 4' },
    // Additional data can be added here
];

const DetailPemesanan = () => {
    const navigate = useNavigate(); // useNavigate is called inside the component

    const handleBack = () => {
        navigate(-1); // Example of using navigate to go back
    };

    return (
        <div className="detail-pemesanan-container">
            <div className="home-button"> <button onClick={handleBack}>🏠 Home</button>
                {/* Optionally, add back button UI */}
            </div>
            <div className="header">DETAIL PEMESANAN</div>
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Search" />
                <button className="search-button">Search</button>
            </div>
            <div className="report-table-container">
                <table className="report-table">
                    <thead>
                        <tr>
                            <th>Obat</th>
                            <th>Tanggal</th>
                            <th>User</th>
                            <th>Mata Uang</th>
                            <th>Jumlah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataDetailLaporan.map((report, index) => (
                            <tr key={index}>
                                <td>{report.obat}</td>
                                <td>{report.tanggal}</td>
                                <td>{report.user}</td>
                                <td>{report.mataUang}</td>
                                <td>{report.jumlah.toLocaleString('id-ID')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DetailPemesanan;
