import React from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import { useMediaQuery } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '@/context/AuthContext';
import {useEffect , useState} from 'react';
import { Link } from 'react-scroll';

function Navbar() {
  // state user = {}
  const [nav, setNav] = useState(false);

  useEffect(() => {
    const changeBackground = () => {
      if (typeof window !== 'undefined' && window.scrollY >= 50) {
        setNav(true);
      } else {
        setNav(false);
      }
    };

    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const handleShopClick = () => {
    router.push('/shops');
  };
  const handleLoginClick = () => {
    router.push('/login');
  };
  const handleIndexClick = () => {
    router.push('/');
  };

  const handleCoachClick = () => {
    router.push('/coachs');
  };
  const handleCourseClick = () => {
    router.push('/course');
  };  
  const handleContactClick = () => {
    router.push('/contact');
  };
  const handleAddShoptClick = () => {
    router.push('/shop/addshop');
  };
  const handleLogoutClick = () => {
    logout();
    router.push('/');
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  return (
    
          <>
          <nav className={nav ? 'nav active' : 'nav'}>
            <Link to="#" className='logo' startIcon={<HomeIcon />} onClick={handleIndexClick}>
                <img src="/images/logoNav.png" alt='' />
            </Link>
            <input type="chekbox" id='menu-btn' className="menu-btn" />
            <label htmlFor="menu-btn" className="menu-icon">
                <span className="nav-icon"></span>
            </label>
            <ul className='menu'>
              <li><Link startIcon={<HomeIcon />} onClick={handleIndexClick}>Home</Link></li>
              <li><Link startIcon={<ShoppingBasketIcon />} onClick={handleShopClick}>Shop</Link></li>
              <li><Link startIcon={<StoreIcon />} onClick={handleCoachClick}>Coach</Link></li>
              {isLoggedIn ? (
              <>
              <li><Link startIcon={<PeopleIcon />} onClick={handleCourseClick}>Excerice</Link></li>
              <li><Link>Contact</Link></li>
              <li><Link>About us</Link></li>
              <li><Link startIcon={<LockIcon />} onClick={handleLogoutClick}>Logout</Link></li>
              </>
            ) : (
              <li><Link startIcon={<LockIcon />} onClick={handleLoginClick}>Login</Link></li>
            )}
            </ul>
            </nav>
          </>
  );
}
export default Navbar;