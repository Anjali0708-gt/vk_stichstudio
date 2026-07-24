import React from "react";
import "./StatCard.css";

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <div className="card-top"></div>

      <div className="card-content">
        <h3>{title}</h3>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default StatCard;