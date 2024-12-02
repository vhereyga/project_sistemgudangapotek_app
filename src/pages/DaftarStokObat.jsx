import React, { useState } from "react";
import { useObatContext } from "../context/ObatContext"; // Ambil Context
import SidebarAdmin from "../components/SidebarAdmin"; // Sidebar Admin
import SidebarKaryawan from "../components/SidebarKaryawan"; 

const DaftarStokObat = () => {
  const { obatData, tambahObat, hapusObat, updateObat } = useObatContext(); // Ambil data dan fungsi dari Context
  const [newObat, setNewObat] = useState({ nama: "", jenis: "Sirup", jumlah: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJenis, setFilterJenis] = useState("Semua");
  const [isEditing, setIsEditing] = useState(false);
  const [currentObat, setCurrentObat] = useState(null);
  const role = localStorage.getItem('role');  // Ambil role dari localStorage

  // Data yang difilter berdasarkan pencarian dan filter jenis
  const filteredData = obatData.filter((obat) => {
    const matchesSearch = obat.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterJenis === "Semua" || obat.jenis === filterJenis;
    return matchesSearch && matchesFilter;
  });

  const handleTambahObat = () => {
    if (newObat.nama && newObat.jenis && newObat.jumlah > 0) {
      tambahObat(newObat); // Tambah ke Context
      setNewObat({ nama: "", jenis: "Sirup", jumlah: 0 }); // Reset form
    } else {
      alert("Pastikan semua field terisi dengan benar!");
    }
  };

  // Fungsi untuk memulai edit
  const mulaiEditObat = (obat) => {
    setCurrentObat(obat);
    setIsEditing(true);
  };

  // Fungsi untuk menyimpan hasil edit
  const simpanEditObat = () => {
    if (currentObat.nama && currentObat.jenis && currentObat.jumlah > 0) {
      updateObat(currentObat); // Update obat di Context
      setIsEditing(false);
      setCurrentObat(null);
    } else {
      alert("Pastikan semua field terisi dengan benar!");
    }
  };

    

  return (
    <div className="flex h-screen">
     {role === 'admin'? <SidebarAdmin /> : <SidebarKaryawan />}

      {/* Konten */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Daftar Stok Obat</h1>

        {/* Form Tambah Obat */}
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Tambah Obat</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              value={newObat.nama}
              onChange={(e) => setNewObat({ ...newObat, nama: e.target.value })}
              placeholder="Nama Obat"
              className="p-2 border rounded"
            />
            <select
              value={newObat.jenis}
              onChange={(e) => setNewObat({ ...newObat, jenis: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="Sirup">Sirup</option>
              <option value="Pill">Pill</option>
            </select>
            <input
              type="number"
              value={newObat.jumlah}
              onChange={(e) =>
                setNewObat({ ...newObat, jumlah: Math.max(0, +e.target.value) })
              }
              placeholder="Jumlah Stok"
              className="p-2 border rounded"
            />
          </div>
          <button
            onClick={handleTambahObat}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Tambah Obat
          </button>
        </div>

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
                    <td className="px-4 py-2">{obat.nama}</td>
                    <td className="px-4 py-2">{obat.jenis}</td>
                    <td className="px-4 py-2">{obat.jumlah}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => mulaiEditObat(obat)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => hapusObat(obat.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Hapus
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
      </div>

      {/* Modal Edit Obat */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Obat</h2>
            <input
              type="text"
              value={currentObat.nama}
              onChange={(e) =>
                setCurrentObat({ ...currentObat, nama: e.target.value })
              }
              placeholder="Nama Obat"
              className="p-2 border rounded mb-2 w-full"
            />
            <select
              value={currentObat.jenis}
              onChange={(e) =>
                setCurrentObat({ ...currentObat, jenis: e.target.value })
              }
              className="p-2 border rounded mb-2 w-full"
            >
              <option value="Sirup">Sirup</option>
              <option value="Pill">Pill</option>
            </select>
            <input
              type="number"
              value={currentObat.jumlah}
              onChange={(e) =>
                setCurrentObat({ ...currentObat, jumlah: Math.max(0, +e.target.value) })
              }
              placeholder="Jumlah Stok"
              className="p-2 border rounded mb-4 w-full"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                onClick={simpanEditObat}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaftarStokObat;
