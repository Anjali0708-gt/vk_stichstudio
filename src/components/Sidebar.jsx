import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaShoppingCart, FaChartBar, FaCog } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        VK Stitch
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/dashboard">
            <FaHome /> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/customers">
            <FaUser /> Customers
          </NavLink>
        </li>

        <li>
          <NavLink to="/orders">
            <FaShoppingCart /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/measurements">
            <FaUser /> Measurements
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports">
            <FaChartBar /> Reports
          </NavLink>
        </li>

        <li>
          <NavLink to="/settings">
            <FaCog /> Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;