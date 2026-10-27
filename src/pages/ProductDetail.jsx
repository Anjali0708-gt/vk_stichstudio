
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaStar,
  FaShoppingCart,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import { getProductById } from "../Api/ProductApi";
import {
  getProductReviews,
  addReview,
} from "../Api/ReviewApi";

import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [rating, setRating] = useState(5);
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  // Review pagination
  const [currentReviewPage, setCurrentReviewPage] = useState(1);

  // Four reviews per page on desktop.
  // CSS controls how many cards fit across each row.
  const reviewsPerPage = 4;

  const totalReviewPages = Math.ceil(
    reviews.length / reviewsPerPage
  );

  const startIndex =
    (currentReviewPage - 1) * reviewsPerPage;

  const currentReviews = reviews.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  const handleReviewPageChange = (page) => {
    if (page >= 1 && page <= totalReviewPages) {
      setCurrentReviewPage(page);
    }
  };

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await getProductById(id);
        const productData = response.data?.product;

        setProduct(productData || null);
        setSelectedSize(productData?.sizes?.[0] || "");
        setSelectedColor(productData?.colors?.[0] || "");
      } catch (error) {
        console.error(
          "Product fetch error:",
          error.response?.data || error.message
        );

        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getProductReviews(id);
        const fetchedReviews = response.data?.reviews || [];

        setReviews(fetchedReviews);
        setCurrentReviewPage(1);
      } catch (error) {
        console.error(
          "Review fetch error:",
          error.response?.data || error.message
        );

        setReviews([]);
        setCurrentReviewPage(1);
      }
    };

    if (id) fetchReviews();
  }, [id]);

  // Submit review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    setReviewError("");
    setReviewMessage("");

    if (!user.trim() || !comment.trim()) {
      setReviewError("Please enter your name and review.");
      return;
    }

    try {
      setReviewLoading(true);

      const response = await addReview(id, {
        user: user.trim(),
        rating: Number(rating),
        comment: comment.trim(),
      });

      if (!response.data?.review) {
        throw new Error("The review could not be saved.");
      }

      // Add the newest review to the beginning.
      const updatedReviews = [
        response.data.review,
        ...reviews,
      ];

      setReviews(updatedReviews);

      // Show the newest review on the first page.
      setCurrentReviewPage(1);

      setUser("");
      setRating(5);
      setComment("");

      setReviewMessage(
        "Your review was submitted successfully!"
      );
    } catch (error) {
      setReviewError(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit your review."
      );
    } finally {
      setReviewLoading(false);
    }
  };

  // Add-to-cart placeholder
  const handleAddToCart = () => {
    if (Number(product.stock || 0) <= 0) return;

    if (product.sizes?.length > 0 && !selectedSize) {
      setCartMessage("Please select a size.");
      return;
    }

    if (product.colors?.length > 0 && !selectedColor) {
      setCartMessage("Please select a color.");
      return;
    }

    setCartMessage(
      "Your selection is ready. Connect your CartContext to add it to your cart."
    );
  };

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN");

  // Loading
  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="detail-status">
          Loading product details...
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="detail-status">
          <h2>Product not found</h2>
          <p>
            This product may have been removed or is unavailable.
          </p>

          <button
            type="button"
            className="explore-btn"
            onClick={() => navigate("/")}
          >
            <FaArrowLeft />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const stock = Number(product.stock || 0);

  const averageRating = reviews.length
    ? reviews.reduce(
        (total, review) =>
          total + Number(review.rating || 0),
        0
      ) / reviews.length
    : 0;

  return (
    <div className="product-detail-page">

      {/* BACK NAVIGATION */}
      <div className="detail-topbar">
        <button
          type="button"
          className="back-link"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Back to Products
        </button>
      </div>

      {/* PRODUCT DETAILS */}
      <section className="product-detail">

        <div className="product-detail-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-detail-info">

          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          {/* PRODUCT RATING */}
          <div className="product-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={
                  star <= Math.round(averageRating)
                    ? "star-filled"
                    : "star-empty"
                }
              />
            ))}

            <span>
              ({reviews.length}{" "}
              {reviews.length === 1 ? "Review" : "Reviews"})
            </span>
          </div>

          <h2>₹{formatPrice(product.price)}</h2>

          <p className="description">
            {product.description ||
              "Discover premium craftsmanship and quality tailoring."}
          </p>

          {/* COLOR SELECTION */}
          {product.colors?.length > 0 && (
            <div className="selection-box">
              <h3>
                Color: <span>{selectedColor}</span>
              </h3>

              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-btn ${
                      selectedColor === color ? "selected" : ""
                    }`}
                    aria-pressed={selectedColor === color}
                    onClick={() => {
                      setSelectedColor(color);
                      setCartMessage("");
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SIZE SELECTION */}
          {product.sizes?.length > 0 && (
            <div className="selection-box">
              <h3>
                Size: <span>{selectedSize}</span>
              </h3>

              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`size-btn ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    aria-pressed={selectedSize === size}
                    onClick={() => {
                      setSelectedSize(size);
                      setCartMessage("");
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STOCK */}
          <p className="stock-line">
            <strong>Availability:</strong>{" "}
            <span className={stock > 0 ? "in-stock" : "out-stock"}>
              {stock > 0
                ? `${stock} available`
                : "Out of stock"}
            </span>
          </p>

          {/* ADD TO CART */}
          <button
            type="button"
            className="add-to-cart-btn"
            disabled={stock <= 0}
            onClick={handleAddToCart}
          >
            <FaShoppingCart />
            {stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>

          {cartMessage && (
            <p role="status" aria-live="polite">
              {cartMessage}
            </p>
          )}
        </div>
      </section>

      {/* CUSTOMER REVIEWS WITH PAGINATION */}
      <section className="reviews-section">
        <h2>Customer Reviews</h2>

        {currentReviews.length > 0 ? (
          currentReviews.map((review, index) => (
            <article
              className="review-card"
              key={
                review._id ||
                `${review.createdAt || "review"}-${startIndex + index}`
              }
            >
              <div className="review-header">
                <strong>
                  {review.user || review.name || "Anonymous"}
                </strong>

                <div
                  className="review-stars"
                  aria-label={`${Number(review.rating || 0)} out of 5 stars`}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= Number(review.rating || 0)
                          ? "star-filled"
                          : "star-empty"
                      }
                    />
                  ))}
                </div>
              </div>

              <p>{review.comment}</p>

              <small>
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : ""}
              </small>
            </article>
          ))
        ) : (
          <p className="no-reviews">
            No reviews yet. Be the first to review this product!
          </p>
        )}

        {/* PAGINATION CONTROLS */}
        {totalReviewPages > 0 && (
          <nav
            className="review-pagination"
            aria-label="Review pages"
          >
            <button
              type="button"
              className="page-arrow"
              onClick={() =>
                handleReviewPageChange(currentReviewPage - 1)
              }
              disabled={currentReviewPage === 1}
              aria-label="Previous review page"
            >
              &lt;
            </button>

            {Array.from(
              { length: totalReviewPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={`page-number ${
                  currentReviewPage === page ? "active" : ""
                }`}
                onClick={() => handleReviewPageChange(page)}
                aria-current={
                  currentReviewPage === page ? "page" : undefined
                }
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="page-arrow"
              onClick={() =>
                handleReviewPageChange(currentReviewPage + 1)
              }
              disabled={currentReviewPage === totalReviewPages}
              aria-label="Next review page"
            >
              &gt;
            </button>
          </nav>
        )}
      </section>

      {/* BOTTOM PANELS */}
      <section className="detail-bottom">

        {/* WRITE A REVIEW */}
        <div className="detail-panel">
          <h2 className="panel-title">
            Write a Review
          </h2>

          {reviewMessage && (
            <p role="status" aria-live="polite">
              <FaCheckCircle /> {reviewMessage}
            </p>
          )}

          {reviewError && (
            <p role="alert">{reviewError}</p>
          )}

          <form
            className="review-form"
            onSubmit={handleSubmitReview}
          >
            <div className="form-group">
              <label htmlFor="review-user">
                Your Name
              </label>

              <input
                id="review-user"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Enter your name"
                required
                maxLength={80}
              />
            </div>

            <div className="form-group">
              <label htmlFor="review-rating">
                Your Rating
              </label>

              <select
                id="review-rating"
                value={rating}
                onChange={(e) =>
                  setRating(Number(e.target.value))
                }
              >
                <option value={5}>★★★★★ — Excellent</option>
                <option value={4}>★★★★ — Very Good</option>
                <option value={3}>★★★ — Good</option>
                <option value={2}>★★ — Fair</option>
                <option value={1}>★ — Poor</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="review-comment">
                Your Review
              </label>

              <textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                rows={5}
                required
                maxLength={1000}
              />
            </div>

            <button
              type="submit"
              className="submit-review-btn"
              disabled={reviewLoading}
            >
              {reviewLoading
                ? "Submitting..."
                : "Submit Review"}
            </button>
          </form>
        </div>

        {/* EXPLORE MORE */}
        <div className="detail-panel similar-panel">
          <h2 className="panel-title">
            Discover More
          </h2>

          <p className="description">
            Explore more styles and discover pieces crafted
            with attention to detail at VK Stitch Studio.
          </p>

          <button
            type="button"
            className="explore-btn"
            onClick={() => navigate("/")}
          >
            Explore Our Collection
            <FaArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
