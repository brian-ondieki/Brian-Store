import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="admin-main-content">
        <Outlet /> {/* This will render the nested route, e.g., ProductListPage */}
      </main>
    </div>
  );
};

export default AdminDashboardPage;