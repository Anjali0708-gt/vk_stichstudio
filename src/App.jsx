import './App.css';
import { Routes, Route } from 'react-router-dom';
// dashboard 


// import Customers from "./pages/customers/Customers";
// import AddCustomer from "./pages/customers/AddCustomer";
// import EditCustomer from "./pages/customers/EditCustomer";
// import CustomerDetails from "./pages/customers/CustomerDetails";
// import Orders from './pages/Orders/Orders'
// import AddOrder from "./pages/Orders/AddOrder";
// import EditOrder from "./pages/Orders/EditOrder";
// import OrderDetails from "./pages/Orders/OrderDetails";
// import Login from "./pages/Login";
// import AdminLayout from "./layouts/Adminlayout";
// import PublicRoute from "./routes/PublicRoute";
// import PrivateRoute from "./routes/PrivateRoute";
// import Measurements from "./pages/measurements/Measurements";
// import AddMeasurement from "./pages/measurements/AddMeasurement";
// import EditMeasurement from "./pages/measurements/EditMeasurement";
// import MeasurementDetails from "./pages/measurements/MeasurementDetails";
// // ...............................................
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
// import Contact from './pages/Contact';
import Login from './pages/Login';
// import Addtocart from './pages/Addtocart';
// import BookAppointment from './pages/BookAppointment';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Services />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/cart" element={<Addtocart />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route
          path="/bookappointment"
          element={<BookAppointment />}
        /> */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;