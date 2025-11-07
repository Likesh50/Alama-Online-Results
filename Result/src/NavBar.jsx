import React from 'react';
import './NavBar.css';
import logo from './assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = window.sessionStorage.getItem("role");


  const handleImage = () => {
    navigate("/dashboard");
  };

  return (
    <div className='navbar'>
      <div className='logo'>
        <img src={logo} alt="Logo" onClick={handleImage} />
      </div>

    </div>
  );
}

export default Navbar;
