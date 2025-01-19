import React from 'react';
import { usePemesanan } from '../context/PemesananContext'; // Import context
import { useLaporan } from '../context/LaporanContext';
import SidebarAdmin from '../components/SidebarAdmin'; // Import SidebarAdmin

const DetailPemesanan = () => {
  const { permintaanList, hapusPemesanan } = usePemesanan(); // Mengambil daftar pemesanan dan fungsi hapus dari context
  const { tambahLaporan } = useLaporan();

  const handleSetuju = (pemesan) => {
    tambahLaporan(pemesan); // Menambahkan data ke laporan
    hapusPemesanan(pemesan.id); // Menghapus dari daftar permintaan
  };

  const handleBatal = (id) => {
    // Logic tambahan bisa ditambahkan untuk menangani pemesanan batal jika diperlukan
    hapusPemesanan(id); // Hapus pemesanan berdasarkan ID
  };

  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Detail Pemesanan</h1>

        <table className="table-auto w-full bg-white shadow rounded">
          <thead className="bg-gray-200 text-center">
            <tr>
              <th className="px-4 py-2">Tanggal Invoice</th>
              <th className="px-4 py-2">Invoice ID</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {permintaanList.map((pemesan) => (
              <tr key={pemesan.id}>
                <td className="px-4 py-2">{pemesan.tanggalInvoice}</td>
                <td className="px-4 py-2">{pemesan.id}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                    onClick={() => handleSetuju(pemesan)} // Menambahkan fungsi untuk setuju
                  >
                    Setuju
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => handleBatal(pemesan.id)} // Menambahkan fungsi untuk batal
                  >
                    Batal
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tampilkan detail pemesanan jika ada */}
        {permintaanList.length > 0 && (
          <div className="mt-6 max-h-[400px] overflow-y-auto"> {/* Membatasi tinggi dan menambahkan scroll */}
            {permintaanList.map((pemesan) => (
              <div key={pemesan.id} className="bg-white shadow rounded p-4 mb-6">
                <h3 className="text-xl font-semibold mb-4">Detail Pemesanan {pemesan.id}</h3>
                <p className="mb-4">Tanggal Pemesanan: {pemesan.tanggalInvoice}</p>

                <h4 className="font-bold mb-2">Obat yang Dipesan:</h4>
                <table className="table-auto w-full bg-gray-50 border">
                  <thead>
                    <tr className="text-center">
                      <th className="px-4 py-2 border">Nama Obat</th>
                      <th className="px-4 py-2 border">Jumlah</th>
                      <th className="px-4 py-2 border">Harga per Item</th>
                      <th className="px-4 py-2 border">Total Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pemesan.obatList.map((obat) => (
                      <tr key={obat.id}>
                        <td className="px-4 py-2 border">{obat.nama}</td>
                        <td className="px-4 py-2 border text-center">{obat.jumlah}</td>
                        <td className="px-4 py-2 border text-center">Rp {obat.harga}</td>
                        <td className="px-4 py-2 border text-center">
                          Rp {obat.harga * obat.jumlah}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-right font-semibold">
                  <p>Total Pembayaran: Rp {pemesan.obatList.reduce((total, obat) => total + obat.harga * obat.jumlah, 0)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPemesanan;
