import React, { useState, useEffect } from 'react';

const MobileDetector = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      // Check for mobile devices using multiple methods
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      
      // Check for mobile user agents
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isMobileUserAgent = mobileRegex.test(userAgent);
      
      // Check for touch capability and screen size
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      
      // Consider it mobile if it matches user agent OR (has touch AND small screen)
      const mobileDetected = isMobileUserAgent || (isTouchDevice && isSmallScreen);
      
      setIsMobile(mobileDetected);
      setIsLoading(false);
    };

    checkMobile();
    
    // Re-check on window resize
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isLoading) {
    return null; // Don't show anything while checking
  }

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
        <div className="text-center px-8">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-4">
            Sorry, the mobile experience isn't here yet
          </h1>
          <p className="text-white text-lg opacity-80">
            Please visit this site on a desktop or laptop for the full experience
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default MobileDetector;
