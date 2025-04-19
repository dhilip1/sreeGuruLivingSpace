import { useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';

export const useScrollToHash = () => {
  const [location] = useLocation();

  const scrollToElement = useCallback((hash: string) => {
    // Remove the # character if it exists
    const id = hash.replace('#', '');
    
    // Find the element with the corresponding ID
    const element = document.getElementById(id);
    
    // If the element exists, scroll to it
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Small delay to ensure DOM is ready
    }
  }, []);

  useEffect(() => {
    // Check if the URL has a hash
    if (location === '/' && window.location.hash) {
      scrollToElement(window.location.hash);
    }
  }, [location, scrollToElement]);

  return { scrollToElement };
};