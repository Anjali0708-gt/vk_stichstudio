export default function OrdersTable({ orders, onStatusChange, compact = false }) {
  const statusClass = (status) => {
    const map = {
      'Completed': 'completed',
      'Pending': 'pending',
      'In Progress': 'in-progress',
      'Cancelled': 'cancelled',
    };
    return map[status] || '';
  };

  const statusOptions = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

  const formatPrice = (price) => {
    return '₹' + price.toLocaleString('en-IN');
  };

  return (
    <div className="dash-table-wrapper">
      <table className="dash-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Type</th>
            <th>Status</th>
            <th>Price</th>
            {!compact && <th>Date</th>}
            {!compact && <th>Due Date</th>}
            {onStatusChange && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={compact ? 5 : 8} style={{ textAlign: 'center', padding: '32px' }}>
                <div className="dash-empty-state">
                  <div className="empty-icon">📋</div>
                  <h3>No orders found</h3>
                  <p>Try adjusting your filters</p>
                </div>
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td style={{ fontWeight: 600, color: 'var(--dash-accent-light)', fontSize: '12px' }}>
                  {order.id}
                </td>
                <td>{order.customer}</td>
                <td>{order.type}</td>
                <td>
                  <span className={`dash-badge ${statusClass(order.status)}`}>
                    <span className="dash-badge-dot" />
                    {order.status}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>{formatPrice(order.price)}</td>
                {!compact && <td>{order.date}</td>}
                {!compact && <td>{order.dueDate}</td>}
                {onStatusChange && (
                  <td>
                    <select
                      className="dash-select"
                      value={order.status}
                      onChange={(e) => onStatusChange(order.id, e.target.value)}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}