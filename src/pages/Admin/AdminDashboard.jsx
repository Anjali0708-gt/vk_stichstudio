import React from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import QuickAction from "../../components/QuickAction";
import RecentOrder from "../../components/RecentOrder";

import "./AdminDashboard.css";

/* ------------------------------------------------------------------
   Sample data. Replace with your API calls (src/Api) when ready,
   e.g. useEffect(() => { OrderApi.getAll().then(setOrders) }, []).
------------------------------------------------------------------- */
const stats = [
  { id: "orders", title: "Orders in progress", value: 24, note: "6 due this week" },
  { id: "appointments", title: "Appointments today", value: 7, note: "Next at 11:30 AM" },
  { id: "customers", title: "Customers", value: 312, note: "9 new this month" },
  { id: "revenue", title: "Revenue this month", value: "₹1,84,500", note: "₹32,000 pending" },
];

const recentOrders = [
  { id: "#VK-1042", customer: "Anjali Sharma", status: "Stitching" },
  { id: "#VK-1041", customer: "Rohit Verma", status: "Ready for trial" },
  { id: "#VK-1040", customer: "Simran Kaur", status: "Cutting" },
  { id: "#VK-1039", customer: "Mehak Gill", status: "Delivered" },
  { id: "#VK-1038", customer: "Karan Malhotra", status: "Pending payment" },
];

const appointments = [
  { id: 1, time: "10:00 AM", name: "Priya Bansal", type: "Measurement" },
  { id: 2, time: "11:30 AM", name: "Harpreet Singh", type: "Trial fitting" },
  { id: 3, time: "02:00 PM", name: "Neha Arora", type: "Consultation" },
  { id: 4, time: "04:30 PM", name: "Gurleen Kaur", type: "Delivery" },
];

const weeklyRevenue = [
  { day: "Mon", amount: 18000 },
  { day: "Tue", amount: 26500 },
  { day: "Wed", amount: 12000 },
  { day: "Thu", amount: 31000 },
  { day: "Fri", amount: 24500 },
  { day: "Sat", amount: 38000 },
  { day: "Sun", amount: 9500 },
];

/* Change the paths to match your router. */
const quickActions = [
  { id: "new-order", label: "New order", path: "/admin/orders" },
  { id: "book", label: "Book appointment", path: "/admin/appointments" },
  { id: "measure", label: "Add measurements", path: "/admin/measurements" },
  { id: "payment", label: "Record payment", path: "/admin/payments" },
  { id: "product", label: "Add product", path: "/admin/products" },
  { id: "report", label: "View reports", path: "/admin/reports" },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const maxRevenue = Math.max(...weeklyRevenue.map((d) => d.amount));
  const weekTotal = weeklyRevenue.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Dashboard</h1>
            <p>Here is what is happening at VK Stitch Studio today.</p>
          </div>
          <button
            type="button"
            className="admin-primary-btn"
            onClick={() => navigate("/admin/orders")}
          >
            New order
          </button>
        </header>

        {/* Stats */}
        <section className="admin-stats" aria-label="Key numbers">
          {stats.map((s) => (
            <StatCard
              key={s.id}
              title={s.title}
              value={s.value}
              note={s.note}
            />
          ))}
        </section>

        {/* Orders + appointments */}
        <section className="admin-grid">
          <div className="admin-panel admin-panel--wide">
            <RecentOrder orders={recentOrders} />
            <button
              type="button"
              className="admin-link-btn"
              onClick={() => navigate("/admin/orders")}
            >
              See all orders
            </button>
          </div>

          <div className="admin-panel">
            <h2>Today's appointments</h2>
            <ul className="appt-list">
              {appointments.map((a) => (
                <li key={a.id}>
                  <span className="appt-time">{a.time}</span>
                  <span className="appt-info">
                    <strong>{a.name}</strong>
                    <small>{a.type}</small>
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="admin-link-btn"
              onClick={() => navigate("/admin/appointments")}
            >
              Open calendar
            </button>
          </div>
        </section>

        {/* Revenue + quick actions */}
        <section className="admin-grid">
          <div className="admin-panel admin-panel--wide">
            <div className="panel-head">
              <h2>Revenue this week</h2>
              <span className="panel-total">₹{weekTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="bars" role="img" aria-label="Bar chart of daily revenue for this week">
              {weeklyRevenue.map((d) => (
                <div className="bar-col" key={d.day}>
                  <div
                    className="bar"
                    style={{ height: `${(d.amount / maxRevenue) * 100}%` }}
                    title={`₹${d.amount.toLocaleString("en-IN")}`}
                  />
                  <span>{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-panel">
            <h2>Quick actions</h2>
            <div className="quick-actions">
              {quickActions.map((q) => (
                <QuickAction
                  key={q.id}
                  label={q.label}
                  title={q.label}
                  onClick={() => navigate(q.path)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;