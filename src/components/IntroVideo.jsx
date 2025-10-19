import React, { useState, useEffect, useRef } from 'react';

const IntroVideo = ({ onVideoEnd, onOpacityChange }) => {
  const [opacity, setOpacity] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle user interaction to enable audio playback
    const enableAudio = () => {
      video.muted = false;
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      
      // Start fading out when video is 80% complete
      const fadeStartTime = duration * 0.8;
      
      if (currentTime >= fadeStartTime) {
        const fadeProgress = (currentTime - fadeStartTime) / (duration - fadeStartTime);
        const newOpacity = Math.max(0, 1 - fadeProgress);
        setOpacity(newOpacity);
        
        // Pass opacity to parent component for PlumLogo sync
        if (onOpacityChange) {
          onOpacityChange(newOpacity);
        }
        
        // Also fade out the audio volume
        const baseVolume = localStorage.getItem('globalVolume') ? 
          parseFloat(localStorage.getItem('globalVolume')) : 0.7;
        video.volume = baseVolume * newOpacity;
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setOpacity(0);
      onVideoEnd();
    };

    const handleLoadedMetadata = () => {
      // Set volume to match global volume if available
      const globalVolume = localStorage.getItem('globalVolume');
      if (globalVolume) {
        video.volume = parseFloat(globalVolume);
      } else {
        video.volume = 0.7; // Default volume
      }
      
      // Start playing the video with audio
      video.play().catch(error => {
        console.log('Video autoplay failed:', error);
        // If autoplay fails, end the intro immediately
        onVideoEnd();
      });
    };

    const handleError = () => {
      console.log('Intro video failed to load, skipping intro');
      onVideoEnd();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };
  }, [onVideoEnd]);

  if (!isPlaying && opacity === 0) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      style={{ opacity }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        preload="auto"
        autoPlay
        muted
      >
        <source src="/Assets/Intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default IntroVideo;
