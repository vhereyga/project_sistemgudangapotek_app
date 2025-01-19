import React, { createContext, useState, useContext } from 'react';

const LaporanContext = createContext();

export const useLaporan = () => {
    const context = useContext(LaporanContext);
    if (!context) {
      throw new Error('useLaporan must be used within a LaporanProvider');
    }
    return context;
  };

export const LaporanProvider = ({ children }) => {
  const [laporanList, setLaporanList] = useState([]);

  const tambahLaporan = (data) => {
    setLaporanList((prev) => [...prev, data]);
  };


  return (
    <LaporanContext.Provider value={{ laporanList, tambahLaporan }}>
      {children}
    </LaporanContext.Provider>
  );
};
