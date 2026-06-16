import "./Home.css";

function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Crafted for Your Story</h1>
          <p>
            Premium custom tailoring for weddings, business wear,
            and special occasions.
          </p>

          <div className="hero-buttons">
            <button>Book Appointment</button>
            <button className="secondary">Explore Collection</button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <h2>Why Choose Us</h2>

        <div className="card-container">
          <div className="card">
            <h3>Premium Fabrics</h3>
            <p>Only the finest materials for lasting quality.</p>
          </div>

          <div className="card">
            <h3>Perfect Fit</h3>
            <p>Precise measurements for unmatched comfort.</p>
          </div>

          <div className="card">
            <h3>Expert Tailors</h3>
            <p>Years of craftsmanship in every stitch.</p>
          </div>

          <div className="card">
            <h3>Fast Delivery</h3>
            <p>Get your outfit delivered on time.</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section gray">
        <h2>Our Services</h2>

        <div className="card-container">
          <div className="card">Custom Suits</div>
          <div className="card">Wedding Wear</div>
          <div className="card">Blazers</div>
          <div className="card">Alterations</div>
          <div className="card">Business Wear</div>
          <div className="card">Traditional Wear</div>
        </div>
      </section>

      {/* Collection */}
      <section className="section">
        <h2>Designer Collection</h2>

        <div className="gallery">
          <img
            src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518"
            alt=""
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="section gray">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">1. Book Consultation</div>
          <div className="step">2. Take Measurements</div>
          <div className="step">3. Choose Fabric</div>
          <div className="step">4. Tailoring Process</div>
          <div className="step">5. Delivery</div>
        </div>
      </section>

      {/* Measurement */}
      <section className="section">
        <h2>Measurement Process</h2>

        <p className="center">
          Accurate measurements ensure a perfect fit every time.
        </p>

        <div className="measurements">
          <span>Neck</span>
          <span>Chest</span>
          <span>Waist</span>
          <span>Shoulder</span>
          <span>Sleeve</span>
          <span>Hip</span>
        </div>
      </section>

      {/* Reviews */}
      <section className="section gray">
        <h2>Customer Reviews</h2>

        <div className="card-container">
          <div className="card">
            ⭐⭐⭐⭐⭐
            <p>Best fitting suit I've ever owned.</p>
          </div>

          <div className="card">
            ⭐⭐⭐⭐⭐
            <p>Amazing quality and service.</p>
          </div>

          <div className="card">
            ⭐⭐⭐⭐⭐
            <p>Perfect wedding suit. Highly recommended.</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section">
        <h2>Gallery</h2>

        <div className="gallery">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
            alt=""
          />
        </div>
      </section>

      {/* Contact */}
      <section className="section gray">
        <h2>Contact Us</h2>

        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>

          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <h3>VK Stitch Studio</h3>
        <p>Premium Tailoring & Custom Fashion</p>
        <p>© 2026 All Rights Reserved</p>
      </footer>

    </div>
  );
}

export default Home;