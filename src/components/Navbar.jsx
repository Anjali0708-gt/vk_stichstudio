import { NavLink, Link } from 'react-router-dom';
import './navbar.css';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaCalendarAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { cartCount } = useCart();
  const { currentUser, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="navbar-brand">
          <span className="brand-vk">VK</span>
          <span className="brand-text">STICH STUDIO</span>
        </Link>
      </div>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          About
        </NavLink>
        <NavLink to="/service" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Services
        </NavLink>
        <NavLink to="/gallery" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Gallery
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Contact
        </NavLink>
      </div>

      <div className="user-section">
        {/* Book Appointment CTA */}
        <Link to="/bookappointment" className="nav-book-btn">
          <FaCalendarAlt /> Book Fitting
        </Link>

        {/* Cart Link with Live Badge */}
        <Link to="/cart" className="cart-link" aria-label="Shopping Cart">
          <FaShoppingCart />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        {/* User Account / Session Controls */}
        {isAuthenticated ? (
          <div className="user-profile-menu">
            <Link to="/login" className="user-name-link" title="View Profile">
              <FaUser />
              <span className="user-display-name">{currentUser.name.split(' ')[0]}</span>
            </Link>
            <button onClick={logout} className="logout-btn" title="Log Out">
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-link" title="Login / Register">
            <FaUser />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;