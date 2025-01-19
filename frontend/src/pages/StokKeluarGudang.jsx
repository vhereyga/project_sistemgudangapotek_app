import React, { useState } from "react";
import { useObatContext } from "../context/ObatContext"; // Pastikan impor ini benar
import SidebarAdmin from "../components/SidebarAdmin"; // Sidebar Admin
import SidebarKaryawan from "../components/SidebarKaryawan"; 

const StokKeluarGudang = () => {
  const { obatData, setObatData } = useObatContext(); // Mengambil context yang benar
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJenis, setFilterJenis] = useState("Semua");
  const [keranjang, setKeranjang] = useState([]);
  const role = localStorage.getItem('role');  // Ambil role dari localStorage

  // Data yang difilter berdasarkan pencarian dan filter jenis
  const filteredData = obatData.filter((obat) => {
    const matchesSearch = obat.name && obat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterJenis === "Semua" || obat.type === filterJenis;
    return matchesSearch && matchesFilter;
  });

  // Fungsi untuk menambah obat ke keranjang
  const tambahKeKeranjang = (obat) => {
    const obatInCart = keranjang.find((item) => item.id === obat.id);
    if (obatInCart) {
      setKeranjang(
        keranjang.map((item) =>
          item.id === obat.id ? { ...item, stock: item.stock + 1 } : item
        )
      );
    } else {
      setKeranjang([...keranjang, { ...obat, stock: 1 }]);
    }
  };

  // Fungsi untuk mengurangi jumlah obat dalam keranjang
  const kurangiDariKeranjang = (id) => {
    setKeranjang(
      keranjang
        .map((item) =>
          item.id === id ? { ...item, stock: item.stock - 1 } : item
        )
        .filter((item) => item.stock > 0)
    );
  };

  // Fungsi untuk mengupdate jumlah obat dalam keranjang (dari input)
  const updateJumlahKeranjang = (id, stock) => {
    setKeranjang(
      keranjang.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, stock) } : item
      )
    );
  };

  const konfirmasiKeluarStok = () => {
    let updatedObatData = [...obatData];  // Copy data obat yang ada
  
    keranjang.forEach((obat) => {
      const obatIndex = updatedObatData.findIndex((item) => item.id === obat.id);

      if (obatIndex !== -1) {
        // Periksa apakah stok cukup
        if (updatedObatData[obatIndex].stock >= obat.stock) {
          // Kurangi stok yang ada
          updatedObatData[obatIndex].stock -= obat.stock;
        } else {
          alert(`Stok ${obat.name} tidak cukup!`);
        }
      }
    });

    // Update data obat di context setelah keluar stok
    setObatData(updatedObatData);

    // Reset keranjang setelah konfirmasi
    setKeranjang([]);
  };

  return (
    <div className="flex h-screen">
      {role === 'admin' ? <SidebarAdmin /> : <SidebarKaryawan />}

      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Stok Keluar Gudang</h1>

        {/* Pencarian dan Filter */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Cari nama obat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-1/2"
          />
          <select
            value={filterJenis}
            onChange={(e) => setFilterJenis(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="Semua">Semua</option>
            <option value="Sirup">Sirup</option>
            <option value="Pill">Pill</option>
          </select>
        </div>

        {/* Tabel Obat */}
        <div className="bg-white rounded shadow">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nama Obat</th>
                <th className="px-4 py-2">Jenis Obat</th>
                <th className="px-4 py-2">Jumlah Stok</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((obat) => (
                  <tr key={obat.id} className="text-center">
                    <td className="px-4 py-2">{obat.id}</td>
                    <td className="px-4 py-2">{obat.name}</td>
                    <td className="px-4 py-2">{obat.type}</td>
                    <td className="px-4 py-2">{obat.stock}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => tambahKeKeranjang(obat)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Keluarkan Stok
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    Tidak ada data obat.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Keranjang */}
        {keranjang.length > 0 && (
          <div className="mt-6 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Keranjang Stok Keluar</h2>
            <ul className="space-y-4">
              {keranjang.map((obat) => (
                <li key={obat.id} className="flex justify-between items-center">
                  <span>{obat.name} ({obat.jenis})</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => kurangiDariKeranjang(obat.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={obat.stock}
                      min="1"
                      max={obat.stock}
                      onChange={(e) =>
                        updateJumlahKeranjang(obat.id, parseInt(e.target.value) || 0)
                      }
                      className="w-12 text-center"
                    />
                    <button
                      onClick={() => tambahKeKeranjang(obat)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right">
              <button
                onClick={konfirmasiKeluarStok}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Konfirmasi Keluar Stok
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StokKeluarGudang;
