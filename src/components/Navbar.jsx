import react from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { FaUser,FaShoppingCart } from 'react-icons/fa';
function Navbar()
{
    
  return(
    
   < nav>
        <div className="logo">
         <Link to="/"> <img src="" alt="logo" /> </Link>
        </div>

        <div className="nav-links">
        <Link to="">Home</Link>
        <Link to="/about">About</Link>
        <Link to='/service'>Service</Link>
         <Link to='/contact'>Contact</Link>
          <Link to='/gallery'>Gallery</Link>
          </div>
          <div className= "user">
            <div className="login-logo">
            <Link to='/login'> <FaUser /> </Link>
            </div>
            <div className="cart">
            <Link to='/cart'><FaShoppingCart /></Link>
            </div>
          </div>
          
          </nav>
          

    
    )
}

export default Navbar;