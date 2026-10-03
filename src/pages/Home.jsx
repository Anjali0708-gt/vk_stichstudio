import "./home.css";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../Api/ProductApi";
import { useEffect, useRef, useState } from "react";

import {
  FaTshirt,
  FaRulerCombined,
  FaTruck,
  FaCut,
  FaCalendarCheck,
  FaStar,
  FaPhoneAlt,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from "react-icons/fa";

import {
  MdCheckroom,
  MdDateRange,
  MdStraighten,
  MdContentCut,
  MdAutoAwesome,
} from "react-icons/md";


// ================= SERVICES =================

const services = [
  {
    id: 1,
    title: "Custom Tailoring",
    description: "Perfect fit, crafted just for you.",
    icon: <MdCheckroom />,
  },
  {
    id: 2,
    title: "Wedding & Occasion Wear",
    description: "Elegant outfits for your special moments.",
    icon: <MdAutoAwesome />,
  },
  {
    id: 3,
    title: "Formal Wear",
    description: "Sharp and comfortable styles for every occasion.",
    icon: <MdCheckroom />,
  },
  {
    id: 4,
    title: "Bulk & Uniform Orders",
    description:
      "Quality uniforms for schools, offices and organizations.",
    icon: <MdContentCut />,
  },
  {
    id: 5,
    title: "Book Appointment",
    description: "Schedule your fitting appointment with ease.",
    icon: <MdDateRange />,
  },
  {
    id: 6,
    title: "Home Measurement",
    description:
      "Get professionally measured from the comfort of your home.",
    icon: <MdStraighten />,
  },
];


// ================= FEATURES =================

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


// ================= REVIEWS =================

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


// ================= HOME =================

function Home() {
  const navigate = useNavigate();

  const [galleryImages, setGalleryImages] = useState([]);
  const galleryRef = useRef(null);


  // Fetch products
  useEffect(() => {
    fetchGalleryImages();
  }, []);


  const fetchGalleryImages = async () => {
    try {
      const res = await getProducts();

      console.log("Products:", res.data);

      setGalleryImages(res.data.products || []);
    } catch (error) {
      console.log("Gallery error:", error);
    }
  };


  // ================= SLIDER =================

  const scrollCollection = (direction) => {
    const slider = galleryRef.current;
    if (!slider) return;

    const card = slider.querySelector(".collection-card");
    const gap = Number.parseFloat(window.getComputedStyle(slider).columnGap) || 0;
    const distance = card ? card.getBoundingClientRect().width + gap : slider.clientWidth;

    slider.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  const slideLeft = () => {
    scrollCollection(-1);
  };


  const slideRight = () => {
    scrollCollection(1);
  };


  return (
    <div className="home">


      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-overlay">

          <span className="hero-small-title">
            VK STITCH STUDIO
          </span>

          <h1>
            Crafted for Your Story.
            <br />
            Tailored for Your Legacy.
          </h1>

          <p>
            Premium tailoring for weddings, business & special occasions.
          </p>

          <div className="hero-buttons">

            <button
              className="primary"
              onClick={() => navigate("/bookappointment")}
            >
              <FaCalendarCheck />
              Book Appointment
            </button>

            <button
              className="secondary"
              onClick={() => navigate("/gallery")}
            >
              Explore Collection
              <FaArrowRight />
            </button>

          </div>

        </div>

      </section>


      {/* ================= SERVICES ================= */}

      <section className="services-section">

        <div className="section-heading">

          <span className="heading-line"></span>

          <div>
            <span className="heading-small">
              WHAT WE OFFER
            </span>

            <h2>Our Services</h2>
          </div>

          <span className="heading-line"></span>

        </div>


        <div className="services-grid">

          {services.map((service) => (

            <div
              className="service-card"
              key={service.id}
              onClick={() => {
                if (service.title === "Book Appointment") {
                  navigate("/bookappointment");
                }
              }}
            >

              <div className="service-icon">
                {service.icon}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <div className="gold-decoration">
                <span></span>
                <b>◆</b>
                <span></span>
              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= DESIGNER COLLECTION ================= */}

      <section className="collection-section">

        <div className="section-heading">

          <span className="heading-line"></span>

          <div>
            <span className="heading-small">
              OUR LATEST WORK
            </span>

            <h2>Designer Collection</h2>
          </div>

          <span className="heading-line"></span>

        </div>


        <div className="collection-wrapper">

          {/* LEFT ARROW */}

          <button
            className="collection-arrow collection-arrow-left"
            aria-label="Scroll to previous products"
            onClick={slideLeft}
          >
            <FaChevronLeft />
          </button>


          {/* SLIDER */}

          <div
            className="collection-slider"
            ref={galleryRef}
          >

            {galleryImages.length > 0 ? (

              galleryImages.map((item) => (

                <div className="collection-card" key={item._id}>

  <img
    src={item.image}
    alt={item.name}
  />

  <div className="collection-overlay"></div>

  <button
    className="collection-name"
    onClick={() => navigate("/gallery")}
  >
    <span>{item.name}</span>
    <FaArrowRight />
  </button>

</div>
              ))

            ) : (

              <div className="empty-gallery">
                No products available.
              </div>

            )}

          </div>


          {/* RIGHT ARROW */}

          <button
            className="collection-arrow collection-arrow-right"
            aria-label="Scroll to next products"
            onClick={slideRight}
          >
            <FaChevronRight />
          </button>

        </div>


        {/* VIEW ALL */}

        <button
          className="collection-view-all"
          onClick={() => navigate("/gallery")}
        >
          View Full Collection
          <FaArrowRight />
        </button>

      </section>


      {/* ================= WHY CHOOSE US ================= */}

      <section className="section">

        <div className="section-heading">

          <span className="heading-line"></span>

          <div>
            <span className="heading-small">
              WHY VK STITCH STUDIO
            </span>

            <h2>Why Choose Us</h2>
          </div>

          <span className="heading-line"></span>

        </div>


        <div className="card-container">

          {features.map((feature, index) => (

            <div
              className="feature-card"
              key={index}
            >

              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.desc}</p>

            </div>

          ))}

        </div>

      </section>


      {/* ================= REVIEWS ================= */}

      <section className="reviews-section">

        <div className="section-heading">

          <span className="heading-line"></span>

          <div>
            <span className="heading-small">
              CLIENT STORIES
            </span>

            <h2>Customer Reviews</h2>
          </div>

          <span className="heading-line"></span>

        </div>


        <div className="card-container">

          {reviews.map((review, index) => (

            <div
              className="review-card"
              key={index}
            >

              <div className="stars">

                {[...Array(review.stars)].map(
                  (_, starIndex) => (
                    <FaStar key={starIndex} />
                  )
                )}

              </div>

              <p>
                "{review.text}"
              </p>

              <h4>
                — {review.name}
              </h4>

            </div>

          ))}

        </div>

      </section>


      {/* ================= CONTACT ================= */}

      <section className="contact-section">

        <div className="contact-content">

          <span className="heading-small">
            LET'S CREATE SOMETHING SPECIAL
          </span>

          <h2>
            Your Perfect Fit
            <br />
            Starts Here.
          </h2>

          <p>
            Visit VK Stitch Studio and experience
            premium tailoring made especially for you.
          </p>

          <button
            className="primary"
            onClick={() => navigate("/bookappointment")}
          >
            <FaCalendarCheck />
            Book Your Fitting
          </button>

        </div>

      </section>

    </div>
  );
}

export default Home;