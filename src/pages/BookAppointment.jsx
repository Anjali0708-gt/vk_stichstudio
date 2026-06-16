import { useState } from 'react';
import { bookingService } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';
import './BookAppointment.css';
import { FaUser, FaEnvelope, FaPhone, FaRuler, FaClock, FaCheckCircle } from 'react-icons/fa';

function BookAppointment() {
  const { currentUser, addBookingToState, isAuthenticated } = useAuth();
  
  // Step navigation: 1 = Service, 2 = Date & Time, 3 = Measurements, 4 = Contact & Confirm
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingResult, setBookingResult] = useState(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    service: 'Custom Suit Fitting',
    date: '',
    time: '11:00',
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    notes: '',
    // Measurements (optional/recommended)
    neck: '',
    chest: '',
    waist: '',
    shoulder: '',
    sleeve: '',
    hip: ''
  });

  const services = [
    { name: 'Custom Suit Fitting', duration: '60 mins', desc: 'Consultation, styling, and fabric choice for bespoke business/formal suits.' },
    { name: 'Bridal & Wedding Consultation', duration: '90 mins', desc: 'Bespoke designs and matching fabric consultations for couples.' },
    { name: 'Sherwani & Traditional Wear', duration: '60 mins', desc: 'Traditional tailoring for premium celebratory outfits.' },
    { name: 'Alterations & Repairs', duration: '30 mins', desc: 'Fit checks and professional alteration measurements.' }
  ];

  const timeSlots = [
    '10:00', '11:00', '12:00', '13:00', '14:30', '15:30', '16:30', '17:30'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (serviceName) => {
    setFormData(prev => ({ ...prev, service: serviceName }));
    setStep(2);
  };

  const validateStep2 = () => {
    if (!formData.date) {
      setError('Please select an appointment date.');
      return false;
    }
    setError('');
    return true;
  };

  const validateStep4 = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Name, Email, and Phone number are required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep4()) return;

    setLoading(true);
    setError('');

    try {
      const response = await bookingService.createBooking(formData, currentUser?.id);
      if (response.success) {
        setBookingResult(response.booking);
        // Add booking to local state if logged in
        if (isAuthenticated) {
          addBookingToState(response.booking);
        }
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (bookingResult) {
    return (
      <div className="booking-success-view">
        <div className="booking-success-card">
          <FaCheckCircle className="success-icon-big" />
          <h1>Appointment Reserved!</h1>
          <p className="booking-ref">Confirmation Code: <strong>{bookingResult.id}</strong></p>
          <div className="booking-details-box">
            <h3>Reservation Summary:</h3>
            <p><strong>Service:</strong> {bookingResult.service}</p>
            <p><strong>Date & Time:</strong> {bookingResult.date} at {bookingResult.time}</p>
            <p><strong>Client:</strong> {bookingResult.name}</p>
            <p><strong>Status:</strong> {bookingResult.status}</p>
          </div>
          <p className="success-note">
            A confirmation email has been sent. Please bring any fabric samples or design references you have to your fitting session at our studio.
          </p>
          <button onClick={() => {
            setStep(1);
            setBookingResult(null);
            setFormData(prev => ({ ...prev, date: '', phone: '', notes: '', neck: '', chest: '', waist: '', shoulder: '', sleeve: '', hip: '' }));
          }} className="new-booking-btn">
            Book Another Fitting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        {/* Progress Stepper Header */}
        <div className="stepper-header">
          <h1>Book a Fitting Session</h1>
          <p>Schedule a personal styling consultation at our premium studio.</p>
          <div className="stepper-dots">
            <span className={`dot ${step >= 1 ? 'active' : ''} ${step === 1 ? 'current' : ''}`}>1. Service</span>
            <span className="line"></span>
            <span className={`dot ${step >= 2 ? 'active' : ''} ${step === 2 ? 'current' : ''}`}>2. Date & Time</span>
            <span className="line"></span>
            <span className={`dot ${step >= 3 ? 'active' : ''} ${step === 3 ? 'current' : ''}`}>3. Measurements</span>
            <span className="line"></span>
            <span className={`dot ${step >= 4 ? 'active' : ''} ${step === 4 ? 'current' : ''}`}>4. Information</span>
          </div>
        </div>

        {error && <div className="booking-error-alert">{error}</div>}

        {/* STEP 1: SELECT SERVICE */}
        {step === 1 && (
          <div className="step-content">
            <h2>Select Consultation Service</h2>
            <div className="services-selector-grid">
              {services.map((srv) => (
                <div 
                  key={srv.name} 
                  className={`service-option-card ${formData.service === srv.name ? 'selected' : ''}`}
                  onClick={() => handleServiceSelect(srv.name)}
                >
                  <div className="service-card-meta">
                    <h3>{srv.name}</h3>
                    <span className="duration-tag"><FaClock /> {srv.duration}</span>
                  </div>
                  <p>{srv.desc}</p>
                  <button className="select-srv-action">Select Service</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: DATE & TIME SELECTOR */}
        {step === 2 && (
          <div className="step-content">
            <h2>Select Date & Time Slot</h2>
            <div className="date-time-flex-container">
              <div className="date-picker-box">
                <label htmlFor="booking-date">Choose Date:</label>
                <input 
                  type="date" 
                  id="booking-date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]} 
                  className="date-input-field"
                />
              </div>

              <div className="time-picker-box">
                <label>Available Hour Slots:</label>
                <div className="time-slots-grid">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`time-slot-btn ${formData.time === time ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, time }))}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="step-actions">
              <button type="button" onClick={() => setStep(1)} className="step-back-btn">Back</button>
              <button 
                type="button" 
                onClick={() => validateStep2() && setStep(3)} 
                className="step-next-btn"
              >
                Continue to Measurements
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: MEASUREMENT FIELDS (OPTIONAL) */}
        {step === 3 && (
          <div className="step-content">
            <div className="measurements-header">
              <h2>Provide Your Measurements <span className="optional-tag">(Optional)</span></h2>
              <p>Adding your measurements allows our cutter to prepare fitting blocks in advance. If unsure, you can leave them blank and we will take them in the studio.</p>
            </div>

            <div className="measurements-input-grid">
              <div className="measurement-field">
                <label><FaRuler /> Neck (inches)</label>
                <input 
                  type="number" 
                  name="neck" 
                  placeholder="e.g. 15.5"
                  value={formData.neck}
                  onChange={handleInputChange}
                  step="0.1"
                />
              </div>
              <div className="measurement-field">
                <label><FaRuler /> Chest (inches)</label>
                <input 
                  type="number" 
                  name="chest" 
                  placeholder="e.g. 40"
                  value={formData.chest}
                  onChange={handleInputChange}
                  step="0.1"
                />
              </div>
              <div className="measurement-field">
                <label><FaRuler /> Waist (inches)</label>
                <input 
                  type="number" 
                  name="waist" 
                  placeholder="e.g. 34"
                  value={formData.waist}
                  onChange={handleInputChange}
                  step="0.1"
                />
              </div>
              <div className="measurement-field">
                <label><FaRuler /> Shoulder Width (inches)</label>
                <input 
                  type="number" 
                  name="shoulder" 
                  placeholder="e.g. 18.5"
                  value={formData.shoulder}
                  onChange={handleInputChange}
                  step="0.1"
                />
              </div>
              <div className="measurement-field">
                <label><FaRuler /> Sleeve Length (inches)</label>
                <input 
                  type="number" 
                  name="sleeve" 
                  placeholder="e.g. 25"
                  value={formData.sleeve}
                  onChange={handleInputChange}
                  step="0.1"
                />
              </div>
              <div className="measurement-field">
                <label><FaRuler /> Hips (inches)</label>
                <input 
                  type="number" 
                  name="hip" 
                  placeholder="e.g. 41"
                  value={formData.hip}
                  onChange={handleInputChange}
                  step="0.1"
                />
              </div>
            </div>

            <div className="step-actions">
              <button type="button" onClick={() => setStep(2)} className="step-back-btn">Back</button>
              <button type="button" onClick={() => setStep(4)} className="step-next-btn">Continue to Details</button>
            </div>
          </div>
        )}

        {/* STEP 4: CONTACT INFO & SUBMISSION */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="step-content">
            <h2>Confirm Contact Details</h2>
            <div className="contact-form-grid">
              <div className="form-group-booking">
                <label htmlFor="b-name"><FaUser /> Full Name</label>
                <input 
                  type="text" 
                  id="b-name"
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group-booking">
                <label htmlFor="b-email"><FaEnvelope /> Email Address</label>
                <input 
                  type="email" 
                  id="b-email"
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group-booking">
                <label htmlFor="b-phone"><FaPhone /> Phone Number</label>
                <input 
                  type="tel" 
                  id="b-phone"
                  name="phone" 
                  placeholder="e.g. +91 9876543210"
                  value={formData.phone} 
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group-booking notes-group">
                <label htmlFor="b-notes">Styling Preferences / Notes</label>
                <textarea 
                  id="b-notes"
                  name="notes" 
                  placeholder="Tell us about the fabric you have in mind, color preferences, or the occasion..."
                  value={formData.notes} 
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="step-actions">
              <button type="button" onClick={() => setStep(3)} className="step-back-btn" disabled={loading}>Back</button>
              <button type="submit" className="booking-submit-action" disabled={loading}>
                {loading ? 'Confirming Appointment...' : 'Submit Booking Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default BookAppointment;