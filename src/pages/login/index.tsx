import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAuth } from '@/context/AuthContext';
import { z } from 'zod';


const loginSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
});


export default function Login() {
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('Welcome back, please login!');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleInscriptionClick = () => {
    router.push('login/inscription');
  };


  const resetForm = (event: any) => {
    event.preventDefault();
    setEmail('');
    setPassword('');
    setErrors({ email: '', password: '' });
  };

  const handleLogin = (event: any) => {
    event.preventDefault();
    try {
      loginSchema.parse({ email, password });
      login(email, password);
    } catch (error) {
      if (error instanceof z.ZodError) {
        
        const emailError = error.issues.find((issue) => issue.path[0] === 'email');
        const passwordError = error.issues.find((issue) => issue.path[0] === 'password');
        setErrors({
          email: emailError ? emailError.message : '',
          password: passwordError ? passwordError.message : '',
        
        });

      }
      console.log("TESTING");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);


  return (
    <>
      <Head>
        <title>Login page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={6} sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                {title}
              </Typography>
              <form onSubmit={handleLogin}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Email Address"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      error={!!errors.password}
                      helperText={errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth variant="contained" color="primary" type="submit">
                      Connexion
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth variant="outlined" onClick={resetForm}>
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                  <a href="" className="inscr" onClick={handleInscriptionClick}> Incription</a>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </>
  );
}
