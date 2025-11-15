import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../../context/MemoryContext'; // Fixed path
import { useNotification } from '../../context/NotificationContext'; // Fixed path
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
  styled
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  Edit,
  Delete
} from '@mui/icons-material';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const MemoryCard = ({ memory, onDelete, onEdit }) => {
  // State and hooks at the top
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  
  // Context hooks with optional chaining
  const { toggleFavorite = () => {}, favorites = [] } = useMemory() || {};
  const { showNotification = () => {} } = useNotification() || {};

  // Memoized values
  const isFavorite = useMemo(() => {
    if (!memory?._id || !Array.isArray(favorites)) return false;
    return favorites.some(fav => fav?._id === memory._id);
  }, [favorites, memory?._id]);

  // Event handlers
  const handleFavoriteClick = useCallback((e) => {
    e.stopPropagation();
    try {
      if (memory?._id) {
        toggleFavorite(memory._id);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showNotification('Failed to update favorite', 'error');
    }
  }, [memory?._id, toggleFavorite, showNotification]);

  const handleCardClick = useCallback(() => {
    if (memory?._id) {
      navigate(`/memories/${memory._id}`);
    }
  }, [memory?._id, navigate]);

  const openOptionsMenu = useCallback((e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const closeOptionsMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleEdit = useCallback((e) => {
    e.stopPropagation();
    closeOptionsMenu();
    if (memory && onEdit) {
      onEdit(memory);
    }
  }, [memory, onEdit, closeOptionsMenu]);

  const handleDelete = useCallback((e) => {
    e.stopPropagation();
    closeOptionsMenu();
    if (memory?._id && onDelete) {
      onDelete(memory._id);
    }
  }, [memory, onDelete, closeOptionsMenu]);

  // Early return after all hooks
  if (!memory) {
    return (
      <Card sx={{ height: '100%', opacity: 0.7, p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Memory not available
        </Typography>
      </Card>
    );
  }

  const { _id, title = 'Untitled', description = '', imageUrl, tags = [], createdAt } = memory;
  const openMenu = Boolean(anchorEl);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ height: '100%' }}
    >
      <Card>
        {/* Card content here */}
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{title}</Typography>
            <IconButton onClick={handleFavoriteClick}>
              {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Box>
          {/* Rest of your card content */}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default React.memo(MemoryCard);