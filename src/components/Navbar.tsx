import React, { useState } from 'react';
import { useRouter } from "next/router";

import { useMediaQuery } from '@mui/material';


function Navbar() {
  // state user = {}

  const router = useRouter();


  const handleShopClick = () => {
    router.push('/shops');
  };
  const handleLoginClick = () => {
    router.push('login/login');
  };
  const handleIndexClick = () => {
    router.push('/');
  };
  const handleInscriptionClick = () => {
    router.push('/inscription');
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
  const handleAddShoptClick = () => {
    router.push('/shop/addshop');
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  return (
    <header>
    <div className="header-area header-transparent">
        <div className="main-header header-sticky">
            <div className="container-fluid">
                <div className="menu-wrapper d-flex align-items-center justify-content-between">
                    <div className="logo">
                        <a onClick={handleIndexClick}><img src="assets/img/logo/logo.png" alt="" /></a>
                    </div>
                    <div className="main-menu f-right d-none d-lg-block">
                        <nav>
                            <ul id="navigation">
                                <li><a onClick={handleIndexClick} >Home</a></li>
                                <li><a onClick={handleShopClick} >Shop</a></li>
                                <li><a onClick={handleCourseClick}>Courses</a></li>
                                <li><a onClick={handleCoachClick}>Coach</a></li>
                                <li><a onClick={handleContactClick}>Contact</a></li>
                            </ul>
                        </nav>
                    </div>          
                    <div className="header-btns d-none d-lg-block f-right">
                       <a onClick={handleLoginClick} className="btn">Login</a>
                   </div>
                   <div className="header-btns d-none d-lg-block f-right">
                       <a onClick={handleInscriptionClick} className="btn">Inscription</a>
                   </div>
                   <div className="col-12">
                    <div className="mobile_menu d-block d-lg-none"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</header>
  );
}
export default Navbar;