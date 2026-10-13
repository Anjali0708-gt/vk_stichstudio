
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getProducts } from "../Api/ProductApi";
import "./SearchResults.css";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getProducts(query);
        const data = response.data;

        if (!cancelled) {
          setProducts(
            Array.isArray(data) ? data : data.products || []
          );
        }
      } catch (err) {
        if (!cancelled) {
          setProducts([]);
          setError("Unable to load products. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <main className="search-results-page">
      <h1>Search Results</h1>
      <p>Results for: "{query}"</p>

      {loading && <p>Searching products...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>No products found. Try another search.</p>
      )}

      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product._id}>
            <img
              src={product.image}
              alt={product.name}
            />

            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>₹{product.price}</p>

            <Link to={`/product/${product._id}`}>
              View Product
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

export default SearchResults;
