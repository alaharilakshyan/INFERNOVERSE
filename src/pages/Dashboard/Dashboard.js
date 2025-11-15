// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTour } from '@reactour/tour';

import {
  Container,
  Box,
  Typography,
  Button,
  Fab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Add, GridView } from '@mui/icons-material';
import { motion } from 'framer-motion';

import MemoryGrid from '../../components/memories/MemoryGrid';

// -----------------------
// Mock data (replace API)
// -----------------------
const mockMemories = Array.from({ length: 6 }, (_, i) => ({
  _id: `memory-${i + 1}`,
  title: `Memory ${i + 1}`,
  description: `This is a sample memory description ${i + 1}. Add your own memories to see them here!`,
  imageUrl: `https://source.unsplash.com/random/400x300?memory=${i}`,
  createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
  tags: ['vacation', 'family', 'summer'].slice(
    0,
    Math.floor(Math.random() * 3) + 1
  ),
}));

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { setIsOpen } = useTour();

  // Tour visibility logic
  const [showTour, setShowTour] = useState(
    localStorage.getItem('hasSeenTour') !== 'true'
  );

  const handleTourStart = () => {
    setIsOpen(true);
    localStorage.setItem('hasSeenTour', 'true');
    setShowTour(false);
  };

  // Memory state
  const [memories, setMemories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch memories (mocked)
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setIsLoading(true);

        await new Promise((res) => setTimeout(res, 800));

        setMemories(mockMemories);
      } catch (error) {
        console.error('Error fetching memories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemories();
  }, []);

  const handleDeleteMemory = async (id) => {
    try {
      setMemories(memories.filter((memory) => memory._id !== id));
    } catch (error) {
      console.error('Error deleting memory:', error);
    }
  };

  const handleEditMemory = (memory) => {
    navigate(`/memories/${memory._id}/edit`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, position: 'relative', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, {currentUser?.username}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            You have {memories.length}{' '}
            {memories.length === 1 ? 'memory' : 'memories'} saved
          </Typography>
        </motion.div>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<GridView />}
            size={isMobile ? 'small' : 'medium'}
            disabled
          >
            {!isMobile && 'Grid View'}
          </Button>
        </Box>
      </Box>

      {/* Memory Grid View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MemoryGrid
          memories={memories}
          onDelete={handleDeleteMemory}
          onEdit={handleEditMemory}
          isLoading={isLoading}
        />
      </motion.div>

      {/* Floating Add Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
      >
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate('/upload')}
          size={isMobile ? 'medium' : 'large'}
        >
          <Add />
        </Fab>
      </motion.div>

      {/* Tour Button (Only for new users) */}
      {showTour && (
        <button
          onClick={handleTourStart}
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            zIndex: 1000,
            padding: '10px 20px',
            borderRadius: '50px',
            border: 'none',
            background: 'linear-gradient(45deg, #4361ee 30%, #3a0ca3 90%)',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          Take a Quick Tour
        </button>
      )}
    </Container>
  );
};

export default Dashboard;
