
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaCheckCircle, FaShoppingBag } from "react-icons/fa";
import "./PaymentSucess.css";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    if (!sessionId) {
      setStatus("invalid");
      return;
    }

    // This page confirms the redirect only.
    // Verify the actual payment with your backend.
    setStatus("success");
  }, [sessionId]);

  if (status === "invalid") {
    return (
      <div className="payment-result">
        <div className="payment-card">
          <h2>Invalid Payment Session</h2>
          <p>We couldn't find your Stripe checkout session.</p>
          <button onClick={() => navigate("/cart")}>
            Return to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-result">
      <div className="payment-card">
        <FaCheckCircle className="success-icon" />

        <h1>Payment Successful!</h1>

        <p className="success-message">
          Thank you for shopping with VK Stitch Studio.
          Your payment confirmation is being processed.
        </p>

        <div className="payment-info">
          <span>Payment reference</span>
          <p>{sessionId}</p>
        </div>

        <p className="order-message">
          Your order will be confirmed after payment verification.
        </p>

        <button
          className="continue-button"
          onClick={() => navigate("/")}
        >
          <FaShoppingBag /> Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
