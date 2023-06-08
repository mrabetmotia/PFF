import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import { useMediaQuery } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-scroll';
import Login from '@/pages/login';

function Navbar() {
  const [nav, setNav] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const handleShopClick = () => {
    router.push('/shop');
  };

  const handleIndexClick = () => {
    router.push('/');
  };

  const handleCoachClick = () => {
    router.push('/coach');
  };

  const handleCourseClick = () => {
    router.push('/course');
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  const handlePanierClick = () => {
    router.push('/panier');
  };

  const handleLogoutClick = () => {
    logout();
    router.push('/');
  };

 
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <nav className="active">
        <Link to="#" className="logo"  onClick={handleIndexClick}>
          <img src="/images/logoNav.png" alt="" />
        </Link>
        <input type="checkbox" id="menu-btn" className="menu-btn" />
        <label htmlFor="menu-btn" className="menu-icon">
          <span className="nav-icon"></span>
        </label>
        <ul className="menu">
          <li>
            <Link onClick={handleIndexClick}>Home</Link>
          </li>
          <li>
            <Link onClick={handleShopClick}>Shop</Link>
          </li>
 
          <li>
            <Link onClick={handleCoachClick}>Coach</Link>
          </li>
          <li>
              <Link onClick={handleCourseClick}>Exercise</Link>
            </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link onClick={handleContactClick}>Contact</Link>
              </li>
              <li>
                <Link onClick={handleLogoutClick}>Logout</Link>
              </li>
              <li>
                <Link onClick={handlePanierClick}>panier</Link>
              </li>
            </>
          ) : (
            <li>
              <Link onClick={toggleModal} className="btn-modal">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">

            <Login/>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
