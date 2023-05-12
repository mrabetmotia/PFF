import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';


export default function Login() {
  const router = useRouter()
  const [title, setTitle]  = useState('Welcome back, please login!')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const resetForm = (event: any) => {
    event.preventDefault()
    setEmail('')
    setPassword('')
  }
  
  const handleSaveClient = async (event: any) => {
    event.preventDefault();
    const payload = {
      email: email, 
      password: password,
    };
    try {
        await axios.post('http://localhost:3000/inscription', payload)
        toast("Product created successfully");
        router.push('/admin/products/');
      } catch (error) {
        console.error(error);
      }
      console.log("BUTTON YI5DIM");
    };

  const handleLogin = (event: any) => {
    event.preventDefault()
    console.log('login the user')
    toast("Welcome Back, Login successfully")
    router.push('/')
  }

  

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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth variant="contained" color="primary" disabled={password.length < 8 || email.length < 2} type="submit">
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
             
            </Paper>
          </Grid>
        </Grid>
      </main>
    </>
  )
}