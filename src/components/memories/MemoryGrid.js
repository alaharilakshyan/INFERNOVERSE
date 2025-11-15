// src/components/memories/MemoryGrid.js
import React from 'react';
import { Grid, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import MemoryCard from './MemoryCard';
import ErrorBoundary from '../../utils/ErrorBoundary';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 24 
    } 
  }
};

const MemoryGrid = ({ 
  memories = [], 
  onDelete, 
  onEdit, 
  loading,
  emptyMessage = "No memories found"
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 200 
      }}>
        <Typography>Loading memories...</Typography>
      </Box>
    );
  }

  if (!memories || memories.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300
      }}>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  // Responsive grid columns
  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3; // Default for desktop
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{ width: '100%' }}
    >
      <Grid 
        container 
        spacing={3} 
        sx={{ 
          p: { xs: 1, sm: 2 },
          '& .MuiGrid-item': {
            display: 'flex'
          }
        }}
      >
        {memories.map((memory) => (
          <Grid 
            key={memory?._id || memory?.id || Math.random().toString(36).substr(2, 9)}
            size={{ xs: 12, sm: 6, md: 4 }}
          >
            <motion.div 
              variants={item}
              style={{ 
                width: '100%',
                height: '100%'
              }}
            >
              <ErrorBoundary 
                fallback={
                  <Box 
                    sx={{ 
                      p: 2, 
                      border: '1px solid', 
                      borderColor: 'error.light',
                      borderRadius: 1,
                      bgcolor: 'error.light + 22',
                      width: '100%'
                    }}
                  >
                    <Typography color="error">
                      Error loading memory
                    </Typography>
                  </Box>
                }
              >
                <MemoryCard
                  memory={memory}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </ErrorBoundary>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default React.memo(MemoryGrid);