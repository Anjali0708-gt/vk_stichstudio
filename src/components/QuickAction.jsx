import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuickAction.css";

function QuickAction() {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: "Add Customer",
      route: '/customers/add'
    },
    {
      id: 2,
      title: "Create Order",
      route: "/orders/add",
    },
    {
      id: 3,
      title: "Add Measurement",
      route: "/measurements/add",
    },
    {
      id: 4,
      title: "Book Appointment",
      route: "/appointments",
    },
  ];

  return (
    <div className="quick-actions">
      <h2>Quick Actions</h2>

      <div className="action-grid">
        {actions.map((action) => (
          <button
            key={action.id}
            className="action-btn"
            onClick={() => navigate(action.route)}
          >
            {action.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickAction;