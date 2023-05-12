import '@/styles/bootstrap.min.css'
import '@/styles/owl.carousel.min.css'
import '@/styles/slicknav.css'
import '@/styles/flaticon.css'
import '@/styles/animate.min.css'
import '@/styles/animated-headline.css'
import '@/styles/magnific-popup.css'
import '@/styles/fontawesome-all.min.css'
import '@/styles/themify-icons.css'
import '@/styles/slick.css'
import '@/styles/style.css'
import '@/styles/nice-select.css'
import '@/script/contact.js'
import '@/script/vendor/jquery-1.12.4.min.js'
import '@/script/popper.min.js'
import '@/script/vendor/modernizr-3.5.0.min.js'
import '@/script/bootstrap.min.js'
import '@/script/jquery.slicknav.min.js'
import '@/script/owl.carousel.min.js'
import '@/script/slick.min.js'
import '@/script/wow.min.js'
import '@/script/animated.headline.js'
import '@/script/jquery.magnific-popup.js'
import '@/script/gijgo.min.js'
import '@/script/jquery.nice-select.min.js'
import '@/script/jquery.nice-select.min.js'
import '@/script/jquery.sticky.js'
import '@/script/jquery.counterup.min.js'
import '@/script/waypoints.min.js'
import '@/script/jquery.countdown.min.js'
import '@/script/hover-direction-snake.min.js'
import '@/script/contact.js'
import '@/script/jquery.form.js'
import '@/script/jquery.validate.min.js'
import '@/script/mail-script.js'
import '@/script/jquery.ajaxchimp.min.js'
import '@/script/plugins.js'
import '@/script/main.js'
import '@/script/contact'

import type { AppProps } from 'next/app'
import Navbar from '@/components/Navbar';
import Head from '@/components/head';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <Navbar />
          <Component {...pageProps}  />
        <Footer />
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}
