import React, { useState, useEffect, useRef } from 'react';

const PlumLogo = ({ onLogoEnd, videoOpacity = 1 }) => {
  const [opacity, setOpacity] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const logoRef = useRef(null);

  useEffect(() => {
    // Fade in immediately
    setOpacity(1);
  }, []);

  useEffect(() => {
    // Sync opacity with video fade
    setOpacity(videoOpacity);
    
    // Hide when video is completely faded
    if (videoOpacity <= 0) {
      setIsVisible(false);
      onLogoEnd();
    }
  }, [videoOpacity, onLogoEnd]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ opacity, backgroundColor: 'transparent' }}
    >
      <img
        ref={logoRef}
        src="/Assets/PlumLogo.png"
        alt="Plum Logo"
        className="max-w-80 max-h-80 object-contain"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
        }}
        onError={() => {
          console.log('PlumLogo.png not found, using fallback Logo.png');
          // Fallback to regular logo if PlumLogo doesn't exist
          if (logoRef.current) {
            logoRef.current.src = '/Assets/Logo.png';
          }
        }}
      />
    </div>
  );
};

export default PlumLogo;
