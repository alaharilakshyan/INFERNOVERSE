// src/pages/Favorites/Favorites.js
import React from 'react';
import { Container, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useMemory } from '../../context/MemoryContext';
import MemoryGrid from '../../components/memories/MemoryGrid';
import { ViewList, GridView } from '@mui/icons-material';

const Favorites = () => {
  const { favorites, loading, toggleFavorite } = useMemory();
  const [view, setView] = React.useState('grid');

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
            {favorites.length
              ? `You have ${favorites.length} favorite memories`
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
          memories={favorites} 
          loading={loading}
          onDelete={handleRemoveFavorite}
          emptyMessage="You haven't added any memories to favorites yet."
        />
      ) : (
        <Box>
          {/* List view implementation would go here */}
          <Typography color="text.secondary">
            List view coming soon!
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Favorites;