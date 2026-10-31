import "./RecentOrder.css";

function RecentOrder({ orders }) {
  return (
    <div className="recent-orders">
      <h2>Recent Orders</h2>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.length ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No recent orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrder;