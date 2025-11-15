import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// Correct import
import { useMemories } from '../../context/MemoryContext';
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
  borderRadius: theme.shape.borderRadius * 1.25,
  overflow: 'hidden',
  transition: 'transform 0.25s, box-shadow 0.25s',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: theme.shadows[4],
  },
}));

const MemoryCard = ({ memory, onDelete }) => {
  // State and hooks at the top
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  
  // Correctly get the toggle function from the context
  const { toggleFavorite } = useMemories();
  const { showNotification = () => {} } = useNotification() || {};

  // The favorite status comes directly from the memory prop.
  const isFavorite = memory?.isFavorite || false;

  // Event handlers
  const handleFavoriteClick = useCallback((e) => {
    e.stopPropagation();
    try {
      if (memory?._id) {
        toggleFavorite(memory._id);
        showNotification(isFavorite ? 'Removed from favorites' : 'Added to favorites', 'success');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showNotification('Failed to update favorite', 'error');
    }
  }, [memory?._id, isFavorite, toggleFavorite, showNotification]);

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
    if (memory?._id) {
      navigate(`/memories/${memory._id}/edit`);
    }
  }, [memory?._id, navigate, closeOptionsMenu]);

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
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      style={{ height: '100%' }}
    >
      <StyledCard onClick={handleCardClick}>
        {imageUrl ? (
          <CardMedia component="img" image={imageUrl} alt={title} sx={{ height: 180, objectFit: 'cover' }} />
        ) : (
          <Box sx={(theme) => ({ height: 180, background: theme.palette.secondary.gradient })} />
        )}
        <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}>
          <IconButton
            component={motion.button}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteClick}
            aria-label="toggle favorite"
            sx={{ bgcolor: 'background.paper', boxShadow: 1 }}
          >
            {isFavorite ? <Favorite sx={{ color: 'error.main' }} /> : <FavoriteBorder sx={{ color: 'text.primary' }} />}
          </IconButton>
        </Box>
        <CardContent>
          <Typography variant="h6" noWrap>{title}</Typography>
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} noWrap>
              {description}
            </Typography>
          )}
          {Array.isArray(tags) && tags.length > 0 && (
            <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {tags.slice(0, 3).map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Box>
          )}
        </CardContent>
        <CardActions sx={{ mt: 'auto', justifyContent: 'space-between', px: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {createdAt ? format(new Date(createdAt), 'MMM d, yyyy') : ''}
          </Typography>
          <Box>
            <IconButton size="small" onClick={openOptionsMenu}>
              <MoreVert />
            </IconButton>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={closeOptionsMenu}>
              <MenuItem onClick={handleEdit}><Edit fontSize="small" sx={{ mr: 1 }} /> Edit</MenuItem>
              <MenuItem onClick={handleDelete}><Delete fontSize="small" sx={{ mr: 1 }} /> Delete</MenuItem>
            </Menu>
          </Box>
        </CardActions>
      </StyledCard>
    </motion.div>
  );
};

export default React.memo(MemoryCard);