import React from 'react';
import { Link } from 'react-router-dom';

const SidebarKaryawan = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-center text-yellow-500 mb-6">Karyawan Dashboard</h2>
      <nav className="flex-1">
        <ul className="list-none p-0 mb-6 py-6">
          <li className="mb-4">
          <Link
              to="/admin/dashboard"
              className="block py-3 px-4 rounded-md text-white hover:bg-yellow-500 hover:text-gray-800"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/admin/stock"
              className="block py-3 px-4 rounded-md text-white hover:bg-yellow-500 hover:text-gray-800"
            >
              Daftar Stok Obat
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/admin/pemesanan-obat"
              className="block py-3 px-4 rounded-md text-white hover:bg-yellow-500 hover:text-gray-800"
            >
              Pemesanan Obat
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/admin/StokKeluarGudang"
              className="block py-3 px-4 rounded-md text-white hover:bg-yellow-500 hover:text-gray-800"
            >
              Stok Keluar Gudang
            </Link>
          </li>
        </ul>
      </nav>

      {/* Tombol Logout */}
      <div className="mt-auto mb-6">
        <Link
          to="/"
          className="block py-2 px-4 bg-red-600 text-center text-white rounded-md hover:bg-red-700"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default SidebarKaryawan;
