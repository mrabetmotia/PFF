import React, { useState } from 'react';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LockIcon from '@mui/icons-material/Lock';
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
        <Link to="#" className="logo" onClick={handleIndexClick}>
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
          <li>
            <Link onClick={handleContactClick}>Contact</Link>
          </li>
          {isLoggedIn ? (
            <>

              <li>
                <Link onClick={handleLogoutClick}>Logout</Link>
              </li>
              <li>
                <IconButton onClick={handleLogoutClick}>
                  <LockIcon className="icon-logout iconeshop"  />
                </IconButton >
              </li>
              <li>
                <IconButton onClick={handlePanierClick}>
                  <ShoppingBasketIcon  className='iconeshop'/>
                </IconButton>
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
            <Login />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
