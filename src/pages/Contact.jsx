import { useState } from 'react';
import { contactService } from '../services/contactService';
import './Contact.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ status: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ status: '', message: '' });

    try {
      const result = await contactService.submitContactForm(formData);
      if (result.success) {
        setFeedback({ status: 'success', message: result.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      setFeedback({ status: 'error', message: error.message || 'Failed to send message.' });
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Our Studio",
      detail: "Karimpur, West Bengal, India",
      desc: "Visit us for fabric viewings and fittings."
    },
    {
      icon: <FaPhoneAlt />,
      title: "Phone & WhatsApp",
      detail: "+91 9876543210",
      desc: "Mon-Sat from 10am to 7pm."
    },
    {
      icon: <FaEnvelope />,
      title: "Email Queries",
      detail: "info@vkstichstudio.com",
      desc: "We reply within 24 hours."
    },
    {
      icon: <FaClock />,
      title: "Opening Hours",
      detail: "10:00 AM - 08:00 PM",
      desc: "Sunday Closed."
    }
  ];

  return (
    <div className="contact-page">
      {/* Page Header */}
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <h1>Get In Touch</h1>
          <p>
            Have a design in mind or want to consult on bespoke wedding fittings? Message us or visit our studio directly.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="contact-main-section">
        <div className="contact-grid-layout">
          
          {/* Left Side: Info Cards */}
          <div className="contact-info-cards-column">
            <h2>Contact Information</h2>
            <div className="info-cards-list">
              {contactDetails.map((item, idx) => (
                <div key={idx} className="info-detail-card">
                  <span className="info-card-icon">{item.icon}</span>
                  <div className="info-card-text">
                    <h3>{item.title}</h3>
                    <p className="info-main-detail">{item.detail}</p>
                    <p className="info-secondary-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Message Form */}
          <div className="contact-form-card-column">
            <h2>Send Us a Message</h2>
            
            {feedback.message && (
              <div className={`contact-alert ${feedback.status}`}>
                {feedback.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-interactive-form">
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label htmlFor="c-name">Your Name</label>
                  <input
                    type="text"
                    id="c-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="c-email">Email Address</label>
                  <input
                    type="email"
                    id="c-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div className="contact-form-group">
                <label htmlFor="c-subject">Subject</label>
                <input
                  type="text"
                  id="c-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What is this inquiry about?"
                  required
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="c-message">Message / Design Requests</label>
                <textarea
                  id="c-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your design specifications or fitting queries here..."
                  required
                />
              </div>

              <button type="submit" className="contact-submit-btn" disabled={loading}>
                {loading ? 'Sending Message...' : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Map Placeholder Section */}
      <section className="studio-map-section">
        <div className="map-card-wrapper">
          <div className="map-placeholder-info">
            <h3>Find Our Studio in Karimpur</h3>
            <p>Our tailoring house is fully equipped with high-end fabric books and design rooms. Drop in for a coffee and discuss your dream suit/dress.</p>
          </div>
          {/* Styled dummy map visualization */}
          <div className="styled-dummy-map">
            <div className="map-pin">📍</div>
            <div className="map-pulse"></div>
            <span>VK STICH STUDIO, Karimpur, West Bengal</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;