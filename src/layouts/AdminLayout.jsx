import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FaBars, FaBell, FaSearch } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';
import '../styles/adminresponsive.css'

export default function AdminLayout({ children, title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu after choosing a page
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className={`admin-layout${sidebarOpen ? ' sidebar-open' : ''}`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Dark overlay behind the open menu on phones */}
      <div className="dash-backdrop" onClick={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="dash-main">
        {/* Top Bar */}
        <header className="dash-topbar">
          <div className="dash-topbar-left">
            {/* Mobile hamburger */}
            <button
              type="button"
              className="dash-sidebar-toggle"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars />
            </button>

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

        {/* Page Content: nested route pages render through Outlet */}
        <div className="dash-content">
          {children ?? <Outlet />}
        </div>
      </main>
    </div>
  );
}
