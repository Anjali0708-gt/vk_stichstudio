import { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { getCustomers } from '../Api/Authapi';
import { FaSearch } from 'react-icons/fa';

const AVATAR_COLORS = ['dash-avatar-purple', 'dash-avatar-green', 'dash-avatar-blue', 'dash-avatar-amber', 'dash-avatar-red'];

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadCustomers = async () => {
      setLoading(true);
      try {
        const data = await getCustomers(searchQuery);
        setCustomers(data);
      } catch (err) {
        console.error('Failed to load customers:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, [searchQuery]);

  const formatCurrency = (val) => '₹' + val.toLocaleString('en-IN');

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getAvatarColor = (index) => AVATAR_COLORS[index % AVATAR_COLORS.length];

  const statusClass = (status) => {
    const map = {
      'Active': 'active',
      'VIP': 'vip',
      'New': 'new',
      'Inactive': 'inactive',
    };
    return map[status] || '';
  };

  return (
    <AdminLayout title="Customers" subtitle="Customer directory">
      <div className="dash-page-header">
        <h1>Customers</h1>
        <p>View and manage your customer base</p>
      </div>

      {/* Search */}
      <div className="dash-filter-bar">
        <div className="dash-search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="dash-search-input"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--dash-text-muted)' }}>
          {customers.length} customer{customers.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Customers Table */}
      <div className="dash-card">
        {loading ? (
          <div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="dash-skeleton dash-skeleton-row" />
            ))}
          </div>
        ) : (
          <div className="dash-table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Last Order</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '32px' }}>
                      <div className="dash-empty-state">
                        <div className="empty-icon">👥</div>
                        <h3>No customers found</h3>
                        <p>Try adjusting your search</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  customers.map((customer, index) => (
                    <tr key={customer.id}>
                      <td>
                        <div className="dash-customer-cell">
                          <div className={`dash-avatar ${getAvatarColor(index)}`}>
                            {getInitials(customer.name)}
                          </div>
                          <div className="dash-customer-cell-info">
                            <div className="dash-customer-cell-name">{customer.name}</div>
                            <div className="dash-customer-cell-email">{customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{customer.phone}</td>
                      <td>
                        <span style={{ fontWeight: 600, color: 'var(--dash-text-bright)' }}>
                          {customer.totalOrders}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600, color: 'var(--dash-accent-light)' }}>
                        {formatCurrency(customer.totalSpent)}
                      </td>
                      <td>{customer.lastOrder}</td>
                      <td>
                        <span className={`dash-badge ${statusClass(customer.status)}`}>
                          <span className="dash-badge-dot" />
                          {customer.status}
                        </span>
                      </td>
                      <td style={{ color: 'var(--dash-text-muted)', fontSize: 12 }}>
                        {customer.joinedDate}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
