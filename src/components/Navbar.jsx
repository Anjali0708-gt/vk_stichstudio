import { NavLink, Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaCalendarAlt, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function Navbar() {
  const { cartCount } = useCart();
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    closeMenu();
  };

  const linkClass = ({ isActive }) => (isActive ? 'nav-item active' : 'nav-item');

  // One search form, shown in two places:
  // - under the logo row on tablets and phones (always visible)
  // - inside the menu on desktop
  const searchForm = (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search suits, shirts, sherwanis..."
        aria-label="Search products"
      />
      <button type="submit" aria-label="Search"><FaSearch /></button>
    </form>
  );

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-vk">VK</span>
          <span className="brand-text">STICH STUDIO</span>
        </Link>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Tablets and phones: always visible, outside the hamburger menu */}
      <div className="search-mobile">{searchForm}</div>

      <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <div className="nav-links">
          <NavLink to="/" className={linkClass} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" className={linkClass} onClick={closeMenu}>About</NavLink>
          <NavLink to="/service" className={linkClass} onClick={closeMenu}>Services</NavLink>
          <NavLink to="/gallery" className={linkClass} onClick={closeMenu}>Gallery</NavLink>
          <NavLink to="/contact" className={linkClass} onClick={closeMenu}>Contact</NavLink>
        </div>

        {/* Desktop only */}
        <div className="search-desktop">{searchForm}</div>

        <div className="user-section">
          <Link to="/bookappointment" className="nav-book-btn" onClick={closeMenu}>
            <FaCalendarAlt /> Book Fitting
          </Link>

          <Link to="/cart" className="cart-link" aria-label="Shopping Cart" onClick={closeMenu}>
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {isAuthenticated ? (
            <div className="user-profile-menu">
              <Link to="/login" className="user-name-link" title="View Profile" onClick={closeMenu}>
                <FaUser />
                <span className="user-display-name">
                  {currentUser?.name ? currentUser.name.split(' ')[0] : 'Account'}
                </span>
              </Link>
              <button
                onClick={() => { logout(); closeMenu(); }}
                className="logout-btn"
                title="Log Out"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-link" title="Login / Register" onClick={closeMenu}>
              <FaUser />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
