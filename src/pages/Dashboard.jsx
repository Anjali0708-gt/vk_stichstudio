import React from "react";
// import StatCard from "../components/StatCard";
// import RecentOrder from "../components/RecentOrder";
// import AppointmentList from "../components/AppointmentList";
// import QuickAction from "../components/QuickAction";
// import "./Dashboard.css";

function Dashboard() {
  const statsData = [ 
    {
      id: 1,
      title: "Total Customers",
      value: 150,
    },
    {
      id: 2,
      title: "Total Orders",
      value: 80,
    },
    {
      id: 3,
      title: "Pending Orders",
      value: 12,
    },
    {
      id: 4,
      title: "Revenue",
      value: "₹45,000",
    },
  ];
    const recentOrders = [
    {
      id: "ORD001",
      customer: "Rahul",
      status: "Pending",
    },
    {
      id: "ORD002",
      customer: "Amit",
      status: "Completed",
    },
    {
      id: "ORD003",
      customer: "Priya",
      status: "In Progress",
    },
  ];
  const appointments = [
  {
    id: 1,
    customer: "Rahul Sharma",
    date: "18 Jun 2026",
    time: "10:00 AM",
  },
  {
    id: 2,
    customer: "Amit Das",
    date: "18 Jun 2026",
    time: "12:30 PM",
  },
  {
    id: 3,
    customer: "Priya Roy",
    date: "19 Jun 2026",
    time: "03:00 PM",
  },
];

  

  return (
  <div className="dashboard">
    <div className="dashboard-header">
      <h1>Dashboard</h1>
      <p>Welcome back to VK Stitch Studio 👋</p>
    </div>

    <div className="stats-container">
      {statsData.map((item) => (
        <StatCard
          key={item.id}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>

    {/* Quick Actions */}
    <QuickAction />

    <RecentOrder orders={recentOrders} />

    <br />

    <AppointmentList Appointment={appointments} />
  </div>
);
}

export default Dashboard;