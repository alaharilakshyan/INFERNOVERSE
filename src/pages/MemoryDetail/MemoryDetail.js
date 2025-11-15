import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemories } from '../../context/MemoryContext';
import { useNotification } from '../../context/NotificationContext';
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { format } from 'date-fns';

const MemoryDetail = () => {
  const { memoryId } = useParams();
  const navigate = useNavigate();
  const { memories, loading } = useMemories();
  const { showNotification } = useNotification();

  const [memory, setMemory] = useState(null);

  useEffect(() => {
    const foundMemory = memories.find((m) => m._id === memoryId);
    if (foundMemory) {
      setMemory(foundMemory);
    } else if (!loading) {
      // If memories are loaded and still not found, navigate away
      showNotification('Memory not found.', 'error');
      navigate('/dashboard');
    }
  }, [memoryId, memories, loading, navigate, showNotification]);

  const handleEditClick = () => {
    navigate(`/memories/${memoryId}/edit`);
  };

  if (loading || !memory) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress />
        <Typography>Loading memory...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        {memory.imageUrl && (
          <CardMedia
            component="img"
            height="400"
            image={memory.imageUrl}
            alt={memory.title}
          />
        )}
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {memory.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {memory.description}
          </Typography>

          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {memory.tags?.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Box>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'space-between',
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Created on:{' '}
            {memory.createdAt
              ? format(new Date(memory.createdAt), 'MMMM d, yyyy')
              : 'N/A'}
          </Typography>
          <Box>
            <IconButton onClick={handleEditClick} aria-label="edit memory">
              <Edit />
            </IconButton>
          </Box>
        </CardActions>
      </Paper>
    </Container>
  );
};

export default MemoryDetail;