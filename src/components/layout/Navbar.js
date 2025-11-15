// src/components/layout/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
} from '@mui/material';
import {
  Home,
  Favorite,
  PhotoLibrary,
  Person,
  Add,
  Notifications,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  borderBottom: '1px solid rgba(0,0,0,0.05)',
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: active ? 600 : 400,
  '&:hover': {
    backgroundColor: 'rgba(67, 97, 238, 0.05)',
  },
}));

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const navItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Gallery', icon: <PhotoLibrary />, path: '/dashboard' },
    { text: 'Favorites', icon: <Favorite />, path: '/favorites' },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  return (
    <StyledAppBar position="sticky" color="default" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            background: 'linear-gradient(45deg, #4361ee 30%, #3a0ca3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          MemoryVault
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            mr: 2,
          }}
        >
          {navItems.map((item) => (
            <NavButton
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              active={location.pathname === item.path ? 1 : 0}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              {item.text}
            </NavButton>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0, ml: 1 }}>
            <Avatar
              src={currentUser?.photoURL}
              alt={currentUser?.displayName || 'User'}
              sx={{ width: 36, height: 36 }}
            />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              width: 220,
              borderRadius: 2,
              mt: 1.5,
              p: 1,
            },
          }}
        >
          <MenuItem
            component={Link}
            to="/profile"
            onClick={handleMenuClose}
            sx={{ borderRadius: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar
                src={currentUser?.photoURL}
                sx={{ width: 32, height: 32 }}
              />
              <Box>
                <Typography variant="subtitle2" noWrap>
                  {currentUser?.displayName || 'My Profile'}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  sx={{ display: 'block' }}
                >
                  View Profile
                </Typography>
              </Box>
            </Box>
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <MenuItem
            component={Link}
            to="/settings"
            onClick={handleMenuClose}
            sx={{ borderRadius: 1 }}
          >
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ borderRadius: 1, color: 'error.main' }}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;