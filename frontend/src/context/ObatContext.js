// context/ObatContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const ObatContext = createContext();

export const useObatContext = () => useContext(ObatContext);

export const ObatProvider = ({ children }) => {
  const [obatData, setObatData] = useState([]);

  useEffect(() => {
    fetchObatData();
  }, []);

  const fetchObatData = async () => {
    try {
      const response = await fetch("http://localhost:3000/medicines");
      const data = await response.json();
      setObatData(data);
    } catch (error) {
      console.error("Gagal mengambil data obat:", error);
    }
  };

  const tambahObat = async (obat) => {
    try {
      const response = await fetch("http://localhost:3000/medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obat),
      });
      const newObat = await response.json();
      setObatData([...obatData, newObat]);
    } catch (error) {
      console.error("Gagal menambahkan obat:", error);
    }
  };

  const hapusObat = async (id) => {
    try {
      await fetch(`http://localhost:3000/medicines/${id}`, {
        method: "DELETE",
      });
      setObatData(obatData.filter((obat) => obat.id !== id));
    } catch (error) {
      console.error("Gagal menghapus obat:", error);
    }
  };

  const updateObat = async (updatedObat) => {
    try {
      const response = await fetch(`http://localhost:3000/medicines/${updatedObat.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedObat),
      });
      const updatedData = await response.json();
      setObatData(
        obatData.map((obat) => (obat.id === updatedData.id ? updatedData : obat))
      );
    } catch (error) {
      console.error("Gagal memperbarui obat:", error);
    }
  };

  return (
    <ObatContext.Provider
      value={{ obatData, setObatData, tambahObat, hapusObat, updateObat }}
    >
      {children}
    </ObatContext.Provider>
  );
};