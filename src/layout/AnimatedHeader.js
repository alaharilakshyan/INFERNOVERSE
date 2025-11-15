// src/components/layout/AnimatedHeader.js
import React from 'react';
import { SplitText } from '@reactbits-dev/text-animations';
import { Typography } from '@mui/material';

const AnimatedHeader = ({ text, variant = 'h4', ...props }) => {
  return (
    <Typography variant={variant} component="h1" {...props}>
      <SplitText
        initial={{ y: 20, opacity: 0 }}
        animate="visible"
        variants={{
          visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
              delay: i * 0.1,
              duration: 0.5,
              ease: 'easeOut',
            },
          }),
        }}
      >
        {text}
      </SplitText>
    </Typography>
  );
};

export default AnimatedHeader;