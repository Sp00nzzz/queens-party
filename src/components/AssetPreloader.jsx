import { useEffect } from 'react';

const AssetPreloader = () => {
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      '/Assets/Map.png',
      '/Assets/Logo.png',
      '/Assets/BudlightBeerAd.png',
      '/Assets/dialouge.png',
      '/Assets/Yesbutton.png',
      '/Assets/Nobutton.png'
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Preload critical audio files only when user interacts
    const preloadAudio = () => {
      const audioFiles = [
        '/Assets/stagesmusic.mp3',
        '/Assets/AleHouseMusic.mp3',
        '/Assets/TrinityMusic.mp3',
        '/Assets/ShwarmaDubaiMusic.mp3',
        '/Assets/PizzaPizzaMusic.mp3',
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
