import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaBox,
  FaChartBar
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        VK Stitch
      </div>

      <ul className="sidebar-menu">

        <li>
          <NavLink to="/dashboard" end>
            <FaHome /> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/customers">
            <FaUser /> Customers
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/appointments">
            <FaCalendarAlt /> Appointments
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/reports">
            <FaChartBar /> Reports
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/products">
            <FaBox /> Products
          </NavLink>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;