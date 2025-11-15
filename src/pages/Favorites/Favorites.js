// src/pages/Favorites/Favorites.js
import React from 'react';
import { 
  Container,
  Typography, 
  Box, 
  ToggleButton, 
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton
} from '@mui/material';
import { useMemories } from '../../context/MemoryContext';
import MemoryGrid from '../../components/memories/MemoryGrid';
import { ViewList, GridView, Delete } from '@mui/icons-material';

const Favorites = () => {
  const { favoriteMemories, loading, toggleFavorite } = useMemories();
  const [view, setView] = React.useState('grid');
  const favoritesList = React.useMemo(
    () => favoriteMemories.slice().sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [favoriteMemories]
  );

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleRemoveFavorite = (memoryId) => {
    toggleFavorite(memoryId);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={4}
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Favorite Memories
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {favoriteMemories.length
              ? `You have ${favoriteMemories.length} favorite memories`
              : 'No favorites yet. Add some memories to your favorites!'}
          </Typography>
        </Box>
        
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view mode"
          size="small"
        >
          <ToggleButton value="grid" aria-label="grid view">
            <GridView fontSize="small" sx={{ mr: 1 }} /> Grid
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <ViewList fontSize="small" sx={{ mr: 1 }} /> List
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {view === 'grid' ? (
        <MemoryGrid 
          memories={favoritesList} 
          loading={loading}
          onDelete={handleRemoveFavorite}
          emptyMessage="You haven't added any memories to favorites yet."
        />
      ) : (
        <List>
          {favoritesList.map((memory) => (
            <ListItem
              key={memory._id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFavorite(memory._id)}>
                  <Delete />
                </IconButton>
              }
              sx={{
                bgcolor: 'background.paper',
                mb: 1,
                borderRadius: 1,
              }}
            >
              <ListItemAvatar>
                <Avatar variant="rounded" src={memory.imageUrl} alt={memory.title}>
                  {/* Fallback icon if no image */}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={memory.title} secondary={memory.description} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Favorites;