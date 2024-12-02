// src/pages/ManajemenAkun.jsx
import React, { useState } from "react";
import { useAccountContext } from "../context/AccountContext";
import Sidebar from "../components/SidebarAdmin";

const ManajemenAkun = () => {
  const { accounts, addAccount, removeAccount, updateAccount } = useAccountContext();
  const [newAccount, setNewAccount] = useState({ name: "", role: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editAccount, setEditAccount] = useState(null);

  const handleAddAccount = () => {
    if (newAccount.name && newAccount.role && newAccount.email) {
      addAccount(newAccount); // Tambahkan ke context
      setNewAccount({ name: "", role: "", email: "" });
    }
  };

  const handleEditAccount = () => {
    updateAccount(editAccount); // Perbarui di context
    setIsEditing(false);
    setEditAccount(null);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Manajemen Akun</h1>

        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Tambah Akun</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Nama"
              className="p-2 border rounded"
              value={newAccount.name}
              onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
            />
            <select
              className="p-2 border rounded"
              value={newAccount.role}
              onChange={(e) => setNewAccount({ ...newAccount, role: e.target.value })}
            >
              <option value="">Pilih Role</option>
              <option value="Admin">Admin</option>
              <option value="Karyawan">Karyawan</option>
            </select>
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded"
              value={newAccount.email}
              onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
            />
          </div>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleAddAccount}
          >
            Tambah Akun
          </button>
        </div>

        <div className="bg-white rounded shadow">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} className="text-center">
                  <td className="px-4 py-2">{account.name}</td>
                  <td className="px-4 py-2">{account.role}</td>
                  <td className="px-4 py-2">{account.email}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      onClick={() => {
                        setIsEditing(true);
                        setEditAccount(account);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => removeAccount(account.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Edit Akun</h2>
              <input
                type="text"
                placeholder="Nama"
                className="w-full p-2 border rounded mb-4"
                value={editAccount.name}
                onChange={(e) => setEditAccount({ ...editAccount, name: e.target.value })}
              />
              <select
                className="w-full p-2 border rounded mb-4"
                value={editAccount.role}
                onChange={(e) => setEditAccount({ ...editAccount, role: e.target.value })}
              >
                <option value="Admin">Admin</option>
                <option value="Karyawan">Karyawan</option>
              </select>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded mb-4"
                value={editAccount.email}
                onChange={(e) => setEditAccount({ ...editAccount, email: e.target.value })}
              />
              <div className="flex space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleEditAccount}
                >
                  Simpan
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => {
                    setIsEditing(false);
                    setEditAccount(null);
                  }}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManajemenAkun;
