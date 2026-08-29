import { useEffect, useState } from 'react';
import { bookingService } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';
import './BookAppointment.css';

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa';

function BookAppointment() {
  const { currentUser, addBookingToState, isAuthenticated } = useAuth();

  // --------------------------------------------------
  // STEP:
  // 1 = Service
  // 2 = Date & Time
  // 3 = Customer Details
  // --------------------------------------------------
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingResult, setBookingResult] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
const [slotsLoading, setSlotsLoading] = useState(false);
const [services, setServices] = useState([]);
const [servicesLoading, setServicesLoading] = useState(false);

  // --------------------------------------------------
  // FORM DATA
  // --------------------------------------------------
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    notes: ''
  });

  // --------------------------------------------------
  // SERVICES
  // Men's Tailoring Services
  // --------------------------------------------------
useEffect(() => {
  const loadServices = async () => {
    try {
      setServicesLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/services`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load services");
      }

      setServices(data.services || data);
    } catch (error) {
      setError(error.message);
    } finally {
      setServicesLoading(false);
    }
  };

  loadServices();
}, []);
  // --------------------------------------------------
  // AVAILABLE TIME SLOTS
  // --------------------------------------------------
  // --------------------------------------------------
  // HANDLE INPUT CHANGE
  // --------------------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Remove error when user starts correcting input
    if (error) {
      setError('');
    }
  };

  const loadAvailableSlots = async (date) => {
  if (!date) {
    setAvailableSlots([]);
    return;
  }

  try {
    setSlotsLoading(true);
    setError('');

    const response = await bookingService.getAvailableSlots(date);

    if (response.success) {
      setAvailableSlots(response.slots || []);
    } else {
      setAvailableSlots([]);
      setError(response.message || 'Unable to load available slots.');
    }
  } catch (err) {
    setAvailableSlots([]);
    setError(err.message || 'Unable to load available slots.');
  } finally {
    setSlotsLoading(false);
  }
};

  // --------------------------------------------------
  // SELECT SERVICE
  // --------------------------------------------------
 const handleServiceSelect = (service) => {
  setFormData((prev) => ({
    ...prev,
    service: service._id,
    time: ''
  }));

  setError('');
  setStep(2);
};
  // --------------------------------------------------
  // VALIDATE STEP 2
  // DATE & TIME
  // --------------------------------------------------
  const validateStep2 = () => {
    if (!formData.date) {
      setError('Please select an appointment date.');
      return false;
    }

    if (!formData.time) {
      setError('Please select an available time slot.');
      return false;
    }

    setError('');
    return true;
  };

  // --------------------------------------------------
  // VALIDATE STEP 3
  // CUSTOMER DETAILS
  // --------------------------------------------------
  const validateStep3 = () => {
    if (!formData.name.trim()) {
      setError('Please enter your full name.');
      return false;
    }

    if (!formData.phone.trim()) {
      setError('Please enter your phone number.');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email address.');
      return false;
    }

    setError('');
    return true;
  };

  // --------------------------------------------------
  // FORMAT TIME
  // Example: 14:30 -> 2:30 PM
  // --------------------------------------------------
  const formatTime = (time) => {
    if (!time) return '';

    const [hours, minutes] = time.split(':');

    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12 || 12;

    return `${hour}:${minutes} ${ampm}`;
  };

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------
  const formatDate = (date) => {
    if (!date) return '';

    const dateObject = new Date(`${date}T00:00:00`);

    return dateObject.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // --------------------------------------------------
  // SUBMIT BOOKING
  // --------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep3()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await bookingService.createBooking(
        formData,
        currentUser?.id
      );

      if (response.success) {
        setBookingResult(response.booking);

        // Add booking to local state if user is logged in
        if (isAuthenticated) {
          addBookingToState(response.booking);
        }
      } else {
        setError(
          response.message || 'Unable to book the appointment.'
        );
      }
    } catch (err) {
      setError(
        err.message || 'Something went wrong while booking the appointment.'
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // BOOKING SUCCESS SCREEN
  // --------------------------------------------------
  if (bookingResult) {
    return (
      <div className="booking-success-view">
        <div className="booking-success-card">

          <FaCheckCircle className="success-icon-big" />

          <h1>Appointment pending</h1>

          <p className="booking-ref">
            Confirmation Code:{' '}
            <strong>
              {bookingResult.id}
            </strong>
          </p>

          <div className="booking-details-box">

            <h3>Appointment Summary</h3>

            <p>
              <strong>Service:</strong>{' '}
              {bookingResult.service}
            </p>

            <p>
              <strong>Date:</strong>{' '}
              {formatDate(bookingResult.date)}
            </p>

            <p>
              <strong>Time:</strong>{' '}
              {formatTime(bookingResult.time)}
            </p>

            <p>
              <strong>Client:</strong>{' '}
              {bookingResult.name}
            </p>

            <p>
              <strong>Phone:</strong>{' '}
              {bookingResult.phone}
            </p>

            <p>
              <strong>Status:</strong>{' '}
              {bookingResult.status}
            </p>

          </div>

          <p className="success-note">
            Your appointment has been successfully booked.
            Please arrive at the selected time. Our tailor
            will discuss your requirements and take the
            necessary measurements during your appointment.
          </p>

          <button
            onClick={() => {
              setStep(1);
              setBookingResult(null);

              setFormData({
                service: 'Custom Suit',
                date: '',
                time: '',
                name: currentUser?.name || '',
                email: currentUser?.email || '',
                phone: '',
                notes: ''
              });

              setError('');
            }}
            className="new-booking-btn"
          >
            Book Another Appointment
          </button>

        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // MAIN BOOKING PAGE
  // --------------------------------------------------
  return (
    <div className="booking-page">

      <div className="booking-container">

        {/* =========================================
            HEADER
        ========================================== */}

        <div className="stepper-header">

          <h1>Book an Appointment</h1>

          <p>
            Schedule a personal appointment with our
            professional men's tailoring team.
          </p>

          {/* =========================================
              3 STEP PROGRESS
          ========================================== */}

          <div className="stepper-dots">

            <span
              className={`dot ${
                step >= 1 ? 'active' : ''
              } ${
                step === 1 ? 'current' : ''
              }`}
            >
              1. Service
            </span>

            <span className="line"></span>

            <span
              className={`dot ${
                step >= 2 ? 'active' : ''
              } ${
                step === 2 ? 'current' : ''
              }`}
            >
              2. Date & Time
            </span>

            <span className="line"></span>

            <span
              className={`dot ${
                step >= 3 ? 'active' : ''
              } ${
                step === 3 ? 'current' : ''
              }`}
            >
              3. Your Details
            </span>

          </div>

        </div>

        {/* =========================================
            ERROR MESSAGE
        ========================================== */}

        {error && (
          <div className="booking-error-alert">
            {error}
          </div>
        )}

        {/* =========================================
            STEP 1
            SELECT SERVICE
        ========================================== */}

        {step === 1 && (

          <div className="step-content">

            <h2>What would you like to book?</h2>

            <p className="step-description">
              Choose a tailoring service for your appointment.
            </p>

            <div className="services-selector-grid">

              {servicesLoading ? (
  <p>Loading services...</p>
) : (
  services.map((service) => (
    <div
      key={service._id}
      className={`service-option-card ${
        formData.service === service._id ? 'selected' : ''
      }`}
      onClick={() => handleServiceSelect(service)}
    >
      <img
        src={service.image}
        alt={service.name}
        className="service-image"
      />

      <div className="service-card-content">
        <div className="service-card-meta">
          <h3>{service.name}</h3>

          <span className="duration-tag">
            <FaClock />
            {service.duration} mins
          </span>
        </div>

        <p>{service.description}</p>

        <button
          type="button"
          className="select-srv-action"
        >
          Select Service
          <FaArrowRight />
        </button>
      </div>
    </div>
  ))
)}
            </div>

          </div>

        )}

        {/* =========================================
            STEP 2
            DATE & TIME
        ========================================== */}

        {step === 2 && (

          <div className="step-content">

            <h2>Select Date & Time</h2>

            <p className="step-description">
              Choose a convenient date and available time
              for your appointment.
            </p>

            <div className="date-time-flex-container">

              {/* DATE */}

              <div className="date-picker-box">

                <label htmlFor="booking-date">
                  Appointment Date
                </label>

                <input
  type="date"
  id="booking-date"
  name="date"
  value={formData.date}
  onChange={(e) => {
    handleInputChange(e);

    setFormData((prev) => ({
      ...prev,
      date: e.target.value,
      time: ''
    }));

    loadAvailableSlots(e.target.value);
  }}
  min={
    new Date()
      .toISOString()
      .split('T')[0]
  }
  className="date-input-field"
/>
              </div>

              {/* TIME */}

              <div className="time-picker-box">

                <label>
                  Available Time Slots
                </label>

                <div className="time-slots-grid">

  {slotsLoading ? (
    <p>Loading available slots...</p>
  ) : !formData.date ? (
    <p>Please select a date first.</p>
  ) : availableSlots.length === 0 ? (
    <p>No slots available for this date.</p>
  ) : (
    availableSlots.map((slot) => (
      <button
        key={slot.time}
        type="button"
        disabled={!slot.available}
        className={`time-slot-btn ${
          formData.time === slot.time
            ? 'selected'
            : ''
        } ${
          !slot.available
            ? 'unavailable'
            : ''
        }`}
        onClick={() => {
          if (!slot.available) return;

          setFormData((prev) => ({
            ...prev,
            time: slot.time
          }));

          setError('');
        }}
      >
        {formatTime(slot.time)}

        {!slot.available && (
          <span>Booked</span>
        )}
      </button>
    ))
  )}

</div>
              </div>

            </div>

            {/* SELECTED SERVICE SUMMARY */}

            <div className="selected-service-summary">

              <strong>
                Selected Service:
              </strong>
<span>
  {services.find(
    (service) => service._id === formData.service
  )?.name || ''}
</span>

            </div>

            {/* ACTIONS */}

            <div className="step-actions">

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setError('');
                }}
                className="step-back-btn"
              >
                <FaArrowLeft />
                Back
              </button>

              <button
                type="button"
                onClick={() => {
                  if (validateStep2()) {
                    setStep(3);
                  }
                }}
                className="step-next-btn"
              >
                Continue
                <FaArrowRight />
              </button>

            </div>

          </div>

        )}

        {/* =========================================
            STEP 3
            CUSTOMER DETAILS
        ========================================== */}

        {step === 3 && (

          <form
            onSubmit={handleSubmit}
            className="step-content"
          >

            <h2>Your Details</h2>

            <p className="step-description">
              Enter your contact details so we can confirm
              your appointment.
            </p>

            <div className="contact-form-grid">

              {/* NAME */}

              <div className="form-group-booking">

                <label htmlFor="b-name">
                  <FaUser />
                  Full Name
                </label>

                <input
                  type="text"
                  id="b-name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />

              </div>

              {/* PHONE */}

              <div className="form-group-booking">

                <label htmlFor="b-phone">
                  <FaPhone />
                  Phone Number
                </label>

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

              {/* EMAIL */}

              <div className="form-group-booking">

                <label htmlFor="b-email">
                  <FaEnvelope />
                  Email Address
                  <span className="optional-tag">
                    Optional
                  </span>
                </label>

                <input
                  type="email"
                  id="b-email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />

              </div>

              {/* NOTES */}

              <div className="form-group-booking notes-group">

                <label htmlFor="b-notes">
                  Special Request / Notes
                  <span className="optional-tag">
                    Optional
                  </span>
                </label>

                <textarea
                  id="b-notes"
                  name="notes"
                  placeholder="Example: I need a black suit for a wedding..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="4"
                />

              </div>

            </div>

            {/* =====================================
                BOOKING SUMMARY
            ====================================== */}

            <div className="booking-summary">

              <h3>Appointment Summary</h3>

              <div className="summary-row">

                <span>
                  Service
                </span>

                <strong>
                  {formData.service}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Date
                </span>

                <strong>
                  {formatDate(formData.date)}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Time
                </span>

                <strong>
                  {formatTime(formData.time)}
                </strong>

              </div>

            </div>

            {/* =====================================
                ACTIONS
            ====================================== */}

            <div className="step-actions">

              <button
                type="button"
                onClick={() => {
                  setStep(2);
                  setError('');
                }}
                className="step-back-btn"
                disabled={loading}
              >
                <FaArrowLeft />
                Back
              </button>

              <button
                type="submit"
                className="booking-submit-action"
                disabled={loading}
              >

                {loading
                  ? 'Confirming Appointment...'
                  : 'Confirm Appointment'
                }

              </button>

            </div>

          </form>

        )}

      </div>

    </div>
  );
}

export default BookAppointment;