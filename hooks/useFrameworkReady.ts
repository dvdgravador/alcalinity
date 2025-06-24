import { useEffect, useState } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeFramework = () => {
      try {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
          if (window.frameworkReady) {
            window.frameworkReady();
          }
        }
        
        setIsReady(true);
      } catch (error) {
        console.error('Framework initialization error:', error);
        setIsReady(true); // Still set to true to prevent infinite loading
      }
    };

    // Use a small timeout to ensure the environment is ready
    const timer = setTimeout(initializeFramework, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return isReady;
}