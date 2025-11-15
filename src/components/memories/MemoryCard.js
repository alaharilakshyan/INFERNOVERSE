// src/components/memories/MemoryCard.js
import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../../context/MemoryContext';
import { useNotification } from '../../context/NotificationContext';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  CardActions,
  Menu,
  MenuItem,
  styled,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  Edit,
  Delete,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  borderRadius: 14,
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const MemoryCard = ({ memory, onDelete, onEdit }) => {
  // Hooks must be called at the top level
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { toggleFavorite, favorites } = useMemory();
  const { showNotification } = useNotification();

  // Memoize the isFavorite check
  const isFavorite = useMemo(() => {
    if (!memory?._id) return false;
    return favorites?.some((fav) => fav?._id === memory._id) || false;
  }, [favorites, memory?._id]);

  // Handle favorite click
  const handleFavoriteClick = useCallback((e) => {
    e.stopPropagation();
    try {
      if (memory?._id) {
        toggleFavorite(memory._id);
      }
    } catch (err) {
      console.error(err);
      showNotification('Failed to update favorite', 'error');
    }
  }, [memory?._id, toggleFavorite, showNotification]);

  // Handle card click
  const handleCardClick = useCallback(() => {
    if (memory?._id) {
      navigate(`/memories/${memory._id}`);
    }
  }, [memory?._id, navigate]);

  // Other handlers
  const openOptionsMenu = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const closeOptionsMenu = () => setAnchorEl(null);

  const handleEdit = (e) => {
    e.stopPropagation();
    closeOptionsMenu();
    onEdit?.(memory);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    closeOptionsMenu();
    onDelete?.(memory?._id);
  };

  // Early return after all hooks
  if (!memory || !memory._id) {
    return (
      <Card sx={{ height: '100%', opacity: 0.6, p: 2 }}>
        <Typography variant="body2">Memory unavailable</Typography>
      </Card>
    );
  }

  const { _id, title, description, imageUrl, tags, createdAt } = memory;

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      style={{ height: '100%' }}
    >
      <StyledCard onClick={handleCardClick}>
        {/* Rest of your component */}
      </StyledCard>
    </motion.div>
  );
};

export default React.memo(MemoryCard);