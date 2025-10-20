import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Settings, Volume2 } from 'lucide-react';
import MapView from './components/MapView';
import ClubView from './components/ClubView';
import VolumeSlider from './components/VolumeSlider';
import TrinityWaiting from './components/TrinityWaiting';
import AssetPreloader from './components/AssetPreloader';
import IntroVideo from './components/IntroVideo';
import PlumLogo from './components/PlumLogo';
import MobileDetector from './components/MobileDetector';
import { useAudio } from './hooks/useAudio';

// Main app component with routing
const QueensPartyApp = () => {
  return (
    <MobileDetector>
      <Router>
        <AppContent />
      </Router>
    </MobileDetector>
  );
};

// App content component that uses routing
const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drinkCount, setDrinkCount] = useState(0);
  const [lastDrink, setLastDrink] = useState(null);
  const [barMessage, setBarMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showPlumLogo, setShowPlumLogo] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(1);
  
  // Global volume state
  const [globalVolume, setGlobalVolume] = useState(() => {
    const savedVolume = localStorage.getItem('globalVolume');
    return savedVolume ? parseFloat(savedVolume) : 0.7;
  });

  // Get current location from URL
  const currentLocation = location.pathname;

  // Navigation functions
  const navigateToMap = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const navigateToStages = useCallback(() => {
    navigate('/stagesMain');
  }, [navigate]);

  const navigateToStagesBar = useCallback(() => {
    navigate('/stagesBar');
  }, [navigate]);

  const navigateToAle = useCallback(() => {
    navigate('/ale');
  }, [navigate]);

  const navigateToAleBar = useCallback(() => {
    navigate('/aleBar');
  }, [navigate]);

  const navigateToTrinity = useCallback(() => {
    navigate('/trinwaiting');
  }, [navigate]);

  const navigateToShwarma = useCallback(() => {
    navigate('/shwarma');
  }, [navigate]);

  const navigateToPizza = useCallback(() => {
    navigate('/pizza');
  }, [navigate]);

  const navigateToPopeyes = useCallback(() => {
    navigate('/popeyes');
  }, [navigate]);

  const navigateToTrinityBar = useCallback(() => {
    navigate('/trinityBar');
  }, [navigate]);

  const navigateToTrinityMain = useCallback(() => {
    navigate('/trinity');
  }, [navigate]);

  // Handle intro video end
  const handleIntroEnd = useCallback(() => {
    setShowIntro(false);
  }, []);

  // Handle video fade progress
  const handleVideoFade = useCallback((opacity) => {
    setVideoOpacity(opacity);
  }, []);

  // Handle PlumLogo end
  const handlePlumLogoEnd = useCallback(() => {
    setShowPlumLogo(false);
  }, []);


  // Use audio hook
  const { audioRef, aleAudioRef, trinityAudioRef, shwarmaAudioRef, pizzaAudioRef, popeyesAudioRef, drinkingAudioRef, winkAudioRef } = useAudio(currentLocation, globalVolume);

  // Save volume to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('globalVolume', globalVolume.toString());
  }, [globalVolume]);

  // Save drink count to localStorage whenever it changes
  // Removed localStorage persistence for drink count - now resets per session

  return (
    <div>
      <AssetPreloader />
      
      {/* Intro Video */}
      {showIntro && (
        <IntroVideo onVideoEnd={handleIntroEnd} onOpacityChange={handleVideoFade} />
      )}

      {/* PlumLogo - Shows on top of intro video */}
      {showIntro && (
        <PlumLogo onLogoEnd={handlePlumLogoEnd} videoOpacity={videoOpacity} />
      )}
      <audio
        ref={audioRef}
        loop
        preload="none"
        controls={false}
        style={{ display: 'none' }}
      >
        <source src="/Assets/stagesmusic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <audio
        ref={aleAudioRef}
        loop
        preload="none"
        controls={false}
        style={{ display: 'none' }}
      >
        <source src="/Assets/AleHouseMusic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <audio
        ref={trinityAudioRef}
        loop
        preload="none"
        controls={false}
        style={{ display: 'none' }}
      >
        <source src="/Assets/TrinityMusic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <audio
        ref={shwarmaAudioRef}
        loop
        preload="none"
        controls={false}
        style={{ display: 'none' }}
      >
        <source src="/Assets/ShwarmaDubaiMusic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <audio
        ref={pizzaAudioRef}
        loop
        preload="none"
        controls={false}
        style={{ display: 'none' }}
      >
        <source src="/Assets/PizzaPizzaMusic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <audio
        ref={popeyesAudioRef}
        loop
        preload="none"
        controls={false}
        style={{ display: 'none' }}
      >
        <source src="/Assets/PopeyesSoundEffect.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <audio
        ref={drinkingAudioRef}
        preload="none"
        controls={false}
        style={{ display: 'none' }}
      >
        <source src="/Assets/Drinkingsound.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <audio
        ref={winkAudioRef}
        preload="none"
        controls={false}
        style={{ display: 'none' }}
      >
        <source src="/Assets/Wink.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Budlight Beer Ad - Always visible on every page */}
      <div className="absolute bottom-0 left-0 z-50">
        <img 
          src="/Assets/BudlightBeerAd.png"
          alt="Budlight Beer Advertisement" 
          draggable="false"
          className="w-80 h-70 object-contain hover:scale-105 transition-transform duration-200 cursor-pointer"
          onClick={() => window.open('https://www.budlight.com/', '_blank')}
        />
      </div>

      {/* Settings Icon - Fixed positioning like Budlight ad - Hidden on map view */}
      {currentLocation !== '/' && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowSettings(!showSettings);
          }}
          className="fixed bottom-4 right-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full z-50 transition-all duration-200 hover:scale-110"
        >
          <Settings className="w-6 h-6" />
        </button>
      )}

      {/* Settings Popup - Fixed positioning relative to fixed settings icon - Hidden on map view */}
      {currentLocation !== '/' && showSettings && (
        <div className="fixed bottom-16 right-4 bg-black bg-opacity-90 p-4 rounded-lg z-[9999] min-w-[200px]">
          <div className="flex items-center gap-2 mb-3">
            <Volume2 className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Volume</span>
          </div>
          <VolumeSlider audioRef={audioRef} globalVolume={globalVolume} setGlobalVolume={setGlobalVolume} />
        </div>
      )}
      
      <Routes>
            <Route path="/" element={<MapView navigateToStages={navigateToStages} navigateToAle={navigateToAle} navigateToTrinity={navigateToTrinity} navigateToShwarma={navigateToShwarma} navigateToPizza={navigateToPizza} navigateToPopeyes={navigateToPopeyes} />} />
        <Route path="/stagesMain" element={<ClubView clubKey="stages" audioRef={audioRef} drinkingAudioRef={drinkingAudioRef} winkAudioRef={winkAudioRef} drinkCount={drinkCount} setDrinkCount={setDrinkCount} navigateToMap={navigateToMap} navigateToStagesBar={navigateToStagesBar} navigateToStages={navigateToStages} globalVolume={globalVolume} setGlobalVolume={setGlobalVolume} />} />
        <Route path="/stagesBar" element={<ClubView clubKey="stages" audioRef={audioRef} drinkingAudioRef={drinkingAudioRef} winkAudioRef={winkAudioRef} drinkCount={drinkCount} setDrinkCount={setDrinkCount} navigateToMap={navigateToMap} navigateToStagesBar={navigateToStagesBar} navigateToStages={navigateToStages} globalVolume={globalVolume} setGlobalVolume={setGlobalVolume} currentArea="bar" />} />
        <Route path="/ale" element={<ClubView clubKey="ale" audioRef={aleAudioRef} drinkingAudioRef={drinkingAudioRef} winkAudioRef={winkAudioRef} drinkCount={drinkCount} setDrinkCount={setDrinkCount} navigateToMap={navigateToMap} navigateToStagesBar={() => {}} navigateToAleBar={navigateToAleBar} navigateToAle={navigateToAle} globalVolume={globalVolume} setGlobalVolume={setGlobalVolume} />} />
        <Route path="/aleBar" element={<ClubView clubKey="ale" audioRef={aleAudioRef} drinkingAudioRef={drinkingAudioRef} winkAudioRef={winkAudioRef} drinkCount={drinkCount} setDrinkCount={setDrinkCount} navigateToMap={navigateToMap} navigateToStagesBar={() => {}} navigateToAleBar={navigateToAleBar} navigateToAle={navigateToAle} globalVolume={globalVolume} setGlobalVolume={setGlobalVolume} currentArea="bar" />} />
        <Route path="/trinwaiting" element={<TrinityWaiting />} />
        <Route path="/trinity" element={<ClubView clubKey="trinity" audioRef={trinityAudioRef} drinkingAudioRef={drinkingAudioRef} winkAudioRef={winkAudioRef} drinkCount={drinkCount} setDrinkCount={setDrinkCount} navigateToMap={navigateToMap} navigateToStagesBar={() => {}} navigateToAleBar={() => {}} navigateToTrinityBar={navigateToTrinityBar} navigateToTrinity={navigateToTrinity} globalVolume={globalVolume} setGlobalVolume={setGlobalVolume} />} />
        <Route path="/trinityBar" element={<ClubView clubKey="trinity" audioRef={trinityAudioRef} drinkingAudioRef={drinkingAudioRef} winkAudioRef={winkAudioRef} drinkCount={drinkCount} setDrinkCount={setDrinkCount} navigateToMap={navigateToMap} navigateToStagesBar={() => {}} navigateToAleBar={() => {}} navigateToTrinityBar={navigateToTrinityBar} navigateToTrinity={navigateToTrinityMain} globalVolume={globalVolume} setGlobalVolume={setGlobalVolume} currentArea="bar" />} />
        <Route path="/shwarma" element={<ClubView clubKey="shwarma" audioRef={shwarmaAudioRef} drinkingAudioRef={drinkingAudioRef} winkAudioRef={winkAudioRef} drinkCount={drinkCount} setDrinkCount={setDrinkCount} navigateToMap={navigateToMap} navigateToStagesBar={() => {}} navigateToAleBar={() => {}} navigateToTrinityBar={() => {}} navigateToTrinity={() => {}} globalVolume={globalVolume} setGlobalVolume={setGlobalVolume} />} />
        <Route path="/pizza" element={<ClubView clubKey="pizza" audioRef={pizzaAudioRef} drinkingAudioRef={drinkingAudioRef} winkAudioRef={winkAudioRef} drinkCount={drinkCount} setDrinkCount={setDrinkCount} navigateToMap={navigateToMap} navigateToStagesBar={() => {}} navigateToAleBar={() => {}} navigateToTrinityBar={() => {}} navigateToTrinity={() => {}} globalVolume={globalVolume} setGlobalVolume={setGlobalVolume} />} />
        <Route path="/popeyes" element={<ClubView clubKey="popeyes" audioRef={popeyesAudioRef} drinkingAudioRef={drinkingAudioRef} winkAudioRef={winkAudioRef} drinkCount={drinkCount} setDrinkCount={setDrinkCount} navigateToMap={navigateToMap} navigateToStagesBar={() => {}} navigateToAleBar={() => {}} navigateToTrinityBar={() => {}} navigateToTrinity={() => {}} globalVolume={globalVolume} setGlobalVolume={setGlobalVolume} />} />
      </Routes>
    </div>
  );
};

export default QueensPartyApp;
