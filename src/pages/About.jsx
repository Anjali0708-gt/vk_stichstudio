import "./About.css";

function About() {
  const stats = [
    { number: "15+", label: "Years of Heritage" },
    { number: "12,000+", label: "Garments Tailored" },
    { number: "25+", label: "Master Craftsmen" },
    { number: "99.8%", label: "Fit Satisfaction" }
  ];

  const values = [
    {
      title: "Bespoke Precision",
      description: "Every millimeter is measured and cut with absolute precision, ensuring a garment that drapes naturally and feels like a second skin.",
      icon: "📏"
    },
    {
      title: "Luxury Fabrics",
      description: "We source only the finest fabrics from global mills, including high-twist merino wool, Egyptian cotton, and pure silk fabrics.",
      icon: "🧵"
    },
    {
      title: "Heritage Craftsmanship",
      description: "Our tailors combine traditional hand-stitching techniques with modern drafting software to create timeless wardrobe staples.",
      icon: "✨"
    },
    {
      title: "Personal Collaboration",
      description: "We work directly with you through dedicated fitting sessions to refine designs and choose details that reflect your signature style.",
      icon: "🤝"
    }
  ];

  const team = [
    {
      name: "Vikram Kumar",
      role: "Founder & Master Tailor",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Sophia Rossi",
      role: "Lead Fashion Designer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Rajesh Patel",
      role: "Senior Cutter & Drapist",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="about-page">
      {/* Luxury Hero Banner */}
      <section className="about-hero-section">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <span className="hero-tag">OUR HERITAGE</span>
          <h1>Elegance In Every Stitch</h1>
          <p>
            VK Stich Studio is dedicated to the art of luxury bespoke tailoring. We believe that a perfectly fitted outfit has the power to transform not just how you look, but how you present yourself to the world.
          </p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section">
        <div className="section-header">
          <h2>Our Philosophy</h2>
          <div className="header-divider"></div>
          <p className="section-sub">The principles that guide our needles and define our quality standard.</p>
        </div>
        <div className="values-grid">
          {values.map((val, idx) => (
            <div key={idx} className="value-card">
              <span className="value-icon">{val.icon}</span>
              <h3>{val.title}</h3>
              <p>{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative Section - Image & Text */}
      <section className="story-narrative-section">
        <div className="narrative-grid">
          <div className="narrative-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800" 
              alt="Tailor cutting fabric" 
              className="narrative-img"
            />
            <div className="narrative-badge">
              <span className="badge-years">EST.</span>
              <span className="badge-year">2011</span>
            </div>
          </div>
          <div className="narrative-text">
            <span>THE LEGACY</span>
            <h2>How It Began</h2>
            <p>
              Founded in 2011, VK Stich Studio started as a small, passionate tailoring shop dedicated to restoring the custom sartorial traditions of Karimpur. Our focus has always been simple: zero compromises on fit, fabric, and handcraft quality.
            </p>
            <p>
              By combining classic pattern drafting with state-of-the-art styling guides, we created a service where luxury is accessible and highly personalized. Today, we cater to bridal fittings, executive business wear, and custom celebrations, serving clients across the region with distinction.
            </p>
          </div>
        </div>
      </section>

      {/* Creative Team Section */}
      <section className="team-section">
        <div className="section-header">
          <h2>Meet The Craftsmen</h2>
          <div className="header-divider"></div>
          <p className="section-sub">The design visionaries and master tailors behind your custom fits.</p>
        </div>
        <div className="team-grid">
          {team.map((member, idx) => (
            <div key={idx} className="team-card">
              <div className="team-img-container">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workshop Gallery Section */}
      <section className="workshop-gallery-section">
        <div className="section-header">
          <h2>Inside The Workshop</h2>
          <div className="header-divider"></div>
          <p className="section-sub">Where concepts are drafted, patterns are chalked, and outfits come to life.</p>
        </div>
        <div className="workshop-gallery-grid">
          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600"
            alt="Tailor measuring sleeve length"
          />
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600"
            alt="Luxury tailoring fabrics rolled"
          />
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600"
            alt="Finished tailored suit jackets hanging"
          />
        </div>
      </section>
    </div>
  );
}

export default About;