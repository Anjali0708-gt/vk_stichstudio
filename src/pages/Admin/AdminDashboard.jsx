
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import RecentOrder from "../../components/RecentOrder";
import OrdersTable from "../../components/OrdersTable";

import { getOrders, updateOrder } from "../../Api/orderApi";
import { getCustomers } from "../../Api/UserApi";
import { getAvailableSlots } from "../../Api/appointmentApi";

import "./AdminDashboard.css";

const quickActions = [
  { id: "new-order", label: "New Order", path: "/orders" },
  { id: "book", label: "Appointments", path: "/appointments" },
  { id: "measure", label: "Measurements", path: "/measurements" },
  { id: "product", label: "Add Product", path: "/products" },
  { id: "report", label: "View Reports", path: "/reports" },
];

const getArray = (response, key) => {
  const data = response?.data;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];
  if (Array.isArray(data?.data)) return data.data;

  return [];
};

const formatCurrency = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

const getOrderId = (order) =>
  order.orderNumber || order.orderId || order._id || order.id;

const getCustomerName = (order) =>
  order.customerName ||
  order.customer?.name ||
  order.customer?.fullName ||
  order.customer ||
  order.name ||
  "Customer";

const getOrderPrice = (order) =>
  Number(
    order.totalAmount ??
      order.totalPrice ??
      order.amount ??
      order.total ??
      order.price ??
      0
  );

function AdminDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchDashboardData() {
      setLoading(true);
      setError("");

      const today = new Date().toLocaleDateString("en-CA");

      const results = await Promise.allSettled([
        getOrders(),
        getCustomers(),
        getAvailableSlots(today),
      ]);

      if (!isMounted) return;

      if (results[0].status === "fulfilled") {
        setOrders(
          getArray(results[0].value, "orders").map((order) => ({
            ...order,
            id: String(getOrderId(order)),
            customer: getCustomerName(order),
            type:
              order.type ||
              order.orderType ||
              order.service ||
              "Tailoring",
            status: order.status || "Pending",
            price: getOrderPrice(order),
            date: order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("en-IN")
              : "—",
            dueDate: order.dueDate
              ? new Date(order.dueDate).toLocaleDateString("en-IN")
              : "—",
          }))
        );
      }

      if (results[1].status === "fulfilled") {
        setCustomers(getArray(results[1].value, "customers"));
      }

      if (results[2].status === "fulfilled") {
        setAppointments(
          getArray(results[2].value, "appointments").length
            ? getArray(results[2].value, "appointments")
            : getArray(results[2].value, "slots")
        );
      }

      if (results.some((result) => result.status === "rejected")) {
        setError(
          "Some dashboard information could not be loaded. Please check your backend API."
        );
      }

      setLoading(false);
    }

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const previousOrders = orders;

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === String(orderId)
          ? { ...order, status: newStatus }
          : order
      )
    );

    try {
      await updateOrder(orderId, { status: newStatus });
    } catch (err) {
      setOrders(previousOrders);
      setError(
        err?.response?.data?.message ||
          "Failed to update order status. Please try again."
      );
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

  const stats = [
    {
      id: "orders",
      title: "Total Orders",
      value: orders.length,
    },
    {
      id: "pending",
      title: "Orders in Progress",
      value: pendingOrders,
    },
    {
      id: "customers",
      title: "Total Customers",
      value: customers.length,
    },
    {
      id: "revenue",
      title: "Total Order Value",
      value: formatCurrency(totalOrderValue),
    },
  ];

  const recentOrders = [...orders].slice(-5).reverse().map((order) => ({
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

          <button
            type="button"
            className="admin-primary-btn"
            onClick={() => navigate("/orders")}
          >
            + New Order
          </button>
        </header>

        {error && (
          <div className="dashboard-error" role="alert">
            {error}
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

                <button
                  type="button"
                  className="admin-link-btn"
                  onClick={() => navigate("/orders")}
                >
                  See All Orders →
                </button>
              </div>

              <div className="admin-panel">
                <h2>Today's Appointments</h2>

                {appointments.length ? (
                  <ul className="appt-list">
                    {appointments.slice(0, 5).map((appointment, index) => (
                      <li key={appointment._id || appointment.id || index}>
                        <span className="appt-time">
                          {appointment.time ||
                            appointment.slot ||
                            appointment.startTime ||
                            "Time not set"}
                        </span>

                        <span className="appt-info">
                          <strong>
                            {appointment.customerName ||
                              appointment.customer?.name ||
                              appointment.name ||
                              "Available slot"}
                          </strong>
                          <small>
                            {appointment.type ||
                              appointment.service ||
                              appointment.status ||
                              "Appointment"}
                          </small>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No appointment records found.</p>
                )}

                <button
                  type="button"
                  className="admin-link-btn"
                  onClick={() => navigate("/appointments")}
                >
                  Open Appointments →
                </button>
              </div>
            </section>

            <section className="admin-grid">
              <div className="admin-panel admin-panel--wide">
                <h2>Manage Orders</h2>

                <OrdersTable
                  orders={orders}
                  onStatusChange={handleStatusChange}
                  compact
                />
              </div>

              <div className="admin-panel">
                <h2>Quick Actions</h2>

                <div className="quick-actions">
                  {quickActions.map((action) => (
                    <button
                      type="button"
                      key={action.id}
                      className="quick-action-btn"
                      onClick={() => navigate(action.path)}
                    >
                      {action.label} →
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
