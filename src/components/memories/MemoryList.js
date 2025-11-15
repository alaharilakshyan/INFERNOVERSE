import React, { Suspense } from 'react';
import { Box, Grid, Typography } from '@mui/material';
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
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const MemoryList = ({ memories, onDelete, onEdit, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>Loading memories...</Typography>
      </Box>
    );
  }

  if (memories.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No memories yet. Add your first memory!
        </Typography>
      </Box>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{ width: '100%' }}
    >
      <Grid container spacing={2} sx={{ p: 2 }}>
        {memories.map((memory) => (
          <Grid key={memory._id || memory.id} xs={12} sm={4} item>
            <motion.div variants={item}>
              <ErrorBoundary fallback={<div>Error loading memory</div>}>
                <Suspense fallback={<div>Loading...</div>}>
                  <MemoryCard
                    memory={memory}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                </Suspense>
              </ErrorBoundary>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default MemoryList;