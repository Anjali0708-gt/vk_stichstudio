import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import './Gallery.css';
import { FaStar, FaShoppingCart, FaCheck } from 'react-icons/fa';

function Gallery() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState({}); // productId -> selectedSize
  const [addedItems, setAddedItems] = useState({}); // productId -> boolean (for feedack)
  
  const { addToCart } = useCart();

  const categories = ['All', 'Men', 'Women', 'Traditional'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await productService.getProducts(category);
      setProducts(data);
      
      // Initialize sizes for products
      const initialSizes = {};
      data.forEach(p => {
        initialSizes[p.id] = p.sizes[0]; // default to first size
      });
      setSelectedSizes(prev => ({ ...prev, ...initialSizes }));
      
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleAddToCart = (product) => {
    const size = selectedSizes[product.id] || 'Standard M';
    addToCart(product, size);
    
    // Show temporary success feedback
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  return (
    <div className="gallery-page">
      {/* Page Header */}
      <section className="gallery-hero">
        <div className="gallery-hero-overlay"></div>
        <div className="gallery-hero-content">
          <h1>Designer Collection</h1>
          <p>
            Explore our curated selection of bespoke and ready-to-fit designer wear. Add garments to your cart or customize sizes through booking.
          </p>
        </div>
      </section>

      {/* Categories & Filter Bar */}
      <section className="filter-section">
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat} Collection
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading luxury collections...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="no-products">
            <p>No designs available in this category currently.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => {
              const currentSize = selectedSizes[product.id] || product.sizes[0];
              const isAdded = addedItems[product.id];

              return (
                <div className="product-card" key={product.id}>
                  <div className="product-img-wrapper">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <span className="product-category-badge">{product.category}</span>
                  </div>

                  <div className="product-info">
                    <div className="product-rating">
                      <span className="stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'} />
                        ))}
                      </span>
                      <span className="reviews-count">({product.reviews})</span>
                    </div>

                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-price">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>

                    {/* Sizing Selector */}
                    <div className="size-selector-container">
                      <label htmlFor={`size-${product.id}`}>Select Size:</label>
                      <select
                        id={`size-${product.id}`}
                        value={currentSize}
                        onChange={(e) => handleSizeChange(product.id, e.target.value)}
                        className="size-select"
                      >
                        {product.sizes.map((sz) => (
                          <option key={sz} value={sz}>{sz}</option>
                        ))}
                      </select>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`add-to-cart-btn ${isAdded ? 'success' : ''}`}
                      disabled={isAdded}
                    >
                      {isAdded ? (
                        <>
                          <FaCheck /> Added to Cart
                        </>
                      ) : (
                        <>
                          <FaShoppingCart /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Gallery;