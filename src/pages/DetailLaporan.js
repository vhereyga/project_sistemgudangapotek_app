import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './DetailLaporan.css';

function DetailLaporan() {
  const location = useLocation();
  const { bulan, user, pemasok } = location.state || {}; // Mengambil data dari state atau objek kosong jika tidak ada

  const navigate = useNavigate(); // useNavigate is called inside the component
  const handleBack = () => {
      navigate(-1); // Example of using navigate to go back
  };
  // Jika data tidak ada, tampilkan pesan error atau redirect
  if (!bulan || !user || !pemasok) {
    return <p>Data tidak ditemukan. Harap kembali ke halaman sebelumnya.</p>;
  }

  // Contoh data laporan yang lebih lengkap
  const dataDetailLaporan = [
    { tanggal: '01/01/2021', user: 'USER 1', mataUang: 'IDR', jumlah: 500000 },
    { tanggal: '02/01/2021', user: 'USER 1', mataUang: 'IDR', jumlah: 300000 },
    { tanggal: '03/01/2021', user: 'USER 1', mataUang: 'IDR', jumlah: 450000 },
    // Tambahkan data lainnya jika ada
  ];

  // Menghitung total
  const total = dataDetailLaporan.reduce((sum, item) => sum + item.jumlah, 0);

  return (
    <div className="detail-permintaan">
        <div className="home-button"> <button onClick={handleBack}>🏠 Home</button>
                {/* Optionally, add back button UI */}
            </div>
      <h1>Detail</h1>
      <p><strong>Bulan:</strong> {bulan}</p>
      <p><strong>User:</strong> {user}</p>
      <p><strong>Pemasok:</strong> {pemasok}</p>
      <h2>Detail Laporan</h2>
      <table>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>User</th>
            <th>Mata Uang</th>
            <th>Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {dataDetailLaporan.map((item, index) => (
            <tr key={index}>
              <td>{item.tanggal}</td>
              <td>{item.user}</td>
              <td>{item.mataUang}</td>
              <td>{item.jumlah.toLocaleString()}</td> {/* Menampilkan jumlah dengan format angka */}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"><strong>Total</strong></td>
            <td><strong>{total.toLocaleString()}</strong></td> {/* Menampilkan total */}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default DetailLaporan;
