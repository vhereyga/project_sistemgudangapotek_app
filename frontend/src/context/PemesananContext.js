import React, { createContext, useState, useContext } from 'react';

const PemesananContext = createContext();

export const usePemesanan = () => {
  return useContext(PemesananContext);
};

export const PemesananProvider = ({ children }) => {
  const [permintaanList, setPermintaanList] = useState([]);

  const tambahPemesanan = ({ id, tanggalInvoice, obatList }) => {
    setPermintaanList((prev) => [
      ...prev,
      {
        id,
        tanggalInvoice,
        obatList,
        status: '', // Status pemesanan
      },
    ]);
  };

  const hapusPemesanan = (id) => {
    setPermintaanList((prev) => prev.filter((pemesan) => pemesan.id !== id));
  };

  return (
    <PemesananContext.Provider value={{ permintaanList, tambahPemesanan, hapusPemesanan }}>
      {children}
    </PemesananContext.Provider>
  );
};
