import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Laporan.css';

function Laporan() {
  const [tahunFilter, setTahunFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/index');
  };

  const handleDetailClick = (item) => {
    navigate('/DetailLaporan', { state: item }); // Mengirim data saat menavigasi ke halaman detail
  };

  const dataLaporan = [
    { bulan: 'Januari/2021', user: 'USER 1', pemasok: 'PT. PEMASOK' },
    { bulan: 'Februari/2022', user: 'USER 2', pemasok: 'PT. PEMASOK' },
    // Data tambahan jika ada
  ];

  const filteredData = dataLaporan.filter((item) => 
    item.bulan.includes(tahunFilter) && 
    (item.bulan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.pemasok.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="laporan-container">
      <div className="home-button">
        <button onClick={handleHomeClick}>🏠 Home</button>
      </div>
      <div className="header-1">
        <h1>LAPORAN</h1>
      </div>
      <div className="controls">
        <select onChange={(e) => setTahunFilter(e.target.value)}>
          <option value="">TAHUN</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          {/* Tambahkan tahun lain jika diperlukan */}
        </select>
      </div>
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Search" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>BULAN</th>
            <th>USER</th>
            <th>PEMASOK</th>
            <th>PERMINTAAN</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.bulan}</td>
              <td>{item.user}</td>
              <td>{item.pemasok}</td>
              <td>
                <button className="detail-button" onClick={() => handleDetailClick(item)}>
                  DETAIL LAPORAN
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Laporan;
