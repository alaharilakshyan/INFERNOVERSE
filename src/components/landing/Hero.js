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
  AutoAwesome as AutoAwesomeIcon,
  PhotoCamera as PhotoCameraIcon,
  Share as ShareIcon,
  Search as SearchIcon
} from '@mui/icons-material';

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(8, 0),
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
    zIndex: 1,
  }
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.1),
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  }
}));

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
      <HeroContainer>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    lineHeight: 1.2
                  }}
                >
                  Relive Your <Box component="span" color="secondary.main">Favorite Memories</Box>
                </Typography>
                
                <Typography 
                  variant="h6" 
                  component="p" 
                  sx={{ 
                    mb: 4,
                    maxWidth: '90%',
                    opacity: 0.9
                  }}
                >
                  Capture, organize, and cherish your most precious moments in one beautiful place.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ 
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      borderRadius: 2
                    }}
                  >
                    Get Started
                  </Button>
                  
                  <Button
                    component={RouterLink}
                    to="/about"
                    variant="outlined"
                    color="inherit"
                    size="large"
                    sx={{ 
                      px: 4,
                      py: 1.5,
                      fontWeight: 500,
                      borderRadius: 2,
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            
            {!isMobile && (
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <Box
                    component="img"
                    src="/images/hero-illustration.svg"
                    alt="Memory Vault"
                    sx={{ 
                      width: '100%', 
                      height: 'auto',
                      maxWidth: 600,
                      filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))'
                    }}
                  />
                </motion.div>
              </Grid>
            )}
          </Grid>
        </Container>
      </HeroContainer>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              sx={{ 
                mb: 6,
                fontWeight: 700
              }}
            >
              Why Choose Memory Vault?
            </Typography>
            
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
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
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          bgcolor: 'primary.light',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        gutterBottom
                        sx={{ fontWeight: 600 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </FeatureCard>
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