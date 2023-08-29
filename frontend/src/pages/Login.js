import React from 'react';
import { Avatar, Backdrop, CircularProgress, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Snackbar } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/auth';

export default function Login() {
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  const [error, setError] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBackdropOpen(true);
    const data = new FormData(event.currentTarget);
    const form = {
      email: data.get("email"),
      password: data.get("password"),
    }
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    })

    const resp = await res.json();
    if (res.ok) {
      Cookies.set('token', resp.token);
      dispatch(setUser(resp.user));
      navigate("/");
    } else {
      setBackdropOpen(false)
      setSnackbar(true);
      setTransition(() => 'TransitionUp');
      setError(resp.message)
    }
  };

  const handleClose = () => {
    setSnackbar(false);
  }
  return (
    <Container component="main" maxWidth="xs">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* Snackbar */}
      <Snackbar
        open={snackbar}
        onClose={handleClose}
        TransitionComponent={transition}
        message={error}
        key={transition ? transition.name : ''}
      />

      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <RouterLink to="/register">
                <Link component="span" variant="body2"> Don't have an account? Sign Up </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
