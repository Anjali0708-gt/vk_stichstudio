
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import RecentOrder from "../../components/RecentOrder";
import OrdersTable from "../../components/OrdersTable";

import { getOrders, updateOrder } from "../../Api/OrderApi";
import { getCustomers } from "../../Api/UserApi";
import { getAvailableSlots } from "../../Api/AppointmentApi";

import "./AdminDashboard.css";

const getArray = (response, key) => {
  const data = response?.data;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];
  if (Array.isArray(data?.data?.[key])) return data.data[key];
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.result)) return data.result;
  if (Array.isArray(data?.users) && key === "customers") return data.users;

  return null;
};

const formatCurrency = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

const getOrderId = (order) => order._id || order.id || order.orderId || "";

const getCustomerName = (order) => {
  const customer =
    order.customer || order.customerId || order.customerName || order.name;
  if (customer && typeof customer === "object") {
    return customer.name || customer.fullName || customer.email || "Customer";
  }
  return customer || "Customer";
};

const getOrderPrice = (order) => {
  const price = Number(
    order.totalAmount ??
      order.totalPrice ??
      order.amount ??
      order.total ??
      order.price ??
      0
  );
  return Number.isFinite(price) ? price : 0;
};

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Request failed.";

function AdminDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loaded, setLoaded] = useState({
    orders: false,
    customers: false,
    slots: false,
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [updatingOrderId, setUpdatingOrderId] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchDashboardData() {
      setLoading(true);
      setErrors([]);
      setLoaded({ orders: false, customers: false, slots: false });

      const results = await Promise.allSettled([
        getOrders(),
        getCustomers(),
        getAvailableSlots(getToday()),
      ]);

      if (!isMounted) return;

      const requestErrors = [];

      if (results[0].status === "fulfilled") {
        const orderList = getArray(results[0].value, "orders");
        if (orderList) {
          setOrders(
            orderList.map((order, index) => {
              const record = order || {};
              return {
                ...record,
                apiId: getOrderId(record),
                id: String(
                  record.orderNumber ||
                    record.orderId ||
                    getOrderId(record) ||
                    `Order ${index + 1}`
                ),
                customer: getCustomerName(record),
                type:
                  record.type ||
                  record.orderType ||
                  record.service ||
                  "Tailoring",
                status: record.status || "Pending",
                price: getOrderPrice(record),
                date: (record.createdAt || record.date)
                  ? new Date(record.createdAt || record.date).toLocaleDateString(
                      "en-IN"
                    )
                  : "—",
                dueDate: record.dueDate
                  ? new Date(record.dueDate).toLocaleDateString("en-IN")
                  : "—",
              };
            })
          );
          setLoaded((current) => ({ ...current, orders: true }));
        } else {
          requestErrors.push("Orders: The API returned an unexpected response.");
        }
      } else {
        requestErrors.push(`Orders: ${getErrorMessage(results[0].reason)}`);
      }

      if (results[1].status === "fulfilled") {
        const customerList = getArray(results[1].value, "customers");
        if (customerList) {
          setCustomers(customerList);
          setLoaded((current) => ({ ...current, customers: true }));
        } else {
          requestErrors.push(
            "Customers: The API returned an unexpected response."
          );
        }
      } else {
        requestErrors.push(`Customers: ${getErrorMessage(results[1].reason)}`);
      }

      if (results[2].status === "fulfilled") {
        const slotList = getArray(results[2].value, "slots");
        if (slotList) {
          setAvailableSlots(slotList);
          setLoaded((current) => ({ ...current, slots: true }));
        } else {
          requestErrors.push(
            "Today's availability: The API returned an unexpected response."
          );
        }
      } else {
        requestErrors.push(
          `Today's availability: ${getErrorMessage(results[2].reason)}`
        );
      }

      setErrors(requestErrors);
      setLoading(false);
    }

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(String(orderId));
    setErrors([]);
    try {
      await updateOrder(orderId, { status: newStatus });
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          String(order.apiId || order.id) === String(orderId)
            ? { ...order, status: newStatus }
            : order
        )
      );
    } catch (err) {
      setErrors([
        `Order status: ${getErrorMessage(err)}`,
      ]);
    } finally {
      setUpdatingOrderId("");
    }
  };

  const pendingOrders = orders.filter((order) =>
    ["Pending", "In Progress", "Stitching", "Cutting", "Ready for trial"].includes(
      order.status
    )
  ).length;

  const totalOrderValue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + order.price, 0);

  const orderStatusSummary = [
    {
      label: "Pending",
      className: "pending",
      count: orders.filter((order) => order.status === "Pending").length,
    },
    {
      label: "In progress",
      className: "in-progress",
      count: orders.filter((order) =>
        ["In Progress", "Stitching", "Cutting", "Ready for trial"].includes(
          order.status
        )
      ).length,
    },
    {
      label: "Completed",
      className: "completed",
      count: orders.filter((order) =>
        ["Completed", "Complete", "Delivered"].includes(order.status)
      ).length,
    },
    {
      label: "Cancelled",
      className: "cancelled",
      count: orders.filter((order) => order.status === "Cancelled").length,
    },
  ];
  const largestStatusCount = Math.max(
    1,
    ...orderStatusSummary.map((status) => status.count)
  );

  const stats = [
    {
      id: "orders",
      title: "Total Orders",
      value: loaded.orders ? orders.length : "—",
    },
    {
      id: "pending",
      title: "Open Orders",
      value: loaded.orders ? pendingOrders : "—",
    },
    {
      id: "customers",
      title: "Total Customers",
      value: loaded.customers ? customers.length : "—",
    },
    {
      id: "revenue",
      title: "Order Value (excl. cancelled)",
      value: loaded.orders ? formatCurrency(totalOrderValue) : "—",
    },
  ];

  const recentOrders = [...orders]
    .sort((first, second) => {
      const firstDate = new Date(first.createdAt || first.date || 0).getTime();
      const secondDate = new Date(second.createdAt || second.date || 0).getTime();
      return secondDate - firstDate;
    })
    .slice(0, 5)
    .map((order) => ({
      id: order.id,
      customer: order.customer,
      status: order.status,
    }));

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Dashboard</h1>
            <p>
              Here is what is happening at VK Stitch Studio today.
            </p>
          </div>

          <div className="admin-header-actions">
            <button
              type="button"
              className="admin-secondary-btn"
              onClick={() => setRefreshKey((key) => key + 1)}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
            <button
              type="button"
              className="admin-primary-btn"
              onClick={() => navigate("/admin/customers")}
            >
              Manage Customers
            </button>
          </div>
        </header>

        {errors.length > 0 && (
          <div className="dashboard-error" role="alert">
            <strong>Some dashboard data could not be loaded.</strong>
            <ul>
              {errors.map((message) => <li key={message}>{message}</li>)}
            </ul>
          </div>
        )}

        {loading ? (
          <p className="dashboard-loading">Loading dashboard...</p>
        ) : (
          <>
            <section className="admin-stats" aria-label="Dashboard statistics">
              {stats.map((stat) => (
                <StatCard
                  key={stat.id}
                  title={stat.title}
                  value={stat.value}
                />
              ))}
            </section>

            <section className="admin-grid">
              <div className="admin-panel admin-panel--wide">
                <RecentOrder orders={recentOrders} />

              </div>

              <div className="admin-panel">
                <h2>Today's Available Fitting Slots</h2>

                {loaded.slots && availableSlots.length ? (
                  <ul className="appt-list">
                    {availableSlots.slice(0, 5).map((slot, index) => {
                      const time =
                        typeof slot === "string"
                          ? slot
                          : slot.time || slot.startTime || slot.slot || "Fitting slot";
                      return (
                        <li key={slot._id || slot.id || `${time}-${index}`}>
                          <span className="appt-time">{time}</span>
                          <span className="appt-info">
                            <strong>Available</strong>
                            <small>Fitting appointment</small>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : loaded.slots ? (
                  <p>No fitting slots available today.</p>
                ) : (
                  <p>Availability could not be loaded.</p>
                )}

                <button
                  type="button"
                  className="admin-link-btn"
                  onClick={() => setRefreshKey((key) => key + 1)}
                >
                  Refresh availability →
                </button>
              </div>
            </section>

            <section className="admin-grid">
              <div className="admin-panel admin-panel--wide">
                <h2>Manage Orders</h2>

                <OrdersTable
                  orders={orders}
                  onStatusChange={handleStatusChange}
                  updatingOrderId={updatingOrderId}
                  emptyStateText={
                    loaded.orders
                      ? "No orders found."
                      : "Orders could not be loaded."
                  }
                  compact
                />
              </div>

              <div className="admin-panel">
                <h2>Order Status</h2>
                {loaded.orders ? (
                  <ul className="order-status-list">
                    {orderStatusSummary.map((status) => (
                      <li key={status.label}>
                        <div className="order-status-label">
                          <span>{status.label}</span>
                          <strong>{status.count}</strong>
                        </div>
                        <div
                          className="order-status-track"
                          aria-label={`${status.count} ${status.label} orders`}
                        >
                          <span
                            className={`order-status-bar ${status.className}`}
                            style={{
                              width: `${(status.count / largestStatusCount) * 100}%`,
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Order status summary is unavailable.</p>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
