import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { getProductById } from "../Api/ProductApi";
import {
  getProductReviews,
  addReview
} from "../Api/ReviewApi";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [rating, setRating] = useState(5);
  const [user, setUser] = useState("");
const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await getProductById(id);

        setProduct(response.data.product);

        // Default first size/color
        setSelectedSize(response.data.product.sizes?.[0] || "");
        setSelectedColor(response.data.product.colors?.[0] || "");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Get reviews for THIS product
  useEffect(() => {
    const fetchReviews = async () => {
      try {
    const response = await getProductReviews(id);

setReviews(response.data.reviews || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [id]);

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }
 
 const handleSubmitReview = async (e) => {
  e.preventDefault();

  if (!user || !comment) {
    alert("Please enter your name and comment");
    return;
  }

  try {
    const response = await addReview(id, {
      user: user,
      rating: Number(rating),
      comment: comment,
    });

    // Add newly created review to frontend immediately
    setReviews((prevReviews) => [
      response.data.review,
      ...prevReviews,
    ]);

    // Clear form
    setUser("");
    setRating(5);
    setComment("");

    alert("Review added successfully!");

  } catch (error) {
    console.log("Review error:", error);

    alert(
      error.response?.data?.message ||
      "Failed to add review"
    );
  }
};

  return (
    <div className="product-detail-page">

      {/* PRODUCT SECTION */}
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

          <div className="product-rating">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />

            <span>
              ({reviews.length} Reviews)
            </span>
          </div>

          <h2>
            ₹{product.price.toLocaleString("en-IN")}
          </h2>

          <p className="description">
            {product.description}
          </p>

          {/* COLORS */}
          {product.colors?.length > 0 && (
            <div className="selection-box">

              <h3>Color</h3>

              <div className="color-options">

                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={
                      selectedColor === color
                        ? "color-btn selected"
                        : "color-btn"
                    }
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}

              </div>

            </div>
          )}

          {/* SIZES */}
          {product.sizes?.length > 0 && (
            <div className="selection-box">

              <h3>Size</h3>

              <div className="size-options">

                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={
                      selectedSize === size
                        ? "size-btn selected"
                        : "size-btn"
                    }
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}

              </div>

            </div>
          )}

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          <button className="add-to-cart-btn">
            <FaShoppingCart />
            Add to Cart
          </button>

        </div>

      </section>


      {/* REVIEWS */}
      <section className="reviews-section">

        <h2>Customer Reviews</h2>

        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review this product.</p>
        ) : (
          reviews.map((review) => (

            <div className="review-card" key={review._id}>

              <div className="review-header">

                <strong>{review.user}</strong>

                <div className="review-stars">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= review.rating
                          ? "star-filled"
                          : "star-empty"
                      }
                    />
                  ))}

                </div>

              </div>

              <p>{review.comment}</p>

              <small>
                {new Date(review.createdAt).toLocaleDateString()}
              </small>

            </div>
          

          ))
        )}

      </section>
      <div className="review-form-container">

  <h2>Submit Your Review</h2>

  <form
    onSubmit={handleSubmitReview}
    className="review-form"
  >

    <div className="form-group">
      <label>User Name</label>

      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Enter your name"
      />
    </div>


    <div className="form-group">
      <label>Rating</label>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value={5}>★★★★★ - 5</option>
        <option value={4}>★★★★ - 4</option>
        <option value={3}>★★★ - 3</option>
        <option value={2}>★★ - 2</option>
        <option value={1}>★ - 1</option>
      </select>
    </div>


    <div className="form-group">
      <label>Comment</label>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        rows="5"
      />
    </div>


    <button type="submit" className="submit-review-btn">
      Submit Review
    </button>

  </form>

</div>

    </div>
  );
}

export default ProductDetail;