import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Untuk navigasi
import SidebarAdmin from "../components/SidebarAdmin"; // Sidebar Admin
import SidebarKaryawan from "../components/SidebarKaryawan"; 
import { usePemesanan } from '../context/PemesananContext'; // Import context

const PemesananObat = () => {
  const navigate = useNavigate();
  const { tambahPemesanan } = usePemesanan(); // Mendapatkan fungsi tambahPemesanan dari context
  const [search, setSearch] = useState('');
  const role = localStorage.getItem('role');
  const [obatList] = useState([
    { id: 1, nama: 'Paracetamol', jenis: 'Pill', harga: 5000 },
    { id: 2, nama: 'Amoxicillin', jenis: 'Sirup', harga: 15000 },
    { id: 3, nama: 'Vitamin C', jenis: 'Pill', harga: 3000 },
    { id: 4, nama: 'Cough Syrup', jenis: 'Sirup', harga: 20000 },
    { id: 5, nama: 'Fever Syrup', jenis: 'Sirup', harga: 60000 },
  ]);
  const [keranjang, setKeranjang] = useState([]);
  const [keranjangTampil, setKeranjangTampil] = useState(true);

  const tambahKeKeranjang = (obat) => {
    setKeranjang((prevKeranjang) => {
      const item = prevKeranjang.find((item) => item.id === obat.id);
      if (item) {
        return prevKeranjang.map((item) =>
          item.id === obat.id
            ? { ...item, jumlah: item.jumlah + 1 }
            : item
        );
      }
      return [...prevKeranjang, { ...obat, jumlah: 1 }];
    });
    setKeranjangTampil(true);
  };

  const kurangDariKeranjang = (id) => {
    setKeranjang((prevKeranjang) =>
      prevKeranjang
        .map((item) =>
          item.id === id ? { ...item, jumlah: item.jumlah - 1 } : item
        )
        .filter((item) => item.jumlah > 0)
    );
  };

  const filteredObat = obatList.filter((obat) =>
    obat.nama.toLowerCase().includes(search.toLowerCase())
  );

  const toggleKeranjang = () => {
    setKeranjangTampil((prev) => !prev);
  };

  const lanjutkanPembelian = () => {
    const invoiceId = `INV-${new Date().getTime()}`; // Membuat invoice ID unik berdasarkan waktu
    const tanggalInvoice = new Date().toLocaleDateString(); // Menyimpan tanggal pemesanan
  
    // Menambahkan pemesanan ke context
    tambahPemesanan({
      id: invoiceId,
      tanggalInvoice,
      obatList: keranjang,
    });
  
    console.log('Keranjang:', keranjang);
  
    // Mengosongkan keranjang setelah pemesanan
    setKeranjang([]); // Reset keranjang
  
    // Kembali ke halaman sebelumnya dengan replace, menghindari menambah riwayat
    navigate('/admin/pemesanan-obat');
  };

  return (
    <div className="flex h-screen">
       {role === 'admin'? <SidebarAdmin /> : <SidebarKaryawan />}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Pemesanan Obat</h1>
        <input
          type="text"
          className="p-2 border rounded w-full mb-4"
          placeholder="Cari obat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table className="table-auto w-full bg-white shadow rounded">
          <thead className="bg-gray-200 text-center">
            <tr>
              <th className="px-4 py-2">Nama Obat</th>
              <th className="px-4 py-2">Jenis Obat</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredObat.map((obat) => (
              <tr key={obat.id}>
                <td className="px-4 py-2">{obat.nama}</td>
                <td className="px-4 py-2">{obat.jenis}</td>
                <td className="px-4 py-2">Rp {obat.harga}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => tambahKeKeranjang(obat)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Tambah
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {keranjang.length > 0 && keranjangTampil && (
          <div
            className="fixed bottom-0 left-64 right-0 bg-white p-4 border-t shadow-lg"
            style={{
              zIndex: 10,
              maxHeight: '50vh', // Membatasi tinggi keranjang maksimal 50% dari tinggi layar
              overflowY: 'auto', // Menambahkan scroll jika konten lebih banyak
            }}
          >
            <button
              onClick={toggleKeranjang} // Fungsi untuk menutup keranjang
              className="absolute top-2 right-2 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="font-bold text-lg mb-2">Keranjang</h3>
            <table className="table-auto w-full text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Nama Obat</th>
                  <th className="px-4 py-2">Harga</th>
                  <th className="px-4 py-2">Jumlah</th>
                  <th className="px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {keranjang.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2">{item.nama}</td>
                    <td className="px-4 py-2">Rp {item.harga}</td>
                    <td className="px-4 py-2">{item.jumlah}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => tambahKeKeranjang(item)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        +
                      </button>
                      <button
                        onClick={() => kurangDariKeranjang(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <span className="font-bold">Total:</span>
              <span className="font-bold">
                Rp{' '}
                {keranjang.reduce(
                  (total, item) => total + item.harga * item.jumlah,
                  0
                )}
              </span>
            </div>
            <button
              onClick={lanjutkanPembelian}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded w-full hover:bg-green-700"
            >
              Lanjutkan Pembelian
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PemesananObat;
