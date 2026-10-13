
import { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { addContact } from "../Api/ContactApi";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await addContact(formData);

      if (response.data.success === false) {
        throw new Error(
          response.data.message || "Failed to send your message."
        );
      }

      setStatus({
        type: "success",
        message:
          response.data.message ||
          "Thank you! Your message has been sent successfully.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          error.message ||
          "Unable to send your message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="vk-contact-page">
      <section className="contact-hero">
        <span className="contact-eyebrow">WE'RE HERE FOR YOU</span>
        <h1>Let's Talk <span>Style.</span></h1>
        <p>
          Have a question about custom tailoring, fittings, or your order?
          We'd love to hear from you.
        </p>
      </section>

      <section className="contact-container">
        <div className="contact-info">
          <span className="contact-eyebrow">GET IN TOUCH</span>
          <h2>Let's Create Something Perfect</h2>
          <p className="contact-description">
            From everyday essentials to your special occasion outfit,
            our team is ready to help you find the perfect fit.
          </p>

          <div className="contact-info-item">
            <div className="contact-icon">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3>Visit Our Studio</h3>
              <p>VK Stitch Studio</p>
              <p>Contact us for our shop location.</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">
              <FaEnvelope />
            </div>
            <div>
              <h3>Email Us</h3>
              <p>Send us your questions using the contact form.</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">
              <FaPhoneAlt />
            </div>
            <div>
              <h3>Need Assistance?</h3>
              <p>Send a message and our team can get back to you.</p>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <h2>Send Us a Message</h2>
          <p className="contact-form-subtitle">
            Fill in the details below and we'll receive your message.
          </p>

          {status.message && (
            <div
              className={`contact-alert ${status.type}`}
              role="status"
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="contact-field">
              <label htmlFor="contact-name">Full Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={254}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Your Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell us how we can help..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                minLength={5}
                maxLength={3000}
              />
            </div>

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={loading}
            >
              {loading ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Contact;
