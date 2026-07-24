import { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import OrdersTable from '../components/OrdersTable';
import { dashboardService } from '../services/dashboardService';
import { FaSearch } from 'react-icons/fa';

const STATUS_FILTERS = ['All', 'Pending', 'In Progress', 'Completed', 'Cancelled'];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async (status, search) => {
    setLoading(true);
    try {
      const data = await dashboardService.getAllOrders({
        status: status === 'All' ? null : status,
        search,
      });
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(activeFilter, searchQuery);
  }, [activeFilter, searchQuery]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await dashboardService.updateOrderStatus(orderId, newStatus);
      // Refresh orders after status change
      fetchOrders(activeFilter, searchQuery);
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  const getStatusCount = (status) => {
    // This is a simplification — in production you'd get this from the backend
    return orders.filter((o) => status === 'All' ? true : o.status === status).length;
  };

  return (
    <AdminLayout title="Orders" subtitle="Manage all orders">
      <div className="dash-page-header">
        <h1>Orders Management</h1>
        <p>Track, filter, and update order statuses</p>
      </div>

      {/* Filter Bar */}
      <div className="dash-filter-bar">
        <div className="dash-filter-tabs">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              className={`dash-filter-tab ${activeFilter === status ? 'active' : ''}`}
              onClick={() => setActiveFilter(status)}
            >
              {status}
              {activeFilter === 'All' && status !== 'All' ? '' : ''}
            </button>
          ))}
        </div>

        <div className="dash-search-wrapper" style={{ marginLeft: 'auto' }}>
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="dash-search-input"
            placeholder="Search by customer, order ID, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="dash-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        {STATUS_FILTERS.slice(1).map((status) => {
          const colorMap = {
            'Pending': 'amber',
            'In Progress': 'blue',
            'Completed': 'green',
            'Cancelled': 'red',
          };
          return (
            <div
              key={status}
              className="dash-stat-card"
              style={{ padding: 16, cursor: 'pointer' }}
              onClick={() => setActiveFilter(status)}
            >
              <div className="dash-stat-card-value" style={{ fontSize: 22 }}>
                {getStatusCount(status)}
              </div>
              <div className="dash-stat-card-label">
                <span className={`dash-badge ${colorMap[status] === 'amber' ? 'pending' : colorMap[status] === 'blue' ? 'in-progress' : colorMap[status] === 'green' ? 'completed' : 'cancelled'}`} style={{ fontSize: 11 }}>
                  <span className="dash-badge-dot" />
                  {status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="dash-card">
        {loading ? (
          <div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="dash-skeleton dash-skeleton-row" />
            ))}
          </div>
        ) : (
          <OrdersTable
            orders={orders}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </AdminLayout>
  );
}
