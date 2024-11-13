import React from "react";
import { useNavigate } from "react-router-dom";
import "./IndexMenu.css";

function IndexMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleAccountManagement = () => {
    navigate("/account-management");
  };

  const goToDaftarStok = () => {
    navigate("/DaftarStok");
  };

  const goToPemesananObat = () => {
    navigate("/PemesananObat");
  };

  const goToStokKeluar = () => {
    navigate("/StokKeluar");
  };

  const HandleLaporan = () => {
    navigate("/Laporan");
  };

  const goToDetailPermintaan = () => {
    navigate("/DetailPermintaan");
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">MENU UTAMA ADMIN</h1>
      <div className="menu-grid">
        <div className="menu-item" onClick={goToDaftarStok}>
          <img
            src="/daftarstok.png"
            alt="Daftar Stok Obat"
            className="menu-icon"
          />
          <p>Daftar Stok Obat</p>
        </div>
        <div className="menu-item" onClick={goToPemesananObat}>
          <img
            src="/daftarstok.png"
            alt="Pemesanan Obat"
            className="menu-icon"
          />
          <p>Pemesanan Obat</p>
        </div>
        <div className="menu-item" onClick={goToStokKeluar}>
          <img
            src="/daftarstok.png"
            alt="Stok Keluar Gudang"
            className="menu-icon"
          />
          <p>Stok Keluar Gudang</p>
        </div>
        <div className="menu-item" onClick={handleAccountManagement}>
          <img
            src="/daftarstok.png"
            alt="Manajemen Akun"
            className="menu-icon"
          />
          <p>(admin) Manajemen Akun</p> 
        </div>
        <div className="menu-item" onClick={goToDetailPermintaan}>
          <img
            src="/daftarstok.png"
            alt="Detail Permintaan"
            className="menu-icon"
          />
          <p>(admin) Detail Permintaan</p>
        </div>
        <div className="menu-item" onClick={HandleLaporan}>
          <img
            src="/daftarstok.png"
            alt="Laporan"
            className="menu-icon"
          />
          <p>(admin) Laporan</p>
        </div>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
}

export default IndexMenu;
