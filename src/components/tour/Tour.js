// src/components/tour/Tour.js
import { useEffect } from 'react';
import { useTour } from '@reactour/tour';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Tour = () => {
  const { currentUser } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setIsOpen, setSteps, setCurrentStep } = useTour();

  useEffect(() => {
    // Check if user is new (you might want to check this from your auth context)
    const isNewUser = localStorage.getItem('hasSeenTour') !== 'true';
    
    if (isNewUser && currentUser) {
      const tourSteps = [
        {
          selector: '.memory-upload-button',
          content: 'Click here to upload a new memory',
        },
        {
          selector: '.memory-grid',
          content: 'View all your memories in a beautiful grid',
        },
        {
          selector: '.favorite-button',
          content: 'Click the heart to add memories to your favorites',
        },
        {
          selector: '.profile-button',
          content: 'Update your profile and settings here',
        },
      ];

      setSteps(tourSteps);
      setCurrentStep(0);
      
      // Small delay to ensure the page is fully loaded
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('hasSeenTour', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentUser, pathname, setCurrentStep, setIsOpen, setSteps, navigate]);

  return null; // No need to render anything
};

export default Tour;