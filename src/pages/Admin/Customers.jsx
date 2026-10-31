
import { useEffect, useState } from "react";
import {
  getCustomers,
  signUp,
  updateCustomer,
  deleteCustomer,
} from "../../Api/UserApi";
import Sidebar from "../../components/Sidebar";
import "./Customer.css";
import "./AdminDashboard.css";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const getCustomerList = (response) => {
  const data = response?.data;
  const list = Array.isArray(data)
    ? data
    : data?.customers || data?.data || data?.users || [];
  return Array.isArray(list) ? list : [];
};

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Load customers
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCustomers();
      setCustomers(getCustomerList(response));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load customers. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    getCustomers()
      .then((response) => {
        if (isMounted) setCustomers(getCustomerList(response));
      })
      .catch((err) => {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load customers. Please try again."
          );
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Open add form
  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setNotice("");
    setModalOpen(true);
  };

  // Open edit form
  const openEditModal = (customer) => {
    setEditingId(customer._id || customer.id);

    setForm({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address: customer.address || "",
    });

    setError("");
    setNotice("");
    setModalOpen(true);
  };

  // Form input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Save customer
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setNotice("");

      if (editingId) {
        await updateCustomer(editingId, form);
        setNotice("Customer updated successfully.");
      } else {
        await signUp(form);
        setNotice("Customer added successfully.");
      }

      setModalOpen(false);
      setForm(emptyForm);
      setEditingId(null);

      await fetchCustomers();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save customer. Check your API routes."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete customer
  const handleDelete = async (customer) => {
    const id = customer._id || customer.id;

    if (!id) {
      setError("Customer ID is missing.");
      return;
    }

    const confirmed = window.confirm(
      `Delete ${customer.name || "this customer"}? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setError("");
      setNotice("");

      await deleteCustomer(id);

      setCustomers((previous) =>
        previous.filter((item) => (item._id || item.id) !== id)
      );

      setNotice("Customer deleted successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete customer."
      );
    }
  };

  // Search customers
  const filteredCustomers = customers.filter((customer) => {
    const query = search.toLowerCase();

    return [
      customer.name,
      customer.email,
      customer.phone,
      customer.address,
    ].some((value) =>
      String(value || "").toLowerCase().includes(query)
    );
  });

  return (
    
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <div className="customers-page">
      {/* Header */}
      <header className="customers-header">
        <div>
          <span className="customers-eyebrow">
            VK STITCH STUDIO / ADMIN
          </span>
          <h1>Customer Management</h1>
          <p>Manage your customers and their information.</p>
        </div>

        <button
          className="customer-add-btn"
          onClick={openAddModal}
          type="button"
        >
          <span>＋</span> Add Customer
        </button>
      </header>

      {/* Notifications */}
      {notice && (
        <div className="customer-notice" role="status">
          {notice}
          <button onClick={() => setNotice("")} type="button">
            ×
          </button>
        </div>
      )}

      {error && (
        <div className="customer-error" role="alert">
          {error}
          <button onClick={() => setError("")} type="button">
            ×
          </button>
        </div>
      )}

      {/* Statistics */}
      <section className="customer-stats">
        <div className="customer-stat-card">
          <div className="customer-stat-icon">♙</div>
          <div>
            <span>Total Customers</span>
            <h2>{customers.length}</h2>
          </div>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-icon gold-icon">⌕</div>
          <div>
            <span>Search Results</span>
            <h2>{filteredCustomers.length}</h2>
          </div>
        </div>
      </section>

      {/* Customer Table */}
      <section className="customer-panel">
        <div className="customer-panel-header">
          <div>
            <h2>All Customers</h2>
            <p>View and manage your customer records.</p>
          </div>

          <label className="customer-search">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>

        {loading ? (
          <div className="customer-state">
            <span className="customer-spinner" />
            Loading customers...
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="customer-state">
            <div className="customer-empty-icon">♙</div>
            <h3>No customers found</h3>
            <p>
              {search
                ? "Try another search term."
                : "Add your first customer to get started."}
            </p>

            {!search && (
              <button
                className="customer-add-btn"
                onClick={openAddModal}
                type="button"
              >
                + Add Customer
              </button>
            )}
          </div>
        ) : (
          <div className="customer-table-wrapper">
            <table className="customer-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((customer) => {
                  const id = customer._id || customer.id;

                  return (
                    <tr key={id}>
                      <td>
                        <div className="customer-identity">
                          <div className="customer-avatar">
                            {(customer.name || "C")
                              .trim()
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="customer-name-block">
                            <strong>
                              {customer.name || "Unnamed Customer"}
                            </strong>
                            <small>
                              ID: {id ? String(id).slice(-8) : "N/A"}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="customer-contact">
                          <span>{customer.email || "No email"}</span>
                          <small>{customer.phone || "No phone"}</small>
                        </div>
                      </td>

                      <td className="customer-address">
                        {customer.address || "—"}
                      </td>

                      <td>
                        <div className="customer-actions">
                          <button
                            className="customer-edit-btn"
                            onClick={() => openEditModal(customer)}
                            type="button"
                            aria-label={`Edit ${customer.name || "customer"}`}
                          >
                            Edit
                          </button>

                          <button
                            className="customer-delete-btn"
                            onClick={() => handleDelete(customer)}
                            type="button"
                            aria-label={`Delete ${customer.name || "customer"}`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <footer className="customer-table-footer">
          Showing {filteredCustomers.length} of {customers.length} customers
        </footer>
      </section>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div
          className="customer-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !saving) {
              setModalOpen(false);
            }
          }}
        >
          <section
            className="customer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-modal-title"
          >
            <div className="customer-modal-header">
              <div>
                <span className="customers-eyebrow">
                  CUSTOMER DETAILS
                </span>
                <h2 id="customer-modal-title">
                  {editingId ? "Edit Customer" : "Add New Customer"}
                </h2>
              </div>

              <button
                className="customer-modal-close"
                onClick={() => setModalOpen(false)}
                disabled={saving}
                type="button"
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="customer-form-grid">
                <label>
                  Full Name <span>*</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                    maxLength={100}
                  />
                </label>

                <label>
                  Email Address <span>*</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="customer@example.com"
                    required
                    maxLength={254}
                  />
                </label>

                <label>
                  Phone Number
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    maxLength={20}
                  />
                </label>

                <label className="customer-full-field">
                  Address
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter customer address"
                    rows={3}
                    maxLength={500}
                  />
                </label>
              </div>

              <div className="customer-modal-footer">
                <button
                  className="customer-cancel-btn"
                  onClick={() => setModalOpen(false)}
                  disabled={saving}
                  type="button"
                >
                  Cancel
                </button>

                <button
                  className="customer-add-btn"
                  disabled={saving}
                  type="submit"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Save Changes"
                    : "Add Customer"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
        </div>
      </main>
    </div>
  );
}
