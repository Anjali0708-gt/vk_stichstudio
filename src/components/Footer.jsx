import "./Footer.css";
import { FaFacebook, FaInstagram, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Company Info */}
        <div className="footer-section">
          <h2>VK Stich Studio</h2>
          <p>
            Creating perfectly tailored garments with precision,
            craftsmanship, and attention to every detail.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/service">Services</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>Our Services</h3>
          <ul>
            <li>Custom Tailoring</li>
            <li>Bridal Wear</li>
            <li>Men's Suits</li>
            <li>Alteration Services</li>
            <li>Uniform Stitching</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>

          <p>
            <MdLocationOn /> Karimpur, West Bengal
          </p>

          <p>
            <FaPhoneAlt /> +91 9876543210
          </p>

          <p>
            <MdEmail /> info@vkstichstudio.com
          </p>

          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaWhatsapp /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 VK Stich Studio. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;