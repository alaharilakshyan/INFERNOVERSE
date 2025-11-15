// src/pages/Auth/Register.js
import React from 'react';
import { Link as RouterLink, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RegisterForm from '../../components/auth/RegisterForm';
import { Box, Typography, Link, Container } from '@mui/material';

const Register = () => {
const { currentUser, loading, error } = useAuth();
const isAuthenticated = !!currentUser?._id;
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  // Redirect if already authenticated
  if (isAuthenticated && !loading) {
    return <Navigate to={from} replace />;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          p: 3
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Create an Account
        </Typography>
        <Typography color="textSecondary" paragraph align="center">
          Join us to start saving your precious memories
        </Typography>

        <RegisterForm />

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" color="primary">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;