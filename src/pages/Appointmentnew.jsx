import { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { dashboardService } from '../services/dashboardService';
import { FaCheck, FaTimes, FaPhoneAlt } from 'react-icons/fa';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await dashboardService.getAppointments();
        setAppointments(data);
      } catch (err) {
        console.error('Failed to load appointments:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await dashboardService.updateAppointmentStatus(id, newStatus);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
    } catch (err) {
      console.error('Failed to update appointment:', err);
    }
  };

  const statusClass = (status) => {
    const map = {
      'Confirmed': 'confirmed',
      'Pending': 'pending',
      'Completed': 'completed',
      'Cancelled': 'cancelled',
    };
    return map[status] || '';
  };

  // Group appointments by date
  const groupedByDate = appointments.reduce((groups, apt) => {
    const date = apt.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(apt);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedByDate).sort();

  const formatDateLabel = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.getTime() === today.getTime()) return 'Today';
    if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';

    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDateBadge = (dateStr) => {
    const count = groupedByDate[dateStr]?.length || 0;
    return `${count} appointment${count !== 1 ? 's' : ''}`;
  };

  if (loading) {
    return (
      <AdminLayout title="Appointments" subtitle="Loading...">
        <div className="dash-page-header">
          <h1>Appointments</h1>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="dash-skeleton dash-skeleton-card" style={{ marginBottom: 12 }} />
        ))}
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Appointments" subtitle="Manage fittings & consultations">
      <div className="dash-page-header">
        <h1>Appointments</h1>
        <p>Manage customer fittings, consultations, and pickups</p>
      </div>

      {/* Summary Cards */}
      <div className="dash-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 28 }}>
        <div className="dash-stat-card" style={{ padding: 16 }}>
          <div className="dash-stat-card-value" style={{ fontSize: 22 }}>
            {appointments.filter((a) => a.status === 'Confirmed').length}
          </div>
          <div className="dash-stat-card-label">Confirmed</div>
        </div>
        <div className="dash-stat-card" style={{ padding: 16 }}>
          <div className="dash-stat-card-value" style={{ fontSize: 22 }}>
            {appointments.filter((a) => a.status === 'Pending').length}
          </div>
          <div className="dash-stat-card-label">Pending</div>
        </div>
        <div className="dash-stat-card" style={{ padding: 16 }}>
          <div className="dash-stat-card-value" style={{ fontSize: 22 }}>
            {appointments.filter((a) => a.status === 'Completed').length}
          </div>
          <div className="dash-stat-card-label">Completed</div>
        </div>
        <div className="dash-stat-card" style={{ padding: 16 }}>
          <div className="dash-stat-card-value" style={{ fontSize: 22 }}>
            {appointments.length}
          </div>
          <div className="dash-stat-card-label">Total</div>
        </div>
      </div>

      {/* Grouped by Date */}
      {sortedDates.length === 0 ? (
        <div className="dash-card">
          <div className="dash-empty-state">
            <div className="empty-icon">📅</div>
            <h3>No appointments scheduled</h3>
            <p>New appointments will appear here</p>
          </div>
        </div>
      ) : (
        sortedDates.map((date) => (
          <div className="dash-appointments-group" key={date}>
            <div className="dash-appointments-date">
              {formatDateLabel(date)}
              <span className="date-badge">{getDateBadge(date)}</span>
            </div>

            {groupedByDate[date].map((apt) => (
              <div className="dash-appointment-card" key={apt.id}>
                <div className="dash-appointment-time">{apt.time}</div>

                <div className="dash-appointment-info">
                  <h4>{apt.customer}</h4>
                  <p>
                    {apt.service}
                    {apt.notes && <> — <em>{apt.notes}</em></>}
                  </p>
                </div>

                <span className={`dash-badge ${statusClass(apt.status)}`}>
                  <span className="dash-badge-dot" />
                  {apt.status}
                </span>

                <div className="dash-appointment-actions">
                  {apt.status === 'Pending' && (
                    <button
                      className="dash-btn dash-btn-primary dash-btn-sm"
                      onClick={() => handleStatusChange(apt.id, 'Confirmed')}
                      title="Confirm"
                    >
                      <FaCheck />
                    </button>
                  )}
                  {(apt.status === 'Pending' || apt.status === 'Confirmed') && (
                    <button
                      className="dash-btn dash-btn-ghost dash-btn-sm"
                      onClick={() => handleStatusChange(apt.id, 'Cancelled')}
                      title="Cancel"
                      style={{ color: 'var(--dash-danger)' }}
                    >
                      <FaTimes />
                    </button>
                  )}
                  {apt.phone && (
                    <a
                      href={`tel:${apt.phone}`}
                      className="dash-btn dash-btn-ghost dash-btn-sm"
                      title="Call customer"
                    >
                      <FaPhoneAlt />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </AdminLayout>
  );
}
