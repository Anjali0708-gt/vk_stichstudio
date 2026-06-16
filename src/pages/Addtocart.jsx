import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Addtocart.css';
import { FaTrash, FaMinus, FaPlus, FaArrowRight, FaTicketAlt, FaShoppingBag } from 'react-icons/fa';

function Addtocart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const navigate = useNavigate();

  // Calculated estimates
  const TAX_RATE = 0.05; // 5% GST/taxes
  const taxAmount = cartTotal * TAX_RATE;
  const shippingAmount = cartTotal > 15000 ? 0 : 250; // free shipping above 15k
  const discountAmount = cartTotal * discount;
  const grandTotal = cartTotal + taxAmount + shippingAmount - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setDiscount(0.10); // 10% off
      setPromoApplied(true);
    } else if (promoCode.toUpperCase() === 'VKSTUDIO') {
      setDiscount(0.15); // 15% off
      setPromoApplied(true);
    } else {
      setPromoError('Invalid coupon code. Try WELCOME10 or VKSTUDIO');
    }
  };

  const handleCheckout = () => {
    // Simulate order placement
    const mockOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(mockOrderId);
    setCheckoutComplete(true);
    clearCart();
  };

  if (checkoutComplete) {
    return (
      <div className="checkout-success-page">
        <div className="success-card">
          <div className="success-icon-wrapper">
            <span className="success-icon">✓</span>
          </div>
          <h1>Order Confirmed!</h1>
          <p className="order-number">Order ID: <strong>{orderId}</strong></p>
          <p className="success-message">
            Thank you for choosing VK Stich Studio. Your order has been registered in our system. A tailoring associate will contact you shortly to coordinate fabrics and confirm styling.
          </p>
          <div className="success-actions">
            <button onClick={() => navigate('/bookappointment')} className="cta-btn book-cta">
              Schedule Fitting Appointment
            </button>
            <Link to="/gallery" className="continue-shopping">
              Continue Browsing Collections
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container-main">
        {cart.length === 0 ? (
          <div className="empty-cart-state">
            <div className="empty-icon-wrapper">
              <FaShoppingBag />
            </div>
            <h2>Your Shopping Cart is Empty</h2>
            <p>You haven't added any designer garments to your cart yet. Explore our luxury collection to begin.</p>
            <Link to="/gallery" className="shop-now-btn">
              Explore Collections <FaArrowRight />
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-header-title">
              <h1>Your Shopping Cart</h1>
              <p>Review your selection before checkout. Selected standard sizes or custom fits.</p>
            </div>
            
            <div className="cart-split-layout">
              {/* Cart Items List */}
              <div className="cart-items-column">
                {cart.map((item) => (
                  <div className="cart-item-card" key={`${item.id}-${item.selectedSize}`}>
                    <div className="cart-item-img-container">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="cart-item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-size-info">Size: <span>{item.selectedSize}</span></p>
                      <span className="item-unit-price">₹{item.price.toLocaleString('en-IN')}</span>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="quantity-controls-group">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="qty-btn"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="qty-btn"
                        aria-label="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <div className="cart-item-subtotal">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="item-remove-btn"
                      title="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary Panel */}
              <div className="cart-summary-column">
                <div className="summary-card">
                  <h2>Order Summary</h2>
                  <div className="summary-divider"></div>
                  
                  <div className="summary-row">
                    <span>Items Subtotal</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="summary-row">
                    <span>Taxes & GST (5%)</span>
                    <span>₹{taxAmount.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="summary-row">
                    <span>Estimated Shipping</span>
                    <span>
                      {shippingAmount === 0 ? (
                        <span className="free-shipping">FREE</span>
                      ) : (
                        `₹${shippingAmount}`
                      )}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="summary-row discount-row">
                      <span>Discount ({(discount * 100)}% coupon)</span>
                      <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="summary-divider"></div>

                  <div className="summary-row total-row">
                    <span>Grand Total</span>
                    <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="promo-input-form">
                    <div className="promo-input-wrapper">
                      <FaTicketAlt className="promo-icon" />
                      <input 
                        type="text" 
                        placeholder="Apply Promo Code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                      />
                      <button type="submit" disabled={promoApplied}>
                        {promoApplied ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                    {promoError && <p className="promo-error">{promoError}</p>}
                    {promoApplied && <p className="promo-success">Promo code applied successfully!</p>}
                    {!promoApplied && (
                      <p className="promo-hint">Use code <strong>WELCOME10</strong> (10% off) or <strong>VKSTUDIO</strong> (15% off)</p>
                    )}
                  </form>

                  {/* Checkout CTA */}
                  <button onClick={handleCheckout} className="checkout-submit-btn">
                    Place Custom Order <FaArrowRight />
                  </button>
                  
                  <p className="checkout-trust-badge">
                    🔒 Safe & secure order booking. No advance payment required for custom fitting consultation.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Addtocart;