import { useState } from 'react';
import { FaBars, FaBell, FaSearch } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';

export default function AdminLayout({ children, title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* Mobile Hamburger */}
      <button
        className="dash-sidebar-toggle"
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="dash-main">
        {/* Top Bar */}
        <header className="dash-topbar">
          <div className="dash-topbar-left">
            <div>
              <div className="dash-topbar-title">{title || 'Dashboard'}</div>
              {subtitle && <div className="dash-topbar-subtitle">{subtitle}</div>}
            </div>
          </div>

          <div className="dash-topbar-right">
            <div className="dash-topbar-search">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>

            <button className="dash-topbar-btn" title="Notifications">
              <FaBell />
              <span className="notification-dot" />
            </button>

            <div className="dash-topbar-avatar" title="Admin">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="dash-content">
          {children}
        </div>
      </main>
    </div>
  );
}