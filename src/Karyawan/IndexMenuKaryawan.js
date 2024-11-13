import React from "react";
import { useNavigate } from "react-router-dom";  // Import the useNavigate hook
import "./IndexMenuKaryawan.css";

function IndexMenuKaryawan() {
  const navigate = useNavigate();  // Initialize navigate hook

  const handleLogout = () => {
    // You can add logout logic here (e.g., clearing tokens, session, etc.)
    navigate("/");  // Redirect to the login page after logout
  };

  const goToDaftarStok = () => {
    navigate("/DaftarStokKaryawan"); // Arahkan ke halaman Daftar Stok
  };

  const goToPemesananObat = () => {
    navigate("/PemesananObatKaryawan"); // Arahkan ke halaman Pemesanan Obat
  };

  const goToStokKeluar = () => {
    navigate("/StokKeluarKaryawan"); // Arahkan ke halaman Pemesanan Obat
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">MENU UTAMA KARYAWAN</h1>
      <div className="menu-grid">

        <div className="menu-item" onClick={goToDaftarStok}>
          <img
            src="/daftarstok.png" // Replace with correct path to icons
            alt="Daftar Stok Obat"
            className="menu-icon"
          />
          <p>Daftar Stok Obat</p>
        </div>

        <div className="menu-item" onClick={goToPemesananObat}>  {/* Tambahkan navigasi ke Pemesanan Obat */}
          <img
            src="/daftarstok.png" // Replace with correct path to icons
            alt="Pemesanan Obat"
            className="menu-icon"
          />
          <p>Pemesanan Obat</p>
        </div>

        <div className="menu-item" onClick={goToStokKeluar}>
          <img
            src="/daftarstok.png" // Replace with correct path to icons
            alt="Stok Keluar Gudang"
            className="menu-icon"
          />
          <p>Stok Keluar Gudang</p>
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
}

export default IndexMenuKaryawan;
