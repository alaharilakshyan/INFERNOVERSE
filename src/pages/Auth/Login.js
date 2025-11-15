// src/pages/Auth/Login.js
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/auth/LoginForm';
import { Box, Typography } from '@mui/material';

const Login = () => {
const { currentUser, loading, error } = useAuth();
const isAuthenticated = !!currentUser?._id;
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  // Redirect if already authenticated
  if (isAuthenticated && !loading) {
    return <Navigate to={from} replace />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        p: 2
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome Back
      </Typography>
      <Typography color="textSecondary" paragraph>
        Sign in to continue to your account
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <LoginForm />
    </Box>
  );
};

export default Login;