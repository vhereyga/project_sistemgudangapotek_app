// src/context/AccountContext.js
import React, { createContext, useState, useContext } from "react";

// Membuat context
const AccountContext = createContext();

// Provider untuk akun
export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);

  const addAccount = (account) => {
    setAccounts([...accounts, { id: Date.now(), ...account }]);
  };

  const removeAccount = (id) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  const updateAccount = (updatedAccount) => {
    setAccounts(
      accounts.map((account) =>
        account.id === updatedAccount.id ? updatedAccount : account
      )
    );
  };

  return (
    <AccountContext.Provider value={{ accounts, addAccount, removeAccount, updateAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

// Hook untuk menggunakan context
export const useAccountContext = () => useContext(AccountContext);
