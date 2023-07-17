import '@/styles/globals.css'
import '@/styles/index.css'
import '@/styles/insc.css'
import '@/styles/coach.css'
import '@/styles/panier.css'
import '@/styles/shop.css'
import '@/styles/exercice.css'

import type { AppProps } from 'next/app'
import Navbar from '@/components/Navbar';
import Head from '@/components/head';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '../context/CartContext';
const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <div>
      <Head />
      <CartProvider>
        <CssBaseline />
        <AuthProvider>
        <Navbar />
          <Component {...pageProps}  />
        <Footer />
        </AuthProvider>
        <ToastContainer />
        </CartProvider>
      </div>
    </ThemeProvider>
  );
}
