import "./Services.css";
import { useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaRing,
  FaTshirt,
  FaCut,
  FaSchool,
  FaRulerCombined,
} from "react-icons/fa";

function Services() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Custom Tailoring",
      icon: <FaUserTie />,
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      description:
        "Bespoke suits and garments crafted according to your body measurements and personal style.",
      price: "₹2,999",
      delivery: "5-7 Days",
    },
    {
      title: "Wedding & Bridal Wear",
      icon: <FaRing />,
      image:
        "https://images.unsplash.com/photo-1525258946800-98cfd641d0de",
      description:
        "Luxury bridal dresses, sherwanis, lehengas, and wedding outfits designed to perfection.",
      price: "₹7,999",
      delivery: "10-15 Days",
    },
    {
      title: "Formal Suits & Blazers",
      icon: <FaUserTie />,
      image:
        "https://images.unsplash.com/photo-1593032465171-8f7b9f36b66f",
      description:
        "Premium business suits and blazers tailored for corporate professionals.",
      price: "₹4,999",
      delivery: "7 Days",
    },
    {
      title: "Women's Designer Wear",
      icon: <FaTshirt />,
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
      description:
        "Custom gowns, dresses, ethnic wear, and fashion garments designed uniquely for you.",
      price: "₹3,499",
      delivery: "5-10 Days",
    },
    {
      title: "Alteration & Repair",
      icon: <FaCut />,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      description:
        "Professional resizing, repairs, hemming, zipper replacement, and fitting adjustments.",
      price: "₹299",
      delivery: "1-2 Days",
    },
    {
      title: "Uniform Stitching",
      icon: <FaSchool />,
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
      description:
        "Customized uniforms for schools, colleges, hospitals, offices, and organizations.",
      price: "₹499",
      delivery: "Bulk Orders Available",
    },
  ];

  return (
    <div className="services-page">

      {/* HERO SECTION */}
      <section className="service-hero">
        <h1>Premium Tailoring Services</h1>
        <p>
          From bespoke suits to bridal wear, we deliver exceptional
          craftsmanship, precision fitting, and unmatched quality.
        </p>
      </section>

      {/* STATS */}
      <section className="service-stats">
        <div className="stat-box">
          <h2>10+</h2>
          <p>Years Experience</p>
        </div>

        <div className="stat-box">
          <h2>5000+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat-box">
          <h2>100%</h2>
          <p>Perfect Fit Guarantee</p>
        </div>

        <div className="stat-box">
          <h2>24/7</h2>
          <p>Customer Support</p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>

            {/* IMAGE WITH OVERLAY */}
            <div className="service-image">
              <img
                src={service.image}
                alt={service.title}
              />

              <div className="image-overlay">
                <span className="service-tag">
                  Premium Service
                </span>

                <h3>{service.title}</h3>

                <p>
                  Starting From {service.price}
                </p>
              </div>
            </div>

            {/* CONTENT */}
            <div className="card-content">

              <div className="service-icon">
                {service.icon}
              </div>

              <p>{service.description}</p>

              <div className="service-info">
                <span>
                  <strong>Delivery:</strong>{" "}
                  {service.delivery}
                </span>
              </div>

              <button
                className="book-btn"
                onClick={() =>
                  navigate("/bookappointment")
                }
              >
                <FaRulerCombined />
                Book Appointment
              </button>
            </div>

          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="service-cta">
        <h2>Ready for a Perfect Fit?</h2>

        <p>
          Schedule a consultation with our expert
          tailors today.
        </p>

        <button
          onClick={() =>
            navigate("/bookappointment")
          }
        >
          Book Your Appointment
        </button>
      </section>

    </div>
  );
}

export default Services;