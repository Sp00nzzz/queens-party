import React, { useState, useEffect, useRef } from 'react';

const IntroVideo = ({ onVideoEnd, onFadeStart }) => {
  const [opacity, setOpacity] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
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
      console.log('Video metadata loaded');
      setIsLoading(false);
      
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

    const handleCanPlay = () => {
      console.log('Video can start playing');
      setIsLoading(false);
    };

    const handleWaiting = () => {
      console.log('Video is buffering...');
      setIsLoading(true);
    };

    const handlePlaying = () => {
      console.log('Video is playing');
      setIsLoading(false);
    };

    const handleStalled = () => {
      console.log('Video stalled, trying to recover...');
      setIsLoading(true);
      // Try to recover by seeking to current time
      if (video.currentTime > 0) {
        video.currentTime = video.currentTime;
      }
    };

    const handleError = (e) => {
      console.log('Intro video failed to load:', e);
      setHasError(true);
      setIsLoading(false);
      // Give it a moment before ending
      setTimeout(() => {
        onVideoEnd();
      }, 1000);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('stalled', handleStalled);
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
        preload="metadata"
        autoPlay
        muted
        crossOrigin="anonymous"
      >
        <source src="/Assets/Intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Loading indicator */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <div className="text-lg">Loading video...</div>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-white text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <div className="text-lg mb-2">Video failed to load</div>
            <div className="text-sm opacity-75">Skipping intro...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroVideo;
