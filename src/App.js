import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './login/AuthForm.js';
import IndexMenu from './menu/IndexMenu.js';
import AccountManagement from './manajemen-akun/AccountManagement.js'; // Make sure this path is correct
import DaftarStok from './pages/DaftarStok.js';
import TambahStok from './pages/TambahStok.js';
import EditObat from './pages/EditObat.js';
import TambahObat from './pages/TambahObat.js';
import PemesananObat from './pages/PemesananObat.js'; // Import halaman Pemesanan Obat
import StokKeluar from './pages/StokKeluar.js';
import IndexMenuKaryawan from './Karyawan/IndexMenuKaryawan.js';
import DaftarStokKaryawan from './pages-karyawan/DaftarStokKaryawan.js';
import TambahStokKaryawan from './pages-karyawan/TambahStokKaryawan.js';
import EditObatKaryawan from './pages-karyawan/EditObatKaryawan.js';
import TambahObatKaryawan from './pages-karyawan/TambahObatKaryawan.js';
import PemesananObatKaryawan from './pages-karyawan/PemesananObatKaryawan.js'; // Import halaman Pemesanan Obat
import StokKeluarKaryawan from './pages-karyawan/StokKeluarKaryawan.js';
import Laporan from './pages/Laporan.js';
import DetailLaporan from './pages/DetailLaporan.js';
import DetailPermintaan from './pages/DetailPermintaan.js'
import DetailPemesanan from './pages/DetailPemesanan.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/index" element={<IndexMenu />} />
        <Route path="/account-management" element={<AccountManagement />} /> {/* Route for Account Management */}
        <Route path="/DaftarStok" element={<DaftarStok />} />
        <Route path="/Laporan" element={<Laporan />} />
        <Route path="/TambahStok" element={<TambahStok />} />
        <Route path="/EditObat" element={<EditObat />} />
        <Route path="/TambahObat" element={<TambahObat />} />
        <Route path="/PemesananObat" element={<PemesananObat />} />
        <Route path="/StokKeluar" element={<StokKeluar />} />{/* Tambah route untuk halaman Pemesanan Obat */}
        <Route path="/karyawan" element={<IndexMenuKaryawan />} /> {/* Rute untuk IndexMenuKaryawan */}
        <Route path="/DaftarStokKaryawan" element={<DaftarStokKaryawan />} />
        <Route path="/TambahStokKaryawan" element={<TambahStokKaryawan />} />
        <Route path="/EditObatKaryawan" element={<EditObatKaryawan />} />
        <Route path="/TambahObatKaryawan" element={<TambahObatKaryawan />} />
        <Route path="/PemesananObatKaryawan" element={<PemesananObatKaryawan />} />
        <Route path="/StokKeluarKaryawan" element={<StokKeluarKaryawan />} />{/* Tambah route untuk halaman Pemesanan Obat */}
        <Route path="/DetailLaporan" element={<DetailLaporan />} />
        <Route path="/DetailPermintaan" element={<DetailPermintaan />} />
        <Route path="/DetailPemesanan" element={<DetailPemesanan />} />
      </Routes>
    </Router>
  );
}

export default App;
 