import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Login from './pages/Login';

import Addtocart from './pages/Addtocart';
import BookAppointment from './pages/BookAppointment';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Contact from './pages/Contact';
import PaymentSuccess from "./pages/PaymentSucess";
import SearchResults from "./pages/SearchResults";
import Customers from "./pages/Admin/Customers";



import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Addtocart />} />
      
<Route path="/success" element={<PaymentSuccess />} />
        <Route path="/bookappointment" element={<BookAppointment />} />

        {/* Admin Dashboard */}
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route
  path="/admin/customers"
  element={<Customers />}
/>
      </Routes>

      <Footer />

    </AuthProvider>
  );
}

export default App;