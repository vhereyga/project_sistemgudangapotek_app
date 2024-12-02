import React, { createContext, useState, useContext } from "react";

const ObatContext = createContext();

export const useObatContext = () => useContext(ObatContext);

export const ObatProvider = ({ children }) => {
  const [obatData, setObatData] = useState([]);

  const tambahObat = (obat) => {
    setObatData([...obatData, { id: Date.now(), ...obat }]);
  };

  const hapusObat = (id) => {
    setObatData(obatData.filter((obat) => obat.id !== id));
  };

  return (
    <ObatContext.Provider value={{ obatData, setObatData, tambahObat, hapusObat }}>
      {children}
    </ObatContext.Provider>
  );
};
