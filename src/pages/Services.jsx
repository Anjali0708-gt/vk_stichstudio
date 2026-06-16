import "./Services.css";

function Services() {
  const services = [
    {
      title: "Custom Tailoring",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      description:
        "Perfectly fitted garments crafted according to your measurements and style."
    },
    {
      title: "Wedding & Bridal Wear",
      image:
        "https://images.unsplash.com/photo-1525258946800-98cfd641d0de",
      description:
        "Elegant bridal outfits and wedding attire tailored with precision."
    },
    {
      title: "Men's Formal Suits",
      image:
        "https://images.unsplash.com/photo-1593032465171-8f7b9f36b66f",
      description:
        "Premium suits designed for business meetings and special occasions."
    },
    {
      title: "Women's Designer Wear",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
      description:
        "Custom-designed dresses, gowns, and ethnic wear tailored to perfection."
    },
    {
      title: "Alteration & Repair",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      description:
        "Professional alteration services to ensure the perfect fit."
    },
    {
      title: "Uniform Stitching",
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
      description:
        "Customized uniforms for schools, offices, and organizations."
    }
  ];

  return (
    <div className="services-page">
      <section className="service-hero">
        <h1>Our Services</h1>
        <p>
          Expert tailoring solutions crafted with precision, elegance,
          and attention to every detail.
        </p>
      </section>

      <section className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} />
            <div className="card-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Services;