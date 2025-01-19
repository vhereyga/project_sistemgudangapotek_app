import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import SidebarKaryawan from "../components/SidebarKaryawan";

const DaftarStokObat = () => {
  const [obatData, setObatData] = useState([]);
  const [newObat, setNewObat] = useState({ name: "", type: "sirup", stock: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJenis, setFilterJenis] = useState("Semua");
  const [isEditing, setIsEditing] = useState(false);
  const [currentObat, setCurrentObat] = useState(null);
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetch("http://localhost:3000/medicines")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data obat: ", data); // Tambahkan log untuk memeriksa data yang diterima
        setObatData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleTambahObat = () => {
    if (newObat.name && newObat.type && newObat.stock > 0) {
      fetch("http://localhost:3000/medicines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newObat),
      })
        .then((response) => response.json())
        .then((data) => setObatData([...obatData, data]))
        .catch((error) => console.error("Error adding medicine:", error));

      setNewObat({ name: "", type: "sirup", stock: 0 });
    } else {
      alert("Pastikan semua field terisi dengan benar!");
    }
  };

  const handleHapusObat = (id) => {
    fetch(`http://localhost:3000/medicines/${id}`, {
      method: "DELETE",
    })
      .then(() => setObatData(obatData.filter((obat) => obat.id !== id)))
      .catch((error) => console.error("Error deleting medicine:", error));
  };

  const handleEditObat = () => {
    if (currentObat.name && currentObat.type && currentObat.stock > 0) {
      fetch(`http://localhost:3000/medicines/${currentObat.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentObat),
      })
        .then(() => {
          setObatData(
            obatData.map((obat) => (obat.id === currentObat.id ? currentObat : obat))
          );
          setIsEditing(false);
          setCurrentObat(null);
        })
        .catch((error) => console.error("Error updating medicine:", error));
    } else {
      alert("Pastikan semua field terisi dengan benar!");
    }
  };

  const filteredData = obatData.filter((obat) => {
    const matchesSearch = obat.name && obat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterJenis === "Semua" || obat.type === filterJenis;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen">
      {role === 'admin' ? <SidebarAdmin /> : <SidebarKaryawan />}

      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Daftar Stok Obat</h1>

        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Tambah Obat</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              value={newObat.name}
              onChange={(e) => setNewObat({ ...newObat, name: e.target.value })}
              placeholder="Nama Obat"
              className="p-2 border rounded"
            />
            <select
              value={newObat.type}
              onChange={(e) => setNewObat({ ...newObat, type: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="sirup">Sirup</option>
              <option value="pill">Pill</option>
            </select>
            <input
              type="number"
              value={newObat.stock}
              onChange={(e) => setNewObat({ ...newObat, stock: Math.max(0, +e.target.value) })}
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
            <option value="sirup">Sirup</option>
            <option value="pill">Pill</option>
          </select>
        </div>

        <div className="bg-white rounded shadow">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">id</th>
                <th className="px-4 py-2">name</th>
                <th className="px-4 py-2">type</th>
                <th className="px-4 py-2">stock</th>
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
                    <td className="px-4 py-2">
                      <button
                        onClick={() => {
                          setCurrentObat(obat);
                          setIsEditing(true);
                        }}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleHapusObat(obat.id)}
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

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Obat</h2>
            <input
              type="text"
              value={currentObat.name}
              onChange={(e) =>
                setCurrentObat({ ...currentObat, name: e.target.value })
              }
              placeholder="Nama Obat"
              className="p-2 border rounded mb-2 w-full"
            />
            <select
              value={currentObat.type}
              onChange={(e) =>
                setCurrentObat({ ...currentObat, type: e.target.value })
              }
              className="p-2 border rounded mb-2 w-full"
            >
              <option value="sirup">Sirup</option>
              <option value="pill">Pill</option>
            </select>
            <input
              type="number"
              value={currentObat.stock}
              onChange={(e) =>
                setCurrentObat({ ...currentObat, stock: Math.max(0, +e.target.value) })
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
                onClick={handleEditObat}
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
