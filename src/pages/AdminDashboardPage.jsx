import React from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import SidebarKaryawan from '../components/SidebarKaryawan';
import DashboardAdmin from '../components/DashboardAdmin';

const AdminDashboardPage = () => {
  const role = localStorage.getItem('role');  // Ambil role dari localStorage

  return (
    <div className="flex">
      {role === 'admin' ? <SidebarAdmin /> : <SidebarKaryawan />}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <DashboardAdmin />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
