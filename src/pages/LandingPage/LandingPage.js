import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, Button, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

gsap.registerPlugin(ScrollTrigger);

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const LandingPage = () => {
  const titleRef = useRef();
  const cardsRef = useRef([]);

  useEffect(() => {
    // Animate title
    gsap.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    // Animate cards
    gsap.from(cardsRef.current, {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.features',
        start: 'top 80%',
      },
    });
  }, []);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography
          ref={titleRef}
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, mb: 4 }}
        >
          Preserve Your Precious Memories
        </Typography>
        
        <Typography variant="h5" color="text.secondary" sx={{ mb: 6, maxWidth: '800px' }}>
          Capture, store, and relive your most cherished moments with our secure and beautiful memory vault.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 12 }}>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Get Started
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Sign In
          </Button>
        </Box>

        <Box className="features" sx={{ width: '100%', mt: 8 }}>
          <Typography variant="h4" sx={{ mb: 6, fontWeight: 600 }}>
            Why Choose Memory Vault?
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
            {[
              {
                title: 'Secure Storage',
                description: 'Your memories are encrypted and stored securely in the cloud.',
                icon: '🔒',
              },
              {
                title: 'Beautiful Gallery',
                description: 'View your memories in a stunning, organized gallery.',
                icon: '🖼️',
              },
              {
                title: 'Easy Sharing',
                description: 'Share special moments with friends and family with a single click.',
                icon: '📤',
              },
            ].map((feature, index) => (
              <StyledCard
                key={feature.title}
                ref={el => (cardsRef.current[index] = el)}
                sx={{ maxWidth: 320 }}
              >
                <Typography variant="h3" sx={{ mb: 2, fontSize: '2.5rem' }}>
                  {feature.icon}
                </Typography>
                <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </StyledCard>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;