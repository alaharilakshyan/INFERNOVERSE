// src/components/landing/Hero.js
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  useTheme, 
  useMediaQuery,
  alpha,
  styled
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { 
  AutoAwesome as AutoAwesomeIcon, // Used for the new sub-heading
  PhotoCamera as PhotoCameraIcon,
  Share as ShareIcon,
  Search as SearchIcon
} from '@mui/icons-material';

// --- Styled Components ---

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.primary.dark, // Use a slightly darker primary for contrast
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(12, 0, 16, 0), // Increased vertical padding
  overflow: 'hidden',
  zIndex: 1,
  
  // Dynamic background element (Wave/Pattern)
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Soft radial gradient overlay for depth
    background: `radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.primary.dark, 0.9)} 100%)`,
    zIndex: 1,
  },

  // A subtle pattern/wave effect for visual interest (using pseudo-element)
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '150px',
    backgroundColor: theme.palette.background.default, // Match the feature section background
    clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 80%)', // Creates a soft, slanted bottom edge
    zIndex: 3, // Keep above the main content but below the container's zIndex: 2
  }
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.9), // Less transparent background for better readability
  borderRadius: theme.shape.borderRadius * 3, // Slightly more rounded corners
  padding: theme.spacing(4),
  height: '100%',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: theme.shadows[1],
  transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out',
  zIndex: 4, // Higher zIndex for cards
  '&:hover': {
    transform: 'translateY(-12px)', // More pronounced lift
    boxShadow: theme.shadows[10],
    border: `1px solid ${alpha(theme.palette.secondary.main, 0.5)}`, // Subtle border highlight
  }
}));

// Motion variants for staggered feature animation
const featureVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut"
    },
  }),
};


// --- Component ---

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <PhotoCameraIcon color="primary" fontSize="large" />,
      title: 'Capture Moments',
      description: 'Save your precious memories with photos, descriptions, and tags'
    },
    {
      icon: <ShareIcon color="primary" fontSize="large" />,
      title: 'Share Securely',
      description: 'Share your memories with friends and family with full control'
    },
    {
      icon: <SearchIcon color="primary" fontSize="large" />,
      title: 'Find Easily',
      description: 'Quickly find any memory with powerful search and filters'
    }
  ];

  return (
    <>
      {/* --- Main Hero Section --- */}
      <HeroContainer>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }} // Slide in from left
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, type: 'spring', stiffness: 50 }}
              >
                {/* New Sub-heading with icon */}
                <Typography 
                  variant="overline" 
                  display="block" 
                  gutterBottom
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: 'secondary.light', 
                    fontWeight: 600,
                    letterSpacing: 1.5,
                    mb: 2
                  }}
                >
                  <AutoAwesomeIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                  The Ultimate Digital Time Capsule
                </Typography>

                <Typography 
                  variant="h1" // Changed to h1 for higher visual hierarchy and impact
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 900, // Extra bold
                    fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                    lineHeight: 1.1,
                    mb: 3
                  }}
                >
                  Relive Your <Box component="span" sx={{
                      color: 'secondary.main', 
                      background: `linear-gradient(90deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>Favorite Moments</Box>
                </Typography>
                
                <Typography 
                  variant="h5" // Slightly larger descriptive text
                  component="p" 
                  sx={{ 
                    mb: 5,
                    maxWidth: { xs: '100%', md: '80%' },
                    opacity: 0.95,
                    fontWeight: 300,
                  }}
                >
                  Capture, organize, and cherish your most precious moments in one beautiful, secure, and easily searchable place.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ 
                      px: 5,
                      py: 1.75,
                      fontWeight: 700,
                      borderRadius: 3, // More rounded button
                      // Hover animation using a pseudo-element for a glow/lift effect
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 25px ${alpha(theme.palette.secondary.main, 0.4)}`,
                      }
                    }}
                  >
                    Get Started Now
                  </Button>
                  
                  <Button
                    component={RouterLink}
                    to="/about"
                    variant="outlined"
                    color="inherit"
                    size="large"
                    sx={{ 
                      px: 5,
                      py: 1.75,
                      fontWeight: 500,
                      borderRadius: 3,
                      borderWidth: 2,
                      opacity: 0.8,
                      '&:hover': {
                        borderWidth: 2,
                        opacity: 1,
                        bgcolor: alpha(theme.palette.common.black, 0.1),
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            
            {/* Illustration Grid - Only display on non-mobile */}
            {!isMobile && (
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }} // Slight rotation effect
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 1.2, type: 'spring', stiffness: 50 }}
                >
                  <Box
                    component="img"
                    src="/images/hero-illustration.svg"
                    alt="Memory Vault Illustration"
                    sx={{ 
                      width: '100%', 
                      height: 'auto',
                      maxWidth: 600,
                      // More prominent and colorful shadow
                      filter: `drop-shadow(0 25px 40px ${alpha(theme.palette.secondary.main, 0.3)})`,
                    }}
                  />
                </motion.div>
              </Grid>
            )}
          </Grid>
        </Container>
      </HeroContainer>

      {/* --- Features Section --- */}
      <Box 
        sx={{ 
          py: 10, 
          // Subtle gradient background for the feature section
          bgcolor: 'background.default',
          position: 'relative',
          zIndex: 0
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              sx={{ 
                mb: 8,
                fontWeight: 800,
                color: 'text.primary',
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Why Choose <Box component="span" color="primary.main">Memory Vault?</Box>
            </Typography>
            
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={featureVariants}
                  >
                    <FeatureCard>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center',
                          textAlign: 'center',
                          height: '100%'
                        }}
                      >
                        {/* Enhanced Icon Circle */}
                        <Box
                          sx={{
                            width: 90, // Slightly larger circle
                            height: 90,
                            borderRadius: '50%',
                            // Gradient background for the icon circle
                            background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${alpha(theme.palette.primary.main, 0.7)} 90%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            boxShadow: theme.shadows[4],
                            '& svg': {
                                color: theme.palette.common.black, // White icon for better contrast
                                fontSize: '2.5rem'
                            }
                          }}
                        >
                          {/* Clone icon but change color to white */}
                          {React.cloneElement(feature.icon, { color: 'inherit', fontSize: 'inherit' })}
                        </Box>

                        <Typography 
                          variant="h5" 
                          component="h3" 
                          gutterBottom
                          sx={{ fontWeight: 700 }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography color="text.secondary">
                          {feature.description}
                        </Typography>
                      </Box>
                    </FeatureCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default Hero;