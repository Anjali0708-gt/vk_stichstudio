import { useEffect, useMemo, useState } from "react";
import { FaCalendarAlt, FaSyncAlt } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import { getAppointments } from "../../Api/AppointmentApi";
import "./AdminDashboard.css";

const getAppointmentList = (response) => {
  const data = response?.data;
  const list = Array.isArray(data)
    ? data
    : data?.appointments || data?.data?.appointments || data?.data;
  return Array.isArray(list) ? list : null;
};

const getCustomerName = (appointment) => {
  const customer =
    appointment.customer ||
    appointment.user ||
    appointment.customerName ||
    appointment.name;

  if (customer && typeof customer === "object") {
    return customer.name || customer.fullName || customer.email || "Customer";
  }
  return customer || "Customer";
};

const getServiceName = (appointment) => {
  const service =
    appointment.service?.name ||
    appointment.serviceName ||
    appointment.service;
  if (service && typeof service === "object") {
    return service.name || service.title || "Fitting";
  }
  return service || "Fitting";
};

const formatDate = (date) => {
  if (!date) return "—";
  const parsed = new Date(`${String(date).slice(0, 10)}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return String(date);
  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    getAppointments()
      .then((response) => {
        const list = getAppointmentList(response);
        if (!list) {
          throw new Error(
            "The appointments API returned an unexpected response."
          );
        }
        if (isMounted) setAppointments(list);
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(
            requestError?.response?.data?.message ||
              requestError?.message ||
              "Unable to load appointments."
          );
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  const statuses = useMemo(
    () => [
      "All",
      ...new Set(
        appointments
          .map((appointment) => appointment.status)
          .filter(Boolean)
      ),
    ],
    [appointments]
  );

  const filteredAppointments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return appointments.filter((appointment) => {
      const customer = getCustomerName(appointment);
      const service = getServiceName(appointment);
      const appointmentDate = String(
        appointment.date || appointment.appointmentDate || ""
      ).slice(0, 10);
      const matchesQuery =
        !query ||
        [
          customer,
          appointment.email,
          appointment.phone,
          service,
          appointment.status,
        ].some((value) => String(value || "").toLowerCase().includes(query));
      const matchesDate = !dateFilter || appointmentDate === dateFilter;
      const matchesStatus =
        statusFilter === "All" || appointment.status === statusFilter;
      return matchesQuery && matchesDate && matchesStatus;
    });
  }, [appointments, dateFilter, search, statusFilter]);

  const todaysAppointments = appointments.filter(
    (appointment) =>
      String(appointment.date || appointment.appointmentDate || "").slice(
        0,
        10
      ) === getToday()
  ).length;

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Appointments</h1>
            <p>Review and search customer fitting appointments.</p>
          </div>
          <button
            type="button"
            className="admin-secondary-btn"
            onClick={() => {
              setLoading(true);
              setError("");
              setRefreshKey((key) => key + 1);
            }}
            disabled={loading}
          >
            <FaSyncAlt aria-hidden="true" />
            {loading ? " Loading..." : " Refresh"}
          </button>
        </header>

        {error && (
          <div className="dashboard-error" role="alert">
            {error}
          </div>
        )}

        <section className="admin-stats" aria-label="Appointment statistics">
          <article className="stat-card">
            <div className="card-content">
              <h3>Total Appointments</h3>
              <h2>{loading ? "—" : appointments.length}</h2>
            </div>
          </article>
          <article className="stat-card">
            <div className="card-content">
              <h3>Today</h3>
              <h2>{loading ? "—" : todaysAppointments}</h2>
            </div>
          </article>
        </section>

        <section className="admin-panel">
          <div className="appointments-toolbar">
            <h2>
              <FaCalendarAlt aria-hidden="true" />
              Appointment records
            </h2>
            <div className="appointments-filters">
              <label>
                <span className="visually-hidden">Search appointments</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search customer or service"
                />
              </label>
              <label>
                <span className="visually-hidden">Filter by date</span>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(event) => setDateFilter(event.target.value)}
                />
              </label>
              <label>
                <span className="visually-hidden">Filter by status</span>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {loading ? (
            <p className="dashboard-loading">Loading appointments...</p>
          ) : !error && filteredAppointments.length === 0 ? (
            <div className="appointments-empty">
              {appointments.length
                ? "No appointments match these filters."
                : "No appointment records found."}
            </div>
          ) : !error ? (
            <div className="dash-table-wrapper">
              <table className="dash-table appointments-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Service</th>
                    <th>Date &amp; Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment, index) => {
                    const id =
                      appointment._id ||
                      appointment.id ||
                      `${appointment.date || appointment.appointmentDate}-${index}`;
                    const service = getServiceName(appointment);
                    const status = appointment.status || "Scheduled";
                    const statusClass = status
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    return (
                      <tr key={id}>
                        <td>{getCustomerName(appointment)}</td>
                        <td>
                          <div>{appointment.email || "—"}</div>
                          <small>{appointment.phone || ""}</small>
                        </td>
                        <td>{service}</td>
                        <td>
                          {formatDate(
                            appointment.date || appointment.appointmentDate
                          )}
                          <small className="appointment-time">
                            {appointment.time || appointment.startTime || ""}
                          </small>
                        </td>
                        <td>
                          <span className={`dash-badge ${statusClass}`}>
                            <span className="dash-badge-dot" />
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}
          <p className="appointments-count">
            Showing {filteredAppointments.length} of {appointments.length}
          </p>
        </section>
      </main>
    </div>
  );
}

export default Appointments;