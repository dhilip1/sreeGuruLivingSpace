import { useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';

export const useScrollToHash = () => {
  const [location] = useLocation();

  const scrollToElement = useCallback((hash: string) => {
    // Remove the # character if it exists
    const id = hash.replace('#', '');
    
    console.log(`Attempting to scroll to element with id: ${id}`);
    
    // Find the element with the corresponding ID
    const element = document.getElementById(id);
    
    // If the element exists, scroll to it
    if (element) {
      console.log(`Element found, scrolling to ${id}`);
      // Use a slightly longer delay to ensure all DOM elements are fully loaded
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      console.log(`Element with id '${id}' not found in the DOM`);
    }
  }, []);

  useEffect(() => {
    // Check if the URL has a hash when the component mounts or location changes
    if (window.location.hash) {
      // Add a slightly longer delay to ensure components have rendered
      setTimeout(() => {
        scrollToElement(window.location.hash);
      }, 500);
    }
  }, [location, scrollToElement]);

  // Also expose a function for manual scrolling
  const scrollToHash = (hashId: string) => {
    const hash = hashId.startsWith('#') ? hashId : `#${hashId}`;
    scrollToElement(hash);
  };

  return { scrollToElement, scrollToHash };
};