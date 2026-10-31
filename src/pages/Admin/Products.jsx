
import React, { useEffect, useMemo, useState } from "react";
import "./Product.css";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaBoxOpen,
  FaBoxes,
  FaExclamationTriangle,
  FaTimes,
  FaImage,
  FaFilter
} from "react-icons/fa";

import {
  getProducts,
  addProduct,
    editProduct as updateProduct,
  deleteProduct
} from "../../Api/ProductApi";

const initialForm = {
  name: "",
  category: "Shirt",
  description: "",
  price: "",
  stock: "",
  image: "",
  sizes: "",
  colors: "",
  active: true
};

const categories = [
  "shirt",
  "trouser",
  "coat-blazer",
  "sherwani",
  "kurta",
  "wedding",
  "other"
];

const Product = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  // Image upload state
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getProducts();

      const data = res.data.products || res.data;
      setProducts(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Product statistics
  const stats = useMemo(() => ({
    total: products.length,
    active: products.filter(p => p.active !== false).length,
    lowStock: products.filter(
      p => Number(p.stock) > 0 && Number(p.stock) <= 5
    ).length,
    outOfStock: products.filter(
      p => Number(p.stock) <= 0
    ).length
  }), [products]);

  // Search and category filter
  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.category?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Open add modal
  const openAddModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setImageFile(null);
    setImagePreview("");
    setError("");
    setShowModal(true);
  };

  // Open edit modal
  const openEditModal = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name || "",
      category: product.category || "Shirt",
      description: product.description || "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      image: product.image || "",
      sizes: Array.isArray(product.sizes)
        ? product.sizes.join(", ")
        : product.sizes || "",
      colors: Array.isArray(product.colors)
        ? product.colors.join(", ")
        : product.colors || "",
      active: product.active !== false
    });

    setImageFile(null);
    setImagePreview(product.image || "");
    setError("");
    setShowModal(true);
  };

  // Save product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("sizes", form.sizes);
      formData.append("colors", form.colors);
      formData.append("active", String(form.active));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editingId) {
        await updateProduct(editingId, formData);
      } else {
        await addProduct(formData);
      }

      setShowModal(false);
      setEditingId(null);
      setForm(initialForm);
      setImageFile(null);
      setImagePreview("");

      await fetchProducts();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Failed to save product."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to delete product."
      );
    }
  };

  // Product stock status
  const getStockStatus = (stock) => {
    if (Number(stock) <= 0) {
      return "out";
    }

    if (Number(stock) <= 5) {
      return "low";
    }

    return "available";
  };

  return (
    <div className="product-admin">

      {/* HEADER */}
      <div className="product-header">
        <div>
          <span className="product-breadcrumb">
            Dashboard / Inventory
          </span>

          <h1>Product Management</h1>

          <p>
            Manage your products, inventory and availability.
          </p>
        </div>

        <button
          className="add-product-btn"
          onClick={openAddModal}
        >
          <FaPlus /> Add New Product
        </button>
      </div>

      {/* ERROR */}
      {error && !showModal && (
        <div className="product-error">
          {error}
          <button onClick={fetchProducts}>Retry</button>
        </div>
      )}

      {/* STAT CARDS */}
      <div className="product-stats">

        <div className="product-stat-card">
          <div className="stat-icon gold">
            <FaBoxes />
          </div>
          <div>
            <span>Total Products</span>
            <h2>{stats.total}</h2>
          </div>
        </div>

        <div className="product-stat-card">
          <div className="stat-icon green">
            <FaBoxOpen />
          </div>
          <div>
            <span>Active Products</span>
            <h2>{stats.active}</h2>
          </div>
        </div>

        <div className="product-stat-card">
          <div className="stat-icon orange">
            <FaExclamationTriangle />
          </div>
          <div>
            <span>Low Stock</span>
            <h2>{stats.lowStock}</h2>
          </div>
        </div>

        <div className="product-stat-card">
          <div className="stat-icon red">
            <FaBoxOpen />
          </div>
          <div>
            <span>Out of Stock</span>
            <h2>{stats.outOfStock}</h2>
          </div>
        </div>

      </div>

      {/* PRODUCT TABLE SECTION */}
      <div className="product-content">

        <div className="product-toolbar">
          <div>
            <h2>All Products</h2>
            <p>Manage your shop inventory</p>
          </div>

          <div className="product-filters">

            <div className="product-search">
              <FaSearch />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="product-category-filter">
              <FaFilter />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* TABLE */}
        <div className="product-table-wrapper">
          {loading ? (
            <div className="product-message">
              Loading products...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="product-message">
              No products found.
            </div>
          ) : (
            <table className="product-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map(product => {
                  const stockStatus =
                    getStockStatus(product.stock);

                  return (
                    <tr key={product._id}>
                      <td>
                        <div className="product-info">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                            />
                          ) : (
                            <div className="product-placeholder">
                              <FaImage />
                            </div>
                          )}

                          <div>
                            <strong>{product.name}</strong>
                            <small>
                              {product.description || "No description"}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>{product.category}</td>

                      <td className="product-price">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </td>

                      <td>{product.stock}</td>

                      <td>
                        <span className={`stock-badge ${stockStatus}`}>
                          {stockStatus === "out"
                            ? "Out of Stock"
                            : stockStatus === "low"
                            ? "Low Stock"
                            : "In Stock"}
                        </span>

                        {product.active === false && (
                          <span className="inactive-badge">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td>
                        <div className="product-actions">
                          <button
                            className="edit-product"
                            title="Edit product"
                            onClick={() => openEditModal(product)}
                          >
                            <FaEdit />
                          </button>

                          <button
                            className="delete-product"
                            title="Delete product"
                            onClick={() => handleDelete(product._id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="product-footer">
          Showing {filteredProducts.length} of {products.length} products
        </div>

      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          className="product-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="product-modal">

            <div className="modal-header">
              <div>
                <h2>
                  {editingId ? "Edit Product" : "Add New Product"}
                </h2>
                <p>Enter your product information below.</p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="product-form-grid">

                <div className="form-group full">
                  <label>Product Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="2999"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input
                    type="number"
                    name="stock"
                    min="0"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="10"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Sizes</label>
                  <input
                    name="sizes"
                    value={form.sizes}
                    onChange={handleChange}
                    placeholder="M, L, XL, XXL"
                  />
                </div>

                <div className="form-group full">
                  <label>Colors</label>
                  <input
                    name="colors"
                    value={form.colors}
                    onChange={handleChange}
                    placeholder="Black, Navy Blue, White"
                  />
                </div>

               <div className="form-group full">
  <label>Product Image *</label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];

      if (file) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }}
  />

  {imagePreview && (
    <div className="image-preview">
      <img src={imagePreview} alt="Product preview" />
    </div>
  )}
</div>
                <div className="form-group full">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Write product description..."
                    rows="3"
                  />
                </div>

                <div className="form-group full">
                  <label className="active-toggle">
                    <input
                      type="checkbox"
                      name="active"
                      checked={form.active}
                      onChange={handleChange}
                    />
                    Product is active and visible
                  </label>
                </div>

              </div>

              {error && (
                <div className="product-error">
                  {error}
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-product-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Product"
                    : "Save Product"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Product;
