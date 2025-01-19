// src/App.jsimport React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ObatProvider } from "./context/ObatContext";
import { AccountProvider } from "./context/AccountContext"; // Tambahkan AccountProvider
import { PemesananProvider } from "./context/PemesananContext";
import { LaporanProvider } from "./context/LaporanContext";
import LoginPage from "./pages/LoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import DaftarStokObatPage from "./pages/DaftarStokObat";
import NotFoundPage from "./pages/NotFoundPage";
import PemesananObat from "./pages/PemesananObat";
import ManajemenAkun from "./pages/ManajemenAkun";
import DetailPemesanan from "./pages/DetailPemesanan";
import LaporanPage from "./pages/LaporanPage";
import StokKeluarGudang from "./pages/StokKeluarGudang";

const App = () => {
  return (
    <Router>
      <ObatProvider>
          <PemesananProvider>
            <LaporanProvider>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/stock" element={<DaftarStokObatPage />} />
                <Route path="/admin/pemesanan-obat" element={<PemesananObat />} />
                <Route path="/admin/ManajemenAkun" element={<ManajemenAkun />} /> {/* Perbaikan casing */}
                <Route path="/admin/LaporanPage" element={<LaporanPage />} />
                <Route path="/admin/StokKeluarGudang" element={<StokKeluarGudang />} />
                <Route path="/admin/DetailPemesanan" element={<DetailPemesanan />} /> {/* Perbaikan casing */}
                <Route path="/*" element={<NotFoundPage />} />
              </Routes>
            </LaporanProvider>
          </PemesananProvider>
      </ObatProvider>
    </Router>
  );
};


export default App;
