import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

function Nav() {
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

  return (
    <nav className={nav ? 'nav active' : 'nav'}>
        <Link to="#" className='logo'>
            <img src="/images/logoNav.png" alt='' />
        </Link>
        <input type="chekbox" id='menu-btn' className="menu-btn" />
        <label htmlFor="menu-btn" className="menu-icon">
            <span className="nav-icon"></span>
        </label>
        <ul className='menu'>
            <li><Link>HEADER</Link></li>
            <li><Link>Shop</Link></li>
            <li><Link>Coach</Link></li>
            <li><Link>Excerice</Link></li>
            <li><Link>Contact</Link></li>
            <li><Link>About us</Link></li>
            <li><Link>Login</Link></li>
        </ul>
    </nav>
  );
}

export default Nav;
