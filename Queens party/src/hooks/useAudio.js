import { useEffect, useRef } from 'react';

export const useAudio = (currentLocation, globalVolume) => {
  const audioRef = useRef(null);
  const aleAudioRef = useRef(null);
  const trinityAudioRef = useRef(null);
  const shwarmaAudioRef = useRef(null);
  const pizzaAudioRef = useRef(null);
  const popeyesAudioRef = useRef(null);
  const drinkingAudioRef = useRef(null);
  const winkAudioRef = useRef(null);

  // Optimized audio management with useCallback
  const handleAudioChange = () => {
    if (currentLocation === '/stagesMain' || currentLocation === '/stagesBar') {
      if (audioRef.current) {
        // Stop Ale House music if playing
        if (aleAudioRef.current) {
          aleAudioRef.current.pause();
          aleAudioRef.current.currentTime = 0;
        }
        // Play Stages music
        audioRef.current.volume = globalVolume;
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
        });
      }
    } else if (currentLocation === '/ale' || currentLocation === '/aleBar') {
      if (aleAudioRef.current) {
        // Stop other music if playing
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        if (trinityAudioRef.current) {
          trinityAudioRef.current.pause();
          trinityAudioRef.current.currentTime = 0;
        }
        // Play Ale House music
        aleAudioRef.current.volume = globalVolume;
        aleAudioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
        });
      }
    } else if (currentLocation === '/trinity' || currentLocation === '/trinityBar') {
      if (trinityAudioRef.current) {
        // Stop other music if playing
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        if (aleAudioRef.current) {
          aleAudioRef.current.pause();
          aleAudioRef.current.currentTime = 0;
        }
        // Play Trinity music
        trinityAudioRef.current.volume = globalVolume;
        trinityAudioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
        });
      }
        } else if (currentLocation === '/shwarma') {
          if (shwarmaAudioRef.current) {
            // Stop other music if playing
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            if (aleAudioRef.current) {
              aleAudioRef.current.pause();
              aleAudioRef.current.currentTime = 0;
            }
            if (trinityAudioRef.current) {
              trinityAudioRef.current.pause();
              trinityAudioRef.current.currentTime = 0;
            }
            if (pizzaAudioRef.current) {
              pizzaAudioRef.current.pause();
              pizzaAudioRef.current.currentTime = 0;
            }
            // Play Shwarma music
            shwarmaAudioRef.current.volume = globalVolume;
            shwarmaAudioRef.current.play().catch(error => {
              console.log('Audio play failed:', error);
            });
          }
        } else if (currentLocation === '/pizza') {
          if (pizzaAudioRef.current) {
            // Stop other music if playing
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            if (aleAudioRef.current) {
              aleAudioRef.current.pause();
              aleAudioRef.current.currentTime = 0;
            }
            if (trinityAudioRef.current) {
              trinityAudioRef.current.pause();
              trinityAudioRef.current.currentTime = 0;
            }
            if (shwarmaAudioRef.current) {
              shwarmaAudioRef.current.pause();
              shwarmaAudioRef.current.currentTime = 0;
            }
            if (popeyesAudioRef.current) {
              popeyesAudioRef.current.pause();
              popeyesAudioRef.current.currentTime = 0;
            }
            // Play Pizza music
            pizzaAudioRef.current.volume = globalVolume;
            pizzaAudioRef.current.play().catch(error => {
              console.log('Audio play failed:', error);
            });
          }
        } else if (currentLocation === '/popeyes') {
          if (popeyesAudioRef.current) {
            // Stop other music if playing
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            if (aleAudioRef.current) {
              aleAudioRef.current.pause();
              aleAudioRef.current.currentTime = 0;
            }
            if (trinityAudioRef.current) {
              trinityAudioRef.current.pause();
              trinityAudioRef.current.currentTime = 0;
            }
            if (shwarmaAudioRef.current) {
              shwarmaAudioRef.current.pause();
              shwarmaAudioRef.current.currentTime = 0;
            }
            if (pizzaAudioRef.current) {
              pizzaAudioRef.current.pause();
              pizzaAudioRef.current.currentTime = 0;
            }
            // Play Popeyes sound effect
            popeyesAudioRef.current.volume = globalVolume;
            popeyesAudioRef.current.play().catch(error => {
              console.log('Audio play failed:', error);
            });
          }
        } else {
      // Stop all music when not in any club
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (aleAudioRef.current) {
        aleAudioRef.current.pause();
        aleAudioRef.current.currentTime = 0;
      }
      if (trinityAudioRef.current) {
        trinityAudioRef.current.pause();
        trinityAudioRef.current.currentTime = 0;
      }
      if (shwarmaAudioRef.current) {
        shwarmaAudioRef.current.pause();
        shwarmaAudioRef.current.currentTime = 0;
      }
      if (pizzaAudioRef.current) {
        pizzaAudioRef.current.pause();
        pizzaAudioRef.current.currentTime = 0;
      }
      if (popeyesAudioRef.current) {
        popeyesAudioRef.current.pause();
        popeyesAudioRef.current.currentTime = 0;
      }
    }
  };

  // Audio effect
  useEffect(() => {
    handleAudioChange();
  }, [currentLocation, globalVolume]);

  // Update all audio elements when global volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = globalVolume;
    }
    if (aleAudioRef.current) {
      aleAudioRef.current.volume = globalVolume;
    }
    if (trinityAudioRef.current) {
      trinityAudioRef.current.volume = globalVolume;
    }
    if (shwarmaAudioRef.current) {
      shwarmaAudioRef.current.volume = globalVolume;
    }
    if (pizzaAudioRef.current) {
      pizzaAudioRef.current.volume = globalVolume;
    }
    if (popeyesAudioRef.current) {
      popeyesAudioRef.current.volume = globalVolume;
    }
    if (drinkingAudioRef.current) {
      drinkingAudioRef.current.volume = globalVolume;
    }
  }, [globalVolume]);

  return {
    audioRef,
    aleAudioRef,
    trinityAudioRef,
    shwarmaAudioRef,
    pizzaAudioRef,
    popeyesAudioRef,
    drinkingAudioRef,
    winkAudioRef
  };
};
