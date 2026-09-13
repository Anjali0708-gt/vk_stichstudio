import "./Home.css";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../Api/ProductApi";

import { useState,useEffect } from "react";
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

import {
  MdCheckroom,
  MdDateRange,
  MdStraighten,
  MdStar,
  MdContentCut,
  MdAutoAwesome,
} from "react-icons/md";



const services = [
  {
    id: 1,
    title: "Custom Tailoring",
    description: "Perfect fit, crafted just for you.",
    icon: <MdCheckroom size={48} />,
  },
  {
    id: 2,
    title: "Wedding & Occasion Wear",
    description: "Elegant outfits for your special moments.",
    icon: <MdAutoAwesome size={48} />,
  },
  {
    id: 3,
    title: "Formal Wear",
    description: "Sharp and comfortable styles for every occasion.",
    icon: <MdCheckroom size={48} />,
  },
  {
    id: 4,
    title: "Bulk & Uniform Orders",
    description: "Quality uniforms for schools, offices and organizations.",
    icon: <MdContentCut size={48} />,
  },
  {
    id: 5,
    title: "Book Appointment",
    description: "Schedule your fitting appointment with ease.",
    icon: <MdDateRange size={48} />,
  },
  {
    id: 6,
    title: "Home Measurement",
    description: "Get professionally measured from the comfort of your home.",
    icon: <MdStraighten size={48} />,
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
  
  const [galleryImages,setgalleryImages]=useState([])


    useEffect(() => {
    
    fetchgalleryImages();
  }, []);

  

  
  const fetchgalleryImages = async () => {
    try {
      const res = await getProducts();
       console.log(res.data)
      setgalleryImages(res.data.products);
        }
         catch (e) {
      console.log(e);
    }
  };



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
      {/* SERVICES */}
<section className="services-section">

  {/* Heading */}
  <div className="services-heading">
    <div className="services-heading-row">
      <span className="gold-line"></span>

      <h2 className="services-title">OUR SERVICE</h2>
      <span className="gold-line"></span>
    </div>


    
  </div>
  <br />

  {/* Services Grid */}
  <div className="services-grid">
    {services.map((service) => (
      <div className="service-card" key={service.id}>
        <div className="service-icon-wrapper">
          <div className="service-icon">{service.icon}</div>
        </div>

        <h3 className="service-title">{service.title}</h3>
        <p className="service-description">{service.description}</p>

        <div className="service-divider">
          <span className="divider-line"></span>
          <span className="divider-dot"></span>
          <span className="divider-line"></span>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* GALLERY */}
      <section className="section">
        <h2>Designer Collection</h2>

        <div className="gallery">
          {galleryImages.map((item, i) => (
           <img
      key={item._id}
      src={item.image}
      alt={item.name}
    />
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