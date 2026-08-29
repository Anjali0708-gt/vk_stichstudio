import "./Services.css";

import {getServices} from  '../Api/Serviceapi'
import { getProducts } from "../Api/ProductApi";
import { useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaRing,
  FaTshirt,
  FaCut,
  FaSchool,
  FaRulerCombined,
} from "react-icons/fa";
import { useState, useEffect } from "react";

function Services() {
  const [loading,setLoading]=useState(false);
  const [services, setServices]=useState([]);
  const navigate = useNavigate();

  const fetchServices = async()=>
  {
    try
    {
      setLoading(true)
      const response = await getServices();
      const serviceList = Array.isArray(response.data)
        ? response.data
        : response.data?.services || response.data?.service || [];
      setServices(serviceList);
    }
    catch(e)
    {
      console.log("error in service fecthing",e.message)
    }
    finally
    {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

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