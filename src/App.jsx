import react from 'react';
import { BrowserRouter,Link,Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
// import About from './pages/About';
// import Service from './pages/Service';
// import Gallery from './pages/Gallery';
// import Contact from './pages/Contact';
// import Login from './pages/Login';
// import Addtocart from './pages/Addtocart';
// import BookAppointment from './pages/BookAppointment';
// import ForgetPassword from './pages/ForgetPassword';
// import Signup from './pages/Signup';
// import Footer from './components/Footer'

function App()
{
  return(
    <>
    {/* <Navbar /> */}
    <Home/>
{/*       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Addtocart />} />
          <Route path="/bookappointment" element={<BookAppointment/>} 
          />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/signup" element={<Signup />} />
        </Routes> */}

        
      
    </>
    
    
  )
}

export default App;