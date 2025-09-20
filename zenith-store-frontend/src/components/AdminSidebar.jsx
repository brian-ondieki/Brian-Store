import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">ZENITH ADMIN</div>
      <nav className="admin-nav">
        {/* We can add more links here later */}
        <NavLink to="/admin" end>Products</NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;