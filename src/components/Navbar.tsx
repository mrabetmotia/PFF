import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useAuth } from "@/context/AuthContext";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import jwt_decode from "jwt-decode";
import { Link } from "react-scroll";
import Login from "@/pages/login";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { cart } = useContext(CartContext);

  const handleShopClick = () => {
    router.push("/shop");
  };

  const handleIndexClick = () => {
    router.push("/");
  };

  const handleCoachClick = () => {
    router.push("/coach");
  };

  const handleCourseClick = () => {
    router.push("/course");
  };

  const handleContactClick = () => {
    router.push("/contact");
  };

  const handlePanierClick = () => {
    router.push("/panier");
  };

  const handleLogoutClick = () => {
    logout();
    router.push("/");
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [formData, setFormData] = useState({
    nom: "",
    specialite: "",
    description: "",
    image: "",
    experiance: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: { email?: string; first_name?: string } =
          jwt_decode(token);
        setFormData((prevFormData) => ({
          ...prevFormData,
          email: decoded.email || "",
          nom: decoded.first_name || "",
        }));
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>{formData.nom}</MenuItem>
                  <MenuItem onClick={handleClose}>{formData.email}</MenuItem>
                  <MenuItem onClick={handleLogoutClick}>Logaut</MenuItem>
                </Menu>
              </div>
              <IconButton onClick={handlePanierClick}>
                <ShoppingBasketIcon className="iconeshop" />
              </IconButton>
              <p className="nbPanier">{cart.length}</p>
            </>
          ) : (
            <li>
              <Link onClick={handleClickOpen} className="btn-modal">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <Dialog open={open} onClose={handleClose}>
        <Login />
      </Dialog>
    </>
  );
}

export default Navbar;
