import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';
import { FaUser, FaLock, FaEnvelope, FaSignInAlt, FaUserPlus, FaCalendarAlt, FaHistory, FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const { currentUser, login, signup, logout, forgotPassword, isAuthenticated } = useAuth();
  
  // 'login' | 'register' | 'forgot'
  const [activeTab, setActiveTab] = useState('login'); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await login(email, password);
      } else if (activeTab === 'register') {
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }
        await signup({ name, email, password });
      } else if (activeTab === 'forgot') {
        const response = await forgotPassword(email);
        setSuccess(response.message);
        setEmail('');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    setSuccess('');
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  // ----------------------------------------------------
  // LOGGED IN DASHBOARD VIEW
  // ----------------------------------------------------
  if (isAuthenticated && currentUser) {
    return (
      <div className="profile-dashboard-page">
        <div className="dashboard-container">
          
          {/* Header Profile Info */}
          <div className="profile-summary-card">
            <div className="profile-avatar">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="profile-meta">
              <h1>Welcome back, {currentUser.name}!</h1>
              <p className="profile-email"><FaEnvelope /> {currentUser.email}</p>
              <span className="profile-role-badge">Premium Client</span>
            </div>
            <button onClick={logout} className="dashboard-logout-btn">
              Sign Out Account
            </button>
          </div>

          {/* Bookings & History Grid */}
          <div className="dashboard-grid-sections">
            {/* Booked Fittings List */}
            <div className="dashboard-card-section bookings-card-list">
              <h2>
                <FaCalendarAlt /> Fitting Appointments
              </h2>
              <div className="divider-dash"></div>
              
              {(!currentUser.bookings || currentUser.bookings.length === 0) ? (
                <div className="empty-bookings-dashboard">
                  <p>You have no scheduled appointments currently.</p>
                  <a href="/bookappointment" className="book-dash-btn">Book Custom Fitting Session</a>
                </div>
              ) : (
                <div className="bookings-dashboard-table-wrapper">
                  <table className="bookings-dashboard-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Service</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUser.bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td><span className="b-id">{booking.id}</span></td>
                          <td><strong>{booking.service}</strong></td>
                          <td>{booking.date} at {booking.time}</td>
                          <td><span className={`status-tag ${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Design Preferences / Tips */}
            <div className="dashboard-card-section tips-card-section">
              <h2>
                <FaHistory /> Fit & Fabrics Note
              </h2>
              <div className="divider-dash"></div>
              <p className="tips-intro">Our designers use these guidelines for fitting appointments:</p>
              <ul className="fit-tips-list">
                <li>📏 <strong>Measurements:</strong> Updated automatically after a physical fitting session at the studio.</li>
                <li>🧵 <strong>Fabric Preference:</strong> Consult with Master Vikram during appointments to browse our imported swatches.</li>
                <li>✨ <strong>Sartorial Profile:</strong> Standard cutting patterns are stored for 24 months to support fast repeat tailoring orders.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ANONYMOUS FORM CARD VIEW (LOGIN / REGISTER / FORGOT)
  // ----------------------------------------------------
  return (
    <div className="login-page">
      <div className="auth-card-container">
        
        {/* Tab Headers */}
        {activeTab !== 'forgot' && (
          <div className="auth-tabs-header">
            <button
              className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => handleTabChange('login')}
            >
              <FaSignInAlt /> Login
            </button>
            <button
              className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => handleTabChange('register')}
            >
              <FaUserPlus /> Register
            </button>
          </div>
        )}

        <div className="auth-card-body">
          {activeTab === 'forgot' ? (
            <div className="forgot-header-text">
              <h2>Recover Password</h2>
              <p>Enter your email and we'll send you instructions to reset your password.</p>
            </div>
          ) : (
            <div className="forgot-header-text">
              <h2>VK Stich Studio</h2>
              <p>Access your designer portfolio, fit profile, and appointment booking histories.</p>
            </div>
          )}

          {error && <div className="auth-alert error">{error}</div>}
          {success && <div className="auth-alert success">{success}</div>}

          <form onSubmit={handleAuthSubmit} className="auth-form">
            
            {/* REGISTER NAME FIELD */}
            {activeTab === 'register' && (
              <div className="auth-input-group">
                <label htmlFor="auth-name">Full Name</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="auth-name"
                    placeholder="Anjali Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* EMAIL FIELD */}
            <div className="auth-input-group">
              <label htmlFor="auth-email">Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="auth-email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* PASSWORDS (FOR LOGIN / REGISTER) */}
            {activeTab !== 'forgot' && (
              <div className="auth-input-group">
                <div className="label-row-forgot">
                  <label htmlFor="auth-password">Password</label>
                  {activeTab === 'login' && (
                    <button
                      type="button"
                      className="forgot-toggle-btn"
                      onClick={() => handleTabChange('forgot')}
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="auth-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-icon-btn"
                    onClick={togglePasswordVisibility}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            )}

            {/* REGISTER CONFIRM PASSWORD */}
            {activeTab === 'register' && (
              <div className="auth-input-group">
                <label htmlFor="auth-confirm">Confirm Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="auth-confirm"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Processing request...' : (
                activeTab === 'login' ? 'Login to Portfolio' :
                activeTab === 'register' ? 'Register Account' :
                'Send Recovery Link'
              )}
            </button>
            
            {/* BACK TO LOGIN FOR FORGOT STATE */}
            {activeTab === 'forgot' && (
              <button
                type="button"
                className="forgot-back-btn"
                onClick={() => handleTabChange('login')}
              >
                Back to Login
              </button>
            )}
          </form>
          
          {activeTab === 'login' && (
            <div className="auth-card-hint">
              <p>Demo user: <strong>user@example.com</strong> / <strong>password123</strong></p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Login;