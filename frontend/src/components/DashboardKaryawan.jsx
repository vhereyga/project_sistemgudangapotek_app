import React from 'react';

const DashboardKaryawan = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-500 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-xl font-bold">Jumlah Stok Obat</h3>
          <p className="text-3xl">150</p>
        </div>
        <div className="bg-green-500 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-xl font-bold">Jumlah Nama Obat</h3>
          <p className="text-3xl">80</p>
        </div>
        <div className="bg-yellow-500 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-xl font-bold">Stok Keluar Gudang</h3>
          <p className="text-3xl">30</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Statistik Pemesanan</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Anda bisa menambahkan grafik atau data statistik lainnya di sini */}
          <p>Grafik Pemesanan akan ditampilkan di sini.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardKaryawan;
