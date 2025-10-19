import React, { useState, useEffect, useRef } from 'react';

const IntroVideo = ({ onVideoEnd, onFadeStart }) => {
  const [opacity, setOpacity] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to enable audio on any user interaction
    const enableAudio = () => {
      if (video.muted) {
        video.muted = false;
        console.log('Audio enabled on user interaction');
      }
    };

    // Add multiple event listeners to catch any user interaction
    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
    document.addEventListener('touchstart', enableAudio);
    document.addEventListener('mousemove', enableAudio);
    document.addEventListener('scroll', enableAudio);

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      
      // Start fading out when video is 80% complete
      const fadeStartTime = duration * 0.8;
      
      if (currentTime >= fadeStartTime) {
        const fadeProgress = (currentTime - fadeStartTime) / (duration - fadeStartTime);
        const newOpacity = Math.max(0, 1 - fadeProgress);
        setOpacity(newOpacity);
        
        // Notify parent component about fade progress
        if (onFadeStart) {
          onFadeStart(newOpacity);
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
      
      // Try to play with audio first
      video.muted = false;
      video.play().catch(error => {
        console.log('Audio autoplay failed, trying muted:', error);
        // If audio autoplay fails, try muted
        video.muted = true;
        video.play().catch(mutedError => {
          console.log('Muted autoplay also failed:', mutedError);
          onVideoEnd();
        });
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
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('mousemove', enableAudio);
      document.removeEventListener('scroll', enableAudio);
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
