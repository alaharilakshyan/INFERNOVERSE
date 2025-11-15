import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  Tabs,
  Tab,
  InputAdornment,
} from '@mui/material';
import { Email, Person, Save, Lock } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  marginTop: theme.spacing(4),
}));

const Profile = () => {
  const { currentUser, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        username: currentUser.username || '',
        email: currentUser.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      if (currentUser.avatar) {
        setPreview(`/api/uploads/${currentUser.avatar}`);
      }
    }
  }, [currentUser]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      if (avatar) {
        formDataToSend.append('avatar', avatar);
      }
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("Passwords don't match");
        }
        formDataToSend.append('currentPassword', formData.currentPassword);
        formDataToSend.append('newPassword', formData.newPassword);
      }

      await updateProfile(formDataToSend);
      // Optionally show success message
    } catch (error) {
      console.error('Error updating profile:', error);
      // Optionally show error message to user
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Profile Settings
          </Typography>
        </motion.div>

        <StyledPaper>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <label htmlFor="avatar-upload">
                <input
                  accept="image/*"
                  id="avatar-upload"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
                <Avatar
                  src={preview || '/default-avatar.png'}
                  sx={{
                    width: 120,
                    height: 120,
                    cursor: 'pointer',
                    border: '3px solid',
                    borderColor: 'primary.main',
                  }}
                />
              </label>
            </motion.div>
            <Typography variant="h6" sx={{ mt: 2 }}>
              {currentUser?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser?.email}
            </Typography>
          </Box>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 3 }}
          >
            <Tab label="Profile" icon={<Person />} iconPosition="start" />
            <Tab label="Security" icon={<Lock />} iconPosition="start" />
          </Tabs>

          <form onSubmit={handleSubmit}>
            {activeTab === 0 ? (
              <Box>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            ) : (
              <Box>
                <TextField
                  fullWidth
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  margin="normal"
                  error={formData.newPassword !== formData.confirmPassword}
                  helperText={
                    formData.newPassword && formData.newPassword !== formData.confirmPassword
                      ? "Passwords don't match"
                      : ''
                  }
                />
              </Box>
            )}

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<Save />}
                >
                  Save Changes
                </Button>
              </motion.div>
            </Box>
          </form>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default Profile;