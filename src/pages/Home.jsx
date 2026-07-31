import "./Home.css";
import { useNavigate } from "react-router-dom";
import {
  FaTshirt,
  FaRulerCombined,
  FaTruck,
  FaCut,
  FaUserTie,
  FaCalendarCheck,
  FaStar,
  FaPhoneAlt,
} from "react-icons/fa";

const services = [
  {
    name: "Custom Suits",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
  },
  {
    name: "Wedding Wear",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  },
  {
    name: "Blazers",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc",
  },
  {
    name: "Alterations",
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
  {
    name: "Business Wear",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
  },
  {
    name: "Traditional Wear",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
  },
];

const features = [
  {
    title: "Premium Fabrics",
    desc: "Only the finest materials for lasting quality.",
    icon: <FaTshirt />,
  },
  {
    title: "Perfect Fit",
    desc: "Precise measurements for unmatched comfort.",
    icon: <FaRulerCombined />,
  },
  {
    title: "Expert Tailors",
    desc: "Years of craftsmanship in every stitch.",
    icon: <FaCut />,
  },
  {
    title: "Fast Delivery",
    desc: "On-time delivery guaranteed.",
    icon: <FaTruck />,
  },
];

const steps = [
  { title: "Book Consultation", icon: <FaCalendarCheck /> },
  { title: "Take Measurements" },
  { title: "Choose Fabric" },
  { title: "Tailoring Process" },
  { title: "Delivery" },
];

const reviews = [
  {
    name: "Rahul Sharma",
    text: "Best fitting suit I've ever owned.",
    stars: 5,
  },
  {
    name: "Aman Verma",
    text: "Amazing quality and service.",
    stars: 5,
  },
  {
    name: "Vikram Singh",
    text: "Perfect wedding suit. Highly recommended.",
    stars: 5,
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
  "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Crafted for Your Story</h1>
          <p>
            Premium tailoring for weddings, business & special occasions
          </p>

          <div className="hero-buttons">
            <button
              className="primary"
              onClick={() => navigate("/bookappointment")}
            >
              <FaCalendarCheck /> Book Appointment
            </button>

            <button className="secondary" onClick={() => navigate("/gallery")}>
              Explore Collection
            </button>
          </div>
        </div>
      </section>

      
      {/* SERVICES */}
      <section className="section gray">
        <h2>Our Services</h2>

        <div className="service-grid">
          {services.map((item, i) => (
            <div className="service-card" key={i}>
              <div className="service-image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="service-overlay">
                <h3>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="section">
        <h2>Designer Collection</h2>

        <div className="gallery">
          {galleryImages.map((img, i) => (
            <img key={i} src={img} alt="collection" />
          ))}
        </div>
      </section>
{/* 
      
      <section className="section gray">
        <h2>How It Works</h2>

        <div className="steps">
          {steps.map((s, i) => (
            <div className="step" key={i}>
              <span className="step-number">{i + 1}</span>
              <span>{s.title}</span>
            </div>
          ))}
        </div>
      </section> */}
       
       {/* FEATURES */}
      <section className="section">
        <h2>Why Choose Us</h2>

        <div className="card-container">
          {features.map((f, i) => (
            <div className="card" key={i}>
              <div className="icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* REVIEWS */}
      <section className="section">
        <h2>Customer Reviews</h2>

        <div className="card-container">
          {reviews.map((r, i) => (
            <div className="card review-card" key={i}>
              <div className="stars">
                {[...Array(r.stars)].map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>

              <p>{r.text}</p>
              <h4>- {r.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section gray">
        <h2>Contact Us</h2>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>

          <button type="submit">
            <FaPhoneAlt /> Send Message
          </button>
        </form>
      </section>

    </div>
  );
}

export default Home;