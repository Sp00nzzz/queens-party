import { useEffect } from 'react';

const AssetPreloader = () => {
  useEffect(() => {
    // Preload only the most critical images
    const criticalImages = [
      '/Assets/Map.png',
      '/Assets/Logo.png'
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Preload only essential audio files to reduce requests
    const preloadAudio = () => {
      const audioFiles = [
        '/Assets/Drinkingsound.mp3',
        '/Assets/Wink.mp3'
      ];

      audioFiles.forEach(src => {
        const audio = new Audio();
        audio.preload = 'metadata';
        audio.src = src;
      });
    };

    // Preload audio on first user interaction
    const handleUserInteraction = () => {
      preloadAudio();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  return null;
};

export default AssetPreloader;
