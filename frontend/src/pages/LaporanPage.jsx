import React, { useState } from 'react';
import { useLaporan } from '../context/LaporanContext';
import SidebarAdmin from '../components/SidebarAdmin';

const LaporanPage = () => {
  const { laporanList } = useLaporan();
  const [filterYear, setFilterYear] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLaporan, setSelectedLaporan] = useState(null);

  // Ekstraksi tahun unik dari laporanList
  const tahunOptions = [
    ...new Set(laporanList.map((laporan) => laporan.tanggalInvoice.split('-')[0])),
  ];

  const filteredLaporan = laporanList.filter((laporan) => {
    const laporanYear = laporan.tanggalInvoice.split('-')[0]; // Ambil tahun dari tanggal
    const matchesYear = filterYear === '' || laporanYear === filterYear;
    const matchesSearch =
      searchQuery === '' ||
      laporan.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSearch;
  });

  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Laporan</h1>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Invoice ID"
            className="border px-4 py-2 rounded w-1/2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="border px-4 py-2 rounded w-1/2"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="">Pilih Tahun</option>
            {tahunOptions.map((tahun) => (
              <option key={tahun} value={tahun}>
                {tahun}
              </option>
            ))}
          </select>
        </div>

        <table className="table-auto w-full bg-white shadow rounded">
          <thead className="bg-gray-200 text-center">
            <tr>
              <th className="px-4 py-2">Tanggal Invoice</th>
              <th className="px-4 py-2">Invoice ID</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredLaporan.map((laporan) => (
              <tr key={laporan.id}>
                <td className="px-4 py-2">{laporan.tanggalInvoice}</td>
                <td className="px-4 py-2">{laporan.id}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => setSelectedLaporan(laporan)}
                  >
                    Detail Laporan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedLaporan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4">Detail Laporan</h2>
              <p>
                <strong>Tanggal:</strong> {selectedLaporan.tanggalInvoice}
              </p>
              <p>
                <strong>Invoice ID:</strong> {selectedLaporan.id}
              </p>
              <h3 className="font-bold mt-4">Detail Obat:</h3>
              <ul className="list-disc pl-5">
                {selectedLaporan.obatList.map((obat, index) => (
                  <li key={index}>
                    {obat.nama} - {obat.jumlah} pcs (Rp {obat.harga}/item)
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-bold">
                Total Harga: Rp{' '}
                {selectedLaporan.obatList
                  .reduce((total, obat) => total + obat.harga * obat.jumlah, 0)
                  .toLocaleString()}
              </p>
              <button
                className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => setSelectedLaporan(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaporanPage;
