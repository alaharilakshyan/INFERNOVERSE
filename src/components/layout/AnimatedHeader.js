import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const AnimatedHeader = ({ title, subtitle }) => {
  return (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle1" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </motion.div>
    </Box>
  );
};

export default AnimatedHeader;
