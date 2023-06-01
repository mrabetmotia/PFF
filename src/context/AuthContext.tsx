import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  login: (email: string, password: string) => void;
  register: (
    first_name: string,
    last_name: string,
    email: string, // Update the type to string
    phone: Number,
    address: string,
    password: string,
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, settoken] = useState<string | null>(null);
  const router = useRouter();

  // Check authentication state after page refresh to get the token inside the useAuthContext
  const checkAuthState = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      settoken(storedToken);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkAuthState();
  }, []);
  const handleRefresh = () => {
    window.location.reload();
  };
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        'http://localhost:9000/login-user',
        { email, password }
      );
      const { token } = response.data;
      settoken(token);
      setIsLoggedIn(true);
      localStorage.setItem('token', token);
      handleRefresh();
      router.push('/');
      toast('Welcome Back, Login successfully');

    } catch (error) {
      toast('Login failed');

      console.error('Login failed:', error);
        router.push('/login');

      // Handle login failure, show error message, etc.
    }
  };

  const register = async (nom: string, prenom: string, dateN: string, email: string, password: string, confirmPassword: string, id_post: string) => {
    try {
      const response = await axios.post('http://localhost:9000/inscription', {
        nom,
        prenom,
        dateN,
        email,
        password,
        confirmPassword,
        id_post
      });
      console.log('Registration successful:', response.data);
      toast.success('Inscription réussie ! Bienvenue !');
      router.push('/login/');

    } catch (error) {
      console.error('Registration failed:', error);
      router.push('/login/inscription');

      // Handle registration failure, show error message, etc.
    }
  };

  const logout = () => {
    settoken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};