// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TourProvider } from '@reactour/tour';

import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { MemoryProvider } from './context/MemoryContext';

import Navbar from './components/layout/Navbar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import LandingPage from './pages/LandingPage/LandingPage';
import Profile from './pages/Profile/Profile';
import Favorites from './pages/Favorites/Favorites';
import MemoryUpload from './components/memories/MemoryUpload';
import Tour from './components/tour/Tour';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>

        {/* ✅ FIX: Add MemoryProvider here */}
        <MemoryProvider>

          <TourProvider>
            <Navbar />

            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/upload"
                element={
                  <PrivateRoute>
                    <MemoryUpload />
                  </PrivateRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              <Route
                path="/favorites"
                element={
                  <PrivateRoute>
                    <Favorites />
                  </PrivateRoute>
                }
              />
            </Routes>

            <Tour />
          </TourProvider>

        </MemoryProvider>
        {/* End MemoryProvider */}

      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
