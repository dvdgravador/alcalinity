import { useEffect, useState } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure the framework is ready
    const initializeFramework = async () => {
      try {
        // Add a small delay to ensure everything is properly initialized
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (typeof window !== 'undefined' && window.frameworkReady) {
          window.frameworkReady();
        }
        
        setIsReady(true);
      } catch (error) {
        console.error('Framework initialization error:', error);
        setIsReady(true); // Still set to true to prevent infinite loading
      }
    };

    initializeFramework();
  }, []);

  return isReady;
}