import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

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
import Contact from './pages/Contact';
import PaymentSuccess from './pages/PaymentSucess';
import SearchResults from './pages/SearchResults';

// Admin
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Products from './pages/Admin/Products';
import Customers from './pages/Admin/Customers';
import Appointments from './pages/Admin/Appointments';

import { AuthProvider } from './context/AuthContext';

function App() {
  const { pathname } = useLocation();

  const isAdminRoute =
    pathname === '/dashboard' ||
    pathname.startsWith('/dashboard/');

  return (
    <AuthProvider>

      {!isAdminRoute && <Navbar />}

      <Routes>

        {/* Public Website Routes */}
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

        {/* Admin Routes - Shared Sidebar */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="reports" element={<div>Reports coming soon</div>} />
        </Route>

        {/* Old /admin links go to the dashboard */}
        <Route path="/admin/*" element={<Navigate to="/dashboard" replace />} />

      </Routes>

      {!isAdminRoute && <Footer />}

    </AuthProvider>
  );
}

export default App;