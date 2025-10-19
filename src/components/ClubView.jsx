import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { clubs, npcDialogueData } from '../constants/clubs';

const ClubView = ({
  clubKey,
  audioRef = null,
  drinkingAudioRef = null,
  winkAudioRef = null,
  drinkCount = 0,
  setDrinkCount = () => {},
  navigateToMap,
  navigateToStagesBar,
  navigateToAleBar,
  navigateToStages,
  navigateToAle,
  navigateToTrinityBar = () => {},
  navigateToTrinity = () => {},
  globalVolume,
  setGlobalVolume,
  currentArea: initialArea = 'main'
}) => {
  const [currentArea, setCurrentArea] = useState(initialArea);
  // Use global drink count instead of local state
  const localDrinkCount = drinkCount;
  const [hasDrink, setHasDrink] = useState(() => {
    return localStorage.getItem('hasDrink') === 'true';
  });
  const [hasBudlight, setHasBudlight] = useState(() => {
    return localStorage.getItem('hasBudlight') === 'true';
  });
  const [budlightDrinkCount, setBudlightDrinkCount] = useState(0);
  const [isDrinking, setIsDrinking] = useState(false);
      const [isWinking, setIsWinking] = useState(false);
      const [npcDialogues, setNpcDialogues] = useState({});
      const [isYesButtonDisabled, setIsYesButtonDisabled] = useState(false);
      const [isPizzaGuyEating, setIsPizzaGuyEating] = useState(false);
      const club = clubs[clubKey];

  // Sync currentArea with initialArea prop
  useEffect(() => {
    setCurrentArea(initialArea);
  }, [initialArea]);

  // Function to handle Yes button cooldown
  const handleYesButtonCooldown = useCallback(() => {
    setIsYesButtonDisabled(true);
    setTimeout(() => {
      setIsYesButtonDisabled(false);
    }, 650); // 0.65 second cooldown
  }, []);

  // Function to handle pizza guy eating animation
  const handlePizzaGuyClick = useCallback(() => {
    setIsPizzaGuyEating(true);
    // Play eating sound
    if (drinkingAudioRef.current) {
      drinkingAudioRef.current.src = "/Assets/EatingSound.mp3";
      drinkingAudioRef.current.currentTime = 0;
      drinkingAudioRef.current.play().catch(error => {
        console.log('Eating sound play failed:', error);
      });
    }
    setTimeout(() => {
      setIsPizzaGuyEating(false);
    }, 500); // 0.5 second eating animation
  }, [drinkingAudioRef]);


  // No need to sync since we're using global drink count

  // Optimized dialogue system with useCallback
  const createDialogueInterval = useCallback((interval) => {
    return setInterval(() => {
      const npcKeys = Object.keys(npcDialogueData);
      const randomNpc = npcKeys[Math.floor(Math.random() * npcKeys.length)];
      const dialogues = npcDialogueData[randomNpc];
      const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
      
      setNpcDialogues(prev => ({
        ...prev,
        [randomNpc]: {
          text: randomDialogue,
          show: true
        }
      }));

      // Hide dialogue after 4 seconds
      setTimeout(() => {
        setNpcDialogues(prev => ({
          ...prev,
          [randomNpc]: {
            ...prev[randomNpc],
            show: false
          }
        }));
      }, 4000);
    }, interval);
  }, []);

  // Optimized dialogue timing effect
  useEffect(() => {
    if (currentArea === 'main' && clubKey === 'stages') {
      const intervals = [
        createDialogueInterval(800),
        createDialogueInterval(1200),
        createDialogueInterval(1600),
        createDialogueInterval(2000),
        createDialogueInterval(2400),
        createDialogueInterval(2800),
        createDialogueInterval(3200)
      ];

      return () => {
        intervals.forEach(clearInterval);
      };
    } else if (currentArea === 'main' && clubKey === 'ale') {
      // More frequent dialogue for Ale House
      const intervals = [
        createDialogueInterval(1000),
        createDialogueInterval(1500),
        createDialogueInterval(2000),
        createDialogueInterval(2500),
        createDialogueInterval(3000),
        createDialogueInterval(3500),
        createDialogueInterval(4000),
        createDialogueInterval(4500)
      ];

      return () => {
        intervals.forEach(clearInterval);
      };
        } else if (currentArea === 'main' && clubKey === 'trinity') {
          // Trinity dialogue timing - now with 8 NPCs
          const intervals = [
            createDialogueInterval(1000),
            createDialogueInterval(1500),
            createDialogueInterval(2000),
            createDialogueInterval(2500),
            createDialogueInterval(3000),
            createDialogueInterval(3500),
            createDialogueInterval(4000),
            createDialogueInterval(4500)
          ];

      return () => {
        intervals.forEach(clearInterval);
      };
    } else if (currentArea === 'main' && clubKey === 'popeyes') {
      // Popeyes dialogue timing
      const intervals = [
        createDialogueInterval(1200),
        createDialogueInterval(1800),
        createDialogueInterval(2400),
        createDialogueInterval(3000),
        createDialogueInterval(3600),
        createDialogueInterval(4200),
      ];

      return () => {
        intervals.forEach(clearInterval);
      };
    }
  }, [currentArea, clubKey, createDialogueInterval]);

  // Optimized drinking animation with useCallback
  const handleDrinking = useCallback(() => {
    if (!hasBudlight) return;
    
    setIsDrinking(true);
    
    // Play appropriate sound based on venue
    if (clubKey === 'shwarma') {
      // Play eating sound for Shwarma
      if (drinkingAudioRef.current) {
        drinkingAudioRef.current.src = "/Assets/EatingSound.mp3";
        drinkingAudioRef.current.currentTime = 0;
        drinkingAudioRef.current.play().catch(error => {
          console.log('Eating sound play failed:', error);
        });
        
        // If this is the final bite (3rd bite), play burp sound after 1 second
        if (budlightDrinkCount + 1 >= 3) {
          setTimeout(() => {
            if (drinkingAudioRef.current) {
              drinkingAudioRef.current.src = "/Assets/Burp.mp3";
              drinkingAudioRef.current.currentTime = 0;
              drinkingAudioRef.current.play().catch(error => {
                console.log('Burp sound play failed:', error);
              });
            }
          }, 1000);
        }
      }
    } else {
      // Play drinking sound for other venues
      if (drinkingAudioRef.current) {
        drinkingAudioRef.current.src = "/Assets/Drinkingsound.mp3";
        drinkingAudioRef.current.currentTime = 0;
        drinkingAudioRef.current.play().catch(error => {
          console.log('Drinking sound play failed:', error);
        });
      }
    }
    
    // If holding Budlight, increment drink count
    if (hasBudlight) {
        const newDrinkCount = budlightDrinkCount + 1;
        setBudlightDrinkCount(newDrinkCount);
      
      // After 3 drinks, reset to regular hand
      if (newDrinkCount >= 3) {
        setHasBudlight(false);
        localStorage.setItem('hasBudlight', 'false');
        setBudlightDrinkCount(0);
      }
    }
    
    // Reset animation after 1 second
    setTimeout(() => {
      setIsDrinking(false);
    }, 1000);
  }, [hasBudlight, budlightDrinkCount, drinkingAudioRef, clubKey]);
  
  // Memoized background image function
  const getBackgroundImage = useCallback(() => {
    if (clubKey === 'stages') {
      if (currentArea === 'bar') {
        return "url('/Assets/StagesBar.png')";
      }
      return "url('/Assets/Stages.png')";
    }
    if (clubKey === 'ale') {
      if (currentArea === 'bar') {
        return "url('/Assets/AlehouseBar.jpg')";
      }
      return "url('/Assets/Alehouse.png')";
    }
        if (clubKey === 'trinity') {
          if (currentArea === 'bar') {
            return "url('/Assets/TrinBar.png')";
          }
          return "url('/Assets/TrinBackground.jpeg')";
        }
        if (clubKey === 'shwarma') {
          return "url('/Assets/ShwarmaDubaiInside.png')";
        }
        if (clubKey === 'pizza') {
          return "url('https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqRrTmJoxO1oNvGj8hZelDuoJKpDiCEwcR6Ml1pi6aax4xaHgbJo-l7xIwCJap18h47F7Ra8PXSVjiWoUT1Yxmc0xbm10UtNck9efQ5YkyOPX_dgqHb_jMetqHPz_3Vk9HPVKW_7Q=s1360-w1360-h1020-rw')";
        }
        if (clubKey === 'popeyes') {
          return "url('https://lh3.googleusercontent.com/gps-cs-s/AC9h4np_bF9bd4xQkIzO-qH-anhQ9J3rWNBDtxVP12Qhyc1DEE2InxXNx1lHxUMsIIqvn7A4-iWlSw_IzNSY8x76mogPFNenYo_BOpWSyjTxc-cYZDF9h3odTZlTPwZ49QEnP5DhlQfacg=s1360-w1360-h1020-rw')";
        }
        return 'none';
  }, [clubKey, currentArea]);

  // Memoized hand image source
  const handImageSrc = useMemo(() => {
    if (clubKey === 'shwarma' && hasBudlight) {
      if (budlightDrinkCount === 0) {
        return "/Assets/ShwarmaHand.png";
      } else if (budlightDrinkCount === 1) {
        return isDrinking ? "/Assets/ShwarmaHandBite.png" : "/Assets/ShwarmaHandBite.png";
      } else if (budlightDrinkCount === 2) {
        return isDrinking ? "/Assets/ShwarmaHandBite2.png" : "/Assets/ShwarmaHandBite2.png";
      }
      return "/Assets/Hand.png";
    } else if (hasBudlight) {
      return isDrinking ? "/Assets/BudlightHand2.png" : "/Assets/BudlightHand.png";
    }
    return "/Assets/Hand.png";
  }, [hasBudlight, isDrinking, clubKey, budlightDrinkCount]);

  // Memoized hand alt text
  const handAltText = useMemo(() => {
    if (clubKey === 'shwarma' && hasBudlight) {
      if (budlightDrinkCount === 0) {
        return "Hand with Shwarma";
      } else if (budlightDrinkCount === 1) {
        return isDrinking ? "Hand with Shwarma (biting)" : "Hand with Shwarma";
      } else if (budlightDrinkCount === 2) {
        return isDrinking ? "Hand with Shwarma (biting more)" : "Hand with Shwarma";
      }
      return "First Person Hand View";
    } else if (hasBudlight) {
      return "Hand with Budlight";
    }
    return "First Person Hand View";
  }, [hasBudlight, clubKey, budlightDrinkCount, isDrinking]);

      // Special simplified view for Stages, Ale House, Trinity, Shwarma, and Pizza
      if (clubKey === 'stages' || clubKey === 'ale' || clubKey === 'trinity' || clubKey === 'shwarma' || clubKey === 'pizza' || clubKey === 'popeyes') {
    return (
      <div 
        className="min-h-screen w-full relative overflow-hidden bg-black" 
        style={{ 
          backgroundImage: getBackgroundImage(), 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          animation: localDrinkCount > 8 ? `drunkSway ${Math.max(3 - (localDrinkCount - 8) * 0.1, 1)}s ease-in-out infinite` : 'none',
          '--drunk-intensity': localDrinkCount > 8 ? Math.min((localDrinkCount - 8) * 0.3, 5) : 0
        }}
      >
            {/* Club Lighting Effects - For all clubs except Shwarma, Pizza, and Popeyes */}
            {clubKey !== 'shwarma' && clubKey !== 'pizza' && clubKey !== 'popeyes' && (
          <div className="absolute inset-0 z-1">
            <div className="absolute inset-0 bg-white opacity-20" style={{ animation: 'strobe 0.1s linear infinite' }}></div>
            <div className="absolute inset-0 bg-red-500 opacity-15" style={{ animation: 'colorFlash 2s ease-in-out infinite' }}></div>
            <div className="absolute inset-0 bg-blue-500 opacity-15" style={{ animation: 'colorFlash 2.5s ease-in-out infinite 0.5s' }}></div>
            <div className="absolute inset-0 bg-purple-500 opacity-15" style={{ animation: 'colorFlash 3s ease-in-out infinite 1s' }}></div>
          </div>
        )}

        {/* Leave Club Button - Top Left */}
        <button
          onClick={navigateToMap}
          className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 opacity-30 hover:opacity-100 text-white font-bold py-2 px-4 rounded-lg text-sm flex items-center gap-2 transform transition hover:scale-105 z-20"
        >
          <ArrowLeft className="w-4 h-4" />
          Leave Club
        </button>

        {/* Beer Counter - Top Right */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-10 p-3 rounded-lg z-3">
          <div className="flex items-center gap-2">
            <img 
              src="/Assets/Budlight.png" 
              alt="Beer" 
              draggable="false" 
              className="w-20 h-20 object-contain"
            />
            <span className="text-white text-[25px] font-bold">{localDrinkCount}</span>
          </div>
          {hasBudlight && (
            <div className="mt-2 text-center">
              <span className="text-yellow-300 text-sm font-bold">
                Consumption: {budlightDrinkCount}/3
              </span>
            </div>
          )}
        </div>
        
        {/* Bar Arrow Button - Right Middle - Only for Stages Main Area */}
        {clubKey === 'stages' && currentArea === 'main' && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigateToStagesBar();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-600 bg-opacity-70 hover:bg-opacity-90 rounded-full z-40 transition-all duration-200 hover:scale-110 flex items-center justify-center"
          >
            <div className="w-0 h-0 border-r-0 border-l-8 border-t-4 border-b-4 border-r-transparent border-l-white border-t-transparent border-b-transparent"></div>
          </button>
        )}

        {/* Bar Arrow Button - Right Middle - Only for Ale Main Area */}
        {clubKey === 'ale' && currentArea === 'main' && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigateToAleBar();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-600 bg-opacity-70 hover:bg-opacity-90 rounded-full z-40 transition-all duration-200 hover:scale-110 flex items-center justify-center"
          >
            <div className="w-0 h-0 border-r-0 border-l-8 border-t-4 border-b-4 border-r-transparent border-l-white border-t-transparent border-b-transparent"></div>
          </button>
        )}

        {/* Bar Arrow Button - Right Middle - Only for Trinity Main Area */}
        {clubKey === 'trinity' && currentArea === 'main' && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigateToTrinityBar(); // Direct navigation to bar from Trinity main
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-600 bg-opacity-70 hover:bg-opacity-90 rounded-full z-40 transition-all duration-200 hover:scale-110 flex items-center justify-center"
          >
            <div className="w-0 h-0 border-r-0 border-l-8 border-t-4 border-b-4 border-r-transparent border-l-white border-t-transparent border-b-transparent"></div>
          </button>
        )}

        {/* Back Arrow Button - Right Middle - Only for Stages Bar Area */}
        {clubKey === 'stages' && currentArea === 'bar' && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigateToStages();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-600 bg-opacity-70 hover:bg-opacity-90 rounded-full z-20 transition-all duration-200 hover:scale-110 flex items-center justify-center"
          >
              <div className="w-0 h-0 border-l-0 border-r-8 border-t-4 border-b-4 border-l-transparent border-r-white border-t-transparent border-b-transparent"></div>
            </button>
        )}

        {/* Back Arrow Button - Right Middle - Only for Ale Bar Area */}
        {clubKey === 'ale' && currentArea === 'bar' && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigateToAle();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-600 bg-opacity-70 hover:bg-opacity-90 rounded-full z-20 transition-all duration-200 hover:scale-110 flex items-center justify-center"
          >
              <div className="w-0 h-0 border-l-0 border-r-8 border-t-4 border-b-4 border-l-transparent border-r-white border-t-transparent border-b-transparent"></div>
            </button>
        )}

        {/* Back Arrow Button - Right Middle - Only for Trinity Bar Area */}
        {clubKey === 'trinity' && currentArea === 'bar' && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigateToTrinity(); // Direct navigation to main from Trinity bar
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-600 bg-opacity-70 hover:bg-opacity-90 rounded-full z-20 transition-all duration-200 hover:scale-110 flex items-center justify-center"
          >
              <div className="w-0 h-0 border-l-0 border-r-8 border-t-4 border-b-4 border-l-transparent border-r-white border-t-transparent border-b-transparent"></div>
            </button>
        )}



        {/* Bartender - Only in bar area */}
        {(clubKey === 'stages' || clubKey === 'ale' || clubKey === 'trinity') && currentArea === 'bar' && (
          <div
            className="absolute z-5"
            style={{
              height: clubKey === 'trinity' ? '900px' : '700px',
              width: clubKey === 'trinity' ? '700px' : '700px',
              left: clubKey === 'trinity' ? '55%' : '60%',
              bottom: clubKey === 'trinity' ? '-220px' : '-10px',
              right: '0px',
              animation: 'npcLighting 4s ease-in-out infinite'
            }}
          >
            <img
              src={isWinking ? 
                (clubKey === 'ale' ? "/Assets/AlehouseBartenderWink.png" : 
                 clubKey === 'trinity' ? "/Assets/TrinityBartenderWink.png" : "/Assets/SydneysweeneyWink.png") : 
                (clubKey === 'ale' ? "/Assets/AleHouseBartender.png" : 
                 clubKey === 'trinity' ? "/Assets/TrinityBartender.png" : "/Assets/SydneySweeneyBartenderStages.png")}
              alt={clubKey === 'ale' ? "Ale House Bartender" : 
                    clubKey === 'trinity' ? "Trinity Bartender" : "Sydney Sweeney Bartender"} 
              draggable="false"
              className="h-full w-auto object-contain"
              style={{
                filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.3))',
                animation: isWinking ? 'none' : 'bounce 2s ease-in-out infinite'
              }}
            />
          </div>
        )}

        {/* Pizza Guy - Only for Pizza Pizza */}
        {clubKey === 'pizza' && (
          <div
            className="absolute bottom-0 right-0 z-5 cursor-pointer"
            style={{
              height: '700px',
              width: '700px',
              left: '30%',
              bottom: '-40px',
              animation: 'npcLighting 4s ease-in-out infinite'
            }}
            onClick={handlePizzaGuyClick}
          >
            <img
              src={isPizzaGuyEating ? "/Assets/PizzaguyEat.png" : "/Assets/PizzaGuy.png"}
              alt="Pizza Guy"
              draggable="false"
              className="h-full w-auto object-contain"
              style={{
                filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.3))',
                animation: isPizzaGuyEating ? 'none' : 'bounce 2s ease-in-out infinite'
              }}
            />
          </div>
        )}

        {/* Shwarma Man - Always visible in Shwarma Dubai */}
        {clubKey === 'shwarma' && (
          <div
            className="absolute z-5"
            style={{
              height: '700px',
              width: '700px',
              left: '60%',
              bottom: '-10px',
              right: '0px',
              animation: 'npcLighting 4s ease-in-out infinite'
            }}
          >
            <img
              src={isWinking ? "/Assets/ShwarmaGuyWink.png" : "/Assets/ShwarmaMan.png"}
              alt="Shwarma Man" 
              draggable="false"
              className="h-full w-auto object-contain"
              style={{
                filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.3))',
                animation: isWinking ? 'none' : 'bounce 2s ease-in-out infinite'
              }}
            />
          </div>
        )}

        {/* Popeyes Guys - Stacked in the middle */}
        {clubKey === 'popeyes' && (
          <>
            {/* Popeyes Guy 1 - Bottom */}
            <div
              className="absolute z-20"
              style={{
                height: '800px',
                width: '900px',
                left: '40%',
                bottom: '-50px',
                transform: 'translateX(-50%)',
                animation: 'bounce 2s ease-in-out infinite'
              }}
            >
              <img
                src="/Assets/PopeyesGuy1.png"
                alt="Popeyes Guy 1" 
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.3))'
                }}
              />
              {npcDialogues.popeyesGuy1?.show && (
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.popeyesGuy1.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* Popeyes Guy 2 - Middle */}
            <div
              className="absolute z-10"
              style={{
                height: '800px',
                width: '700px',
                left: '40%',
                bottom: '-50px',
                animation: 'bounce 2s ease-in-out infinite 0.3s'
              }}
            >
              <img
                src="/Assets/PopeyesGuy2.png"
                alt="Popeyes Guy 2" 
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.3))'
                }}
              />
              {npcDialogues.popeyesGuy2?.show && (
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.popeyesGuy2.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* Popeyes Guy 3 - Top */}
            <div
              className="absolute z-5"
              style={{
                height: '800px',
                width: '600px',
                left: '40%',
                bottom: '-70px',
                animation: 'bounce 2s ease-in-out infinite 0.6s'
              }}
            >
              <img
                src="/Assets/PopeyesGuy3.png"
                alt="Popeyes Guy 3" 
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.3))'
                }}
              />
              {npcDialogues.popeyesGuy3?.show && (
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.popeyesGuy3.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Always-visible Dialogue Box - Only in bar area */}
        {(clubKey === 'stages' || clubKey === 'ale' || clubKey === 'trinity') && currentArea === 'bar' && (
          <div className="absolute bottom-40 left-[35%] transform -translate-x-1/2 z-30">
            <div className="relative">
              <img 
                src="/Assets/dialouge.png" 
                alt="Dialogue Box" 
                draggable="false" 
                className="w-200 h-32 object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center">
              </div>
            </div>
            
            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isYesButtonDisabled) return; // Prevent spam clicking
                  
                  setDrinkCount(drinkCount + 1);
                  setHasDrink(true);
                  setHasBudlight(true);
                  localStorage.setItem('hasDrink', 'true');
                  localStorage.setItem('hasBudlight', 'true');
                  
                  // Trigger wink animation
                  setIsWinking(true);
                  // Play wink sound
                  if (winkAudioRef.current) {
                    winkAudioRef.current.currentTime = 0;
                    winkAudioRef.current.play().catch(error => {
                      console.log('Wink sound play failed:', error);
                    });
                  }
                  // Start cooldown
                  handleYesButtonCooldown();
                  setTimeout(() => {
                    setIsWinking(false);
                  }, 1000);
                }}
                disabled={isYesButtonDisabled}
                className={`hover:scale-110 transition-transform duration-200 ${isYesButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <img 
                  src="/Assets/Yesbutton.png" 
                  alt="Yes Button" 
                  draggable="false" 
                  className="w-20 h-12 object-contain"
                />
              </button>
              <button
                onClick={() => {
                  // No action needed for "No"
                }}
                className="hover:scale-110 transition-transform duration-200"
              >
                <img 
                  src="/Assets/NoButton.png" 
                  alt="No Button" 
                  draggable="false" 
                  className="w-20 h-12 object-contain"
                />
              </button>
            </div>
          </div>
        )}

        {/* Shwarma Man Dialogue Box - Always visible in Shwarma Dubai */}
        {clubKey === 'shwarma' && (
          <div className="absolute bottom-40 left-[35%] transform -translate-x-1/2 z-30">
            <div className="relative">
              <img 
                src="/Assets/ShwarmaDialogue.png" 
                alt="Shwarma Dialogue Box" 
                draggable="false"
                className="w-200 h-32 object-contain"
              />
            </div>
            
            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isYesButtonDisabled) return; // Prevent spam clicking
                  
                  // Shwarma decreases beer counter by 1
                  if (localDrinkCount > 0) {
                    setDrinkCount(localDrinkCount - 1);
                  }
                  setHasDrink(true);
                  setHasBudlight(true);
                  localStorage.setItem('hasDrink', 'true');
                  localStorage.setItem('hasBudlight', 'true');
                  
                  // Trigger wink animation
                  setIsWinking(true);
                  // Play wink sound
                  if (winkAudioRef.current) {
                    winkAudioRef.current.currentTime = 0;
                    winkAudioRef.current.play().catch(error => {
                      console.log('Wink sound play failed:', error);
                    });
                  }
                  // Start cooldown
                  handleYesButtonCooldown();
                  setTimeout(() => {
                    setIsWinking(false);
                  }, 1000);
                }}
                disabled={isYesButtonDisabled}
                className={`hover:scale-110 transition-transform duration-200 ${isYesButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <img 
                  src="/Assets/Yesbutton.png" 
                  alt="Yes Button" 
                  draggable="false"
                  className="w-20 h-12 object-contain"
                />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="hover:scale-110 transition-transform duration-200"
              >
                <img 
                  src="/Assets/NoButton.png" 
                  alt="No Button" 
                  draggable="false"
                  className="w-20 h-12 object-contain"
                />
              </button>
            </div>
          </div>
        )}

        {/* Hand Image - Bar Scene */}
        {(clubKey === 'stages' || clubKey === 'ale' || clubKey === 'trinity') && currentArea === 'bar' && (
          <div 
            className="absolute bottom-0"
            style={{
              height: '400px',
              width: '300px',
              right: '-400px',
              transform: 'translateY(100px)',
              animation: 'handBob 3s ease-in-out infinite'
            }}
          >
            <img 
              src={handImageSrc}
              alt={handAltText}
              className="h-full w-auto object-contain cursor-pointer" 
              draggable="false"
              onClick={handleDrinking}
              style={{
                filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.5))',
                maxHeight: '500px',
                maxWidth: '400px',
                width: '500px',
                height: '400px'
              }}
            />
          </div>
        )}

        {/* Hand Image - First Person View - Only in main area */}
        {currentArea === 'main' && (
          <div 
            className="absolute bottom-0 z-30"
            style={{
              height: '400px',
              width: '300px',
              right: '-400px',
              transform: 'translateY(100px)',
              animation: 'handBob 3s ease-in-out infinite'
            }}
          >
            <img 
              src={handImageSrc}
              alt={handAltText}
              className="h-full w-auto object-contain cursor-pointer" 
              draggable="false"
              onClick={handleDrinking}
              style={{
                filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.5))',
                maxHeight: '500px',
                maxWidth: '400px',
                width: '500px',
                height: '400px'
              }}
            />
          </div>
        )}

        {/* NPC Characters - Only show in main area for Stages */}
        {clubKey === 'stages' && currentArea === 'main' && (
          <>
            {/* Cityboyjj - Moving left to right */}
            <div 
              className="absolute left-0 z-5"
              style={{
                animation: 'walkLeftRight 8s ease-in-out infinite',
                height: '600px',
                width: '400px',
                bottom: '-100px'
              }}
            >
              <img 
                src="/Assets/CityboyjjStagesNPC.png"
                alt="Cityboyjj NPC" 
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 4s ease-in-out infinite'
                }}
              />
            </div>

            {/* Fratguy - Dancing in place */}
            <div 
              className="absolute bottom-0 right-1/2 z-5"
              style={{
                animation: 'dance 2s ease-in-out infinite',
                height: '600px',
                width: '400px',
                bottom: '-100px'
              }}
            >
              <img 
                src="/Assets/FratguyStagesNPC.png"
                alt="Fratguy NPC" 
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 5s ease-in-out infinite 1s'
                }}
              />
              {npcDialogues.fratguy?.show && (
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.fratguy.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* Frosh - Aggressive dancing */}
            <div 
              className="absolute bottom-0"
              style={{
                animation: 'aggressiveDance 1.5s ease-in-out infinite',
                height: '500px',
                width: '300px',
                bottom: '-100px',
                right: '800px',
                transform: 'translateX(-150px)'
              }}
            >
              <img 
                src="/Assets/FroshStagesNPC.png"
                alt="Frosh NPC" 
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 3s ease-in-out infinite 0.5s'
                }}
              />
              {npcDialogues.frosh?.show && (
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.frosh.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* Middleagement - LMFAO duo */}
            <div 
              className="absolute bottom-0 left-0 z-5"
              style={{
                animation: 'jumpUpDown 3s ease-in-out infinite',
                height: '750px',
                width: '500px',
                bottom: '-150px',
                left: '80px'  
              }}
            >
              <img 
                src="/Assets/middleagementStagesNPC.png"
                alt="Middleagement LMFAO NPC" 
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 4.5s ease-in-out infinite 2s'
                }}
              />
              {npcDialogues.middleagement?.show && (
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.middleagement.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* Whiteman - Monster Energy guy */}
            <div 
              className="absolute bottom-0 right-0 z-5"
              style={{
                animation: 'dance 3s ease-in-out infinite',
                height: '600px',
                width: '300px',
                bottom: '-50px',
                transform: 'translateX(50%)'
              }}
            >
              <img 
                src="/Assets/WhitemanStagesNPC.png"
                alt="Whiteman Monster Energy NPC" 
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 6s ease-in-out infinite 3s'
                }}
              />
              {npcDialogues.whiteman?.show && (
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.whiteman.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* Fratdude2 - Jumping up and down */}
            <div 
              className="absolute bottom-0 right-0 z-5"
              style={{
                animation: 'jumpUpDown 2s ease-in-out infinite',
                height: '500px',
                width: '300px',
                bottom: '-40px',
                right: '0px',
                transform: 'translateX(-150px)'
              }}
            >
              <img 
                src="/Assets/Fratdude2.png"
                alt="Fratdude2 NPC" 
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 4s ease-in-out infinite 2.5s'
                }}
              />
              {npcDialogues.fratdude2?.show && (
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.fratdude2.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* Rodrick - Cool leather jacket guy */}
            <div 
              className="absolute bottom-0 right-1/4 z-5"
              style={{
                animation: 'coolSway 3.5s ease-in-out infinite',
                height: '550px',
                width: '350px',
                bottom: '-50px',
                right: '-200px'
              }}
            >
              <img 
                src="/Assets/RodrickStageNPC.png"
                alt="Rodrick Leather Jacket NPC" 
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 5s ease-in-out infinite 0.8s'
                }}
              />
              {npcDialogues.rodrick?.show && (
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.rodrick.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* DivorcedDadStages - Cool dad dancing */}
            <div 
              className="absolute bottom-0 left-1/3 z-5"
              style={{
                animation: 'jumpUpDown 2.5s ease-in-out infinite',
                height: '580px',
                width: '400px',
                bottom: '-120px',
                left: '700px'
              }}
            >
              <img 
                src="/Assets/DivorcedDadStages.png"
                alt="Divorced Dad Stages NPC" 
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 4.2s ease-in-out infinite 1.8s'
                }}
              />
              {npcDialogues.divorcedDadStages?.show && (
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.divorcedDadStages.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>
          </>
        )}

        {/* NPC Characters - Only for Ale House Main Area */}
        {clubKey === 'ale' && currentArea === 'main' && (
          <>
            {/* FratDudesAle - Line dancing */}
            <div
              className="absolute left-0 z-5"
              style={{
                animation: 'lineDance 3s ease-in-out infinite',
                height: '500px',
                width: '350px',
                bottom: '-50px',
                left: '20px'
              }}
            >
              <img
                src="/Assets/FratDudesAle.png"
                alt="Frat Dudes Ale NPC"
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 4s ease-in-out infinite'
                }}
              />
            </div>

            {/* Dialogue bubble for FratDudesAle */}
            {npcDialogues.fratDudesAle?.show && (
              <div
                className="absolute top-0 z-10"
                style={{
                  left: '50px',
                  top: '200px',
                  animation: 'fadeInOut 2s ease-in-out'
                }}
              >
                <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                  {npcDialogues.fratDudesAle.text}
                </div>
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
              </div>
            )}

            {/* FratGuyAle - Two-step dancing */}
            <div
              className="absolute bottom-0 right-1/3 z-5"
              style={{
                animation: 'twoStep 2.5s ease-in-out infinite',
                height: '550px',
                width: '400px',
                bottom: '-100px',
                right: '50px'
              }}
            >
              <img
                src="/Assets/FratGuyAle.png"
                alt="Frat Guy Ale NPC"
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 5s ease-in-out infinite 1s'
                }}
              />
              {/* Dialogue bubble for FratGuyAle */}
              {npcDialogues.fratGuyAle?.show && (
                <div
                  className="absolute top-0 right-0 transform translate-x-2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.fratGuyAle.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* GingerAle - Hoedown dancing */}
            <div
              className="absolute bottom-0 left-1/2 z-5"
              style={{
                animation: 'hoedown 2s ease-in-out infinite',
                height: '480px',
                width: '320px',
                bottom: '-30px',
                left: '500px'
              }}
            >
              <img
                src="/Assets/GingerAle.png"
                alt="Ginger Ale NPC"
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 3.5s ease-in-out infinite 0.5s'
                }}
              />
              {/* Dialogue bubble for GingerAle */}
              {npcDialogues.gingerAle?.show && (
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.gingerAle.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* HawkTuahAle - Square dancing */}
            <div
              className="absolute bottom-0 right-0 z-5"
              style={{
                animation: 'squareDance 3.5s ease-in-out infinite',
                height: '520px',
                width: '380px',
                bottom: '-50px',
                right: '-90px'
              }}
            >
              <img
                src="/Assets/HawkTuahAle.png"
                alt="Hawk Tuah Ale NPC"
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 4.5s ease-in-out infinite 2s'
                }}
              />
              {/* Dialogue bubble for HawkTuahAle */}
              {npcDialogues.hawktuahAle?.show && (
                <div
                  className="absolute top-0 left-0 transform -translate-x-2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.hawktuahAle.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* OldDudeAle - Boot scootin' */}
            <div
              className="absolute bottom-0 right-0 z-5"
              style={{
                animation: 'bootScoot 2.8s ease-in-out infinite',
                height: '500px',
                width: '350px',
                bottom: '-50px',
                right: '300px'
              }}
            >
              <img
                src="/Assets/OldDudeAle.png"
                alt="Old Dude Ale NPC"
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 3.8s ease-in-out infinite 1.5s'
                }}
              />
              {/* Dialogue bubble for OldDudeAle */}
              {npcDialogues.olddudeAle?.show && (
                <div
                  className="absolute top-0 right-0 transform translate-x-2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.olddudeAle.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* CowboyAle - Country sway */}
            <div
              className="absolute bottom-0 left-1/4 z-5"
              style={{
                animation: 'countrySway 4s ease-in-out infinite',
                height: '480px',
                width: '320px',
                bottom: '-50px',
                left: '250px'
              }}
            >
              <img
                src="/Assets/CowboyAle.png"
                alt="Cowboy Ale NPC"
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 5.5s ease-in-out infinite 0.8s'
                }}
              />
              {/* Dialogue bubble for CowboyAle */}
              {npcDialogues.cowboyAle?.show && (
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.cowboyAle.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* TrishaPaytas - Dancing with energy */}
            <div
              className="absolute bottom-0 left-1/2 z-5"
              style={{
                animation: 'dance 1.5s ease-in-out infinite',
                height: '520px',
                width: '350px',
                bottom: '-80px',
                left: '600px'
              }}
            >
              <img
                src="/Assets/TrishaPaytas.png"
                alt="Trisha Paytas NPC"
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 3.2s ease-in-out infinite 1.2s'
                }}
              />
              {/* Dialogue bubble for TrishaPaytas */}
              {npcDialogues.trishaPaytas?.show && (
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.trishaPaytas.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>
          </>
        )}

        {/* NPC Characters - Only for Trinity Main Area */}
        {clubKey === 'trinity' && currentArea === 'main' && (
          <>
            {/* OldDudeTrin - Complaining about waiting */}
            <div
              className="absolute bottom-0 left-0 z-5"
              style={{
                animation: 'countrySway 4s ease-in-out infinite',
                height: '500px',
                width: '450px',
                bottom: '-100px',
                left: '-50px'
              }}
            >
              <img
                src="/Assets/OldDudeTrin.png"
                alt="Old Dude Trinity NPC"
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 4s ease-in-out infinite'
                }}
              />
              {/* Dialogue bubble for OldDudeTrin */}
              {npcDialogues.oldDudeTrin?.show && (
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.oldDudeTrin.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* AsianDudeTrin - Bad pickup lines */}
            <div
              className="absolute bottom-0 z-5"
              style={{
                animation: 'dance 2s ease-in-out infinite',
                height: '480px',
                width: '320px',
                bottom: '-80px',
                left: '400px'
              }}
            >
              <img
                src="/Assets/AsianDudeTrin.png"
                alt="Asian Dude Trinity NPC"
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 3.5s ease-in-out infinite 0.5s'
                }}
              />
              {/* Dialogue bubble for AsianDudeTrin */}
              {npcDialogues.asianDudeTrin?.show && (
                <div
                  className="absolute top-0 right-0 transform translate-x-2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.asianDudeTrin.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* BeerMascotTrin - Dollar beer enthusiast */}
            <div
              className="absolute bottom-0 z-5"
              style={{
                animation: 'jumpUpDown 2s ease-in-out infinite',
                height: '550px',
                width: '400px',
                bottom: '-50px',
                left: '700px'
              }}
            >
              <img
                src="/Assets/BeerMascotTrin.png"
                alt="Beer Mascot Trinity NPC"
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 3s ease-in-out infinite 1s'
                }}
              />
              {/* Dialogue bubble for BeerMascotTrin */}
              {npcDialogues.beerMascotTrin?.show && (
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.beerMascotTrin.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* DrunkDollarBeerTrin - Gibberish talker */}
            <div
              className="absolute bottom-0 z-5"
              style={{
                animation: 'coolSway 3s ease-in-out infinite',
                height: '480px',
                width: '320px',
                bottom: '-40px',
                left: '800px'
              }}
            >
              <img
                src="/Assets/DrunkDollarBeerTrin.png"
                alt="Drunk Dollar Beer Trinity NPC"
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 4.5s ease-in-out infinite 2s'
                }}
              />
              {/* Dialogue bubble for DrunkDollarBeerTrin */}
              {npcDialogues.drunkDollarBeerTrin?.show && (
                <div
                  className="absolute top-0 right-0 transform translate-x-2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.drunkDollarBeerTrin.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* FinanceBroTrin - Finance club bragger */}
            <div
              className="absolute bottom-0 z-5"
              style={{
                animation: 'dance 2.5s ease-in-out infinite',
                height: '520px',
                width: '380px',
                bottom: '-30px',
                left: '200px'
              }}
            >
              <img
                src="/Assets/FinanceBroTrin.png"
                alt="Finance Bro Trinity NPC"
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 3.8s ease-in-out infinite 1.5s'
                }}
              />
              {/* Dialogue bubble for FinanceBroTrin */}
              {npcDialogues.financeBroTrin?.show && (
                <div
                  className="absolute top-0 right-0 transform translate-x-2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.financeBroTrin.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* FinanceBro2Trin - Second finance bro */}
            <div
              className="absolute bottom-0 z-10"
              style={{
                animation: 'coolSway 3s ease-in-out infinite',
                height: '480px',
                width: '320px',
                bottom: '-40px',
                left: '700px'
              }}
            >
              <img
                src="/Assets/FinanceBro2Trin.png"
                alt="Finance Bro 2 Trinity NPC"
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 3.8s ease-in-out infinite 2.2s'
                }}
              />
              {/* Dialogue bubble for FinanceBro2Trin */}
              {npcDialogues.financeBro2Trin?.show && (
                <div
                  className="absolute top-0 right-0 transform translate-x-2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.financeBro2Trin.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>

            {/* BouncerTrin - Security bouncer */}
            <div
              className="absolute bottom-0 right-0 z-5"
              style={{
                animation: 'countrySway 4.5s ease-in-out infinite',
                height: '600px',
                width: '350px',
                bottom: '-50px',
                right: '50px'
              }}
            >
              <img
                src="/Assets/Bouncer.png"
                alt="Bouncer Trinity NPC"
                draggable="false"
                className="h-full w-auto object-contain"
                style={{
                  animation: 'npcLighting 5s ease-in-out infinite 0.3s'
                }}
              />
              {/* Dialogue bubble for BouncerTrin */}
              {npcDialogues.bouncerTrin?.show && (
                <div
                  className="absolute top-0 left-0 transform -translate-x-2 -translate-y-full z-10"
                  style={{
                    animation: 'fadeInOut 2s ease-in-out'
                  }}
                >
                  <div className="bg-white bg-opacity-95 text-black px-4 py-2 rounded-lg text-sm font-bold max-w-xs text-center border-2 border-gray-300">
                    {npcDialogues.bouncerTrin.text}
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white border-opacity-95 mx-auto"></div>
                </div>
              )}
            </div>
          </>
        )}

        {/* CSS Animations - Global */}
        <style jsx global>{`
          @keyframes walkLeftRight {
            0% { transform: translateX(-100px) translateY(0px) scaleX(1); }
            12.5% { transform: translateX(calc(12.5vw - 100px)) translateY(-8px) scaleX(1); }
            25% { transform: translateX(calc(25vw - 100px)) translateY(0px) scaleX(1); }
            37.5% { transform: translateX(calc(37.5vw - 100px)) translateY(-8px) scaleX(1); }
            49% { transform: translateX(calc(100vw - 300px)) translateY(0px) scaleX(1); }
            50% { transform: translateX(calc(100vw - 300px)) translateY(0px) scaleX(-1); }
            62.5% { transform: translateX(calc(87.5vw - 200px)) translateY(-8px) scaleX(-1); }
            75% { transform: translateX(calc(75vw - 200px)) translateY(0px) scaleX(-1); }
            87.5% { transform: translateX(calc(62.5vw - 200px)) translateY(-8px) scaleX(-1); }
            99% { transform: translateX(-100px) translateY(0px) scaleX(-1); }
            100% { transform: translateX(-100px) translateY(0px) scaleX(1); }
          }
          
          @keyframes dance {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(2deg); }
            50% { transform: translateY(-5px) rotate(0deg); }
            75% { transform: translateY(-15px) rotate(-2deg); }
          }
          
          @keyframes aggressiveDance {
            0%, 100% { 
              transform: translateX(-150px) translateY(0px) rotate(0deg) scale(1); 
            }
            10% { 
              transform: translateX(-150px) translateY(-30px) rotate(5deg) scale(1.05); 
            }
            20% { 
              transform: translateX(-150px) translateY(-10px) rotate(-3deg) scale(0.95); 
            }
            30% { 
              transform: translateX(-150px) translateY(-40px) rotate(8deg) scale(1.1); 
            }
            40% { 
              transform: translateX(-150px) translateY(-5px) rotate(-5deg) scale(0.9); 
            }
            50% { 
              transform: translateX(-150px) translateY(-35px) rotate(6deg) scale(1.08); 
            }
            60% { 
              transform: translateX(-150px) translateY(-15px) rotate(-4deg) scale(0.92); 
            }
            70% { 
              transform: translateX(-150px) translateY(-45px) rotate(7deg) scale(1.12); 
            }
            80% { 
              transform: translateX(-150px) translateY(-8px) rotate(-6deg) scale(0.88); 
            }
            90% { 
              transform: translateX(-150px) translateY(-25px) rotate(4deg) scale(1.03); 
            }
          }
          
          @keyframes jumpUpDown {
            0%, 100% { 
              transform: translateX(-150px) translateY(0px) scale(1); 
            }
            25% { 
              transform: translateX(-150px) translateY(-40px) scale(1.05); 
            }
            50% { 
              transform: translateX(-150px) translateY(0px) scale(1); 
            }
            75% { 
              transform: translateX(-150px) translateY(-40px) scale(1.05); 
            }
          }
          
          @keyframes coolSway {
            0%, 100% { 
              transform: translateX(0px) translateY(0px) rotate(0deg) scale(1); 
            }
            15% { 
              transform: translateX(5px) translateY(-8px) rotate(1deg) scale(1.02); 
            }
            30% { 
              transform: translateX(-3px) translateY(-5px) rotate(-0.5deg) scale(0.98); 
            }
            45% { 
              transform: translateX(8px) translateY(-12px) rotate(1.5deg) scale(1.03); 
            }
            60% { 
              transform: translateX(-5px) translateY(-8px) rotate(-1deg) scale(0.97); 
            }
            75% { 
              transform: translateX(6px) translateY(-10px) rotate(0.8deg) scale(1.01); 
            }
            90% { 
              transform: translateX(-2px) translateY(-6px) rotate(-0.3deg) scale(0.99); 
            }
          }
          
          /* Club Lighting Animations */
          @keyframes strobe {
            0%, 90% { opacity: 0; }
            95% { opacity: 0.3; }
            100% { opacity: 0; }
          }
          
          @keyframes colorFlash {
            0%, 100% { opacity: 0; }
            50% { opacity: 0.25; }
          }
          
          @keyframes handBob {
            0%, 100% { transform: translateX(-500px) translateY(40px); }
            50% { transform: translateX(-500px) translateY(20px); }
          }
          
          @keyframes npcLighting {
            0%, 100% { 
              filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.3)) brightness(1) hue-rotate(0deg)';
            }
            25% { 
              filter: 'drop-shadow(2px 2px 8px rgba(255,0,0,0.4)) brightness(1.2) hue-rotate(20deg)';
            }
            50% { 
              filter: 'drop-shadow(2px 2px 8px rgba(0,0,255,0.4)) brightness(1.1) hue-rotate(40deg)';
            }
            75% {
              filter: 'drop-shadow(2px 2px 8px rgba(255,0,255,0.4)) brightness(1.3) hue-rotate(60deg)';
            }
          }
          
          @keyframes bounce {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
            }
            50% { 
              transform: translateY(-10px) scale(1.02); 
            }
          }
          
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(10px); }
            10% { opacity: 1; transform: translateY(0px); }
            90% { opacity: 1; transform: translateY(0px); }
            100% { opacity: 0; transform: translateY(-10px); }
          }
          
          /* Ale House Country Dance Animations */
          @keyframes lineDance {
            0%, 100% { 
              transform: translateX(0px) translateY(0px) rotate(0deg); 
            }
            25% { 
              transform: translateX(20px) translateY(-5px) rotate(2deg); 
            }
            50% { 
              transform: translateX(0px) translateY(-10px) rotate(0deg); 
            }
            75% { 
              transform: translateX(-20px) translateY(-5px) rotate(-2deg); 
            }
          }
          
          @keyframes twoStep {
            0%, 100% { 
              transform: translateX(0px) translateY(0px) rotate(0deg) scale(1); 
            }
            20% { 
              transform: translateX(15px) translateY(-8px) rotate(1deg) scale(1.02); 
            }
            40% { 
              transform: translateX(-10px) translateY(-5px) rotate(-1deg) scale(0.98); 
            }
            60% { 
              transform: translateX(20px) translateY(-12px) rotate(2deg) scale(1.03); 
            }
            80% { 
              transform: translateX(-15px) translateY(-8px) rotate(-1.5deg) scale(0.97); 
            }
          }
          
          @keyframes hoedown {
            0%, 100% { 
              transform: translateX(0px) translateY(0px) rotate(0deg) scale(1); 
            }
            15% { 
              transform: translateX(25px) translateY(-15px) rotate(3deg) scale(1.05); 
            }
            30% { 
              transform: translateX(-20px) translateY(-10px) rotate(-2deg) scale(0.95); 
            }
            45% { 
              transform: translateX(30px) translateY(-20px) rotate(4deg) scale(1.08); 
            }
            60% { 
              transform: translateX(-25px) translateY(-12px) rotate(-3deg) scale(0.92); 
            }
            75% { 
              transform: translateX(20px) translateY(-18px) rotate(2deg) scale(1.02); 
            }
            90% { 
              transform: translateX(-15px) translateY(-8px) rotate(-1deg) scale(0.98); 
            }
          }
          
          @keyframes squareDance {
            0%, 100% { 
              transform: translateX(0px) translateY(0px) rotate(0deg) scale(1); 
            }
            12.5% { 
              transform: translateX(30px) translateY(-10px) rotate(2deg) scale(1.03); 
            }
            25% { 
              transform: translateX(0px) translateY(-20px) rotate(0deg) scale(1); 
            }
            37.5% { 
              transform: translateX(-30px) translateY(-10px) rotate(-2deg) scale(1.03); 
            }
            50% { 
              transform: translateX(0px) translateY(0px) rotate(0deg) scale(1); 
            }
            62.5% { 
              transform: translateX(30px) translateY(-10px) rotate(2deg) scale(1.03); 
            }
            75% { 
              transform: translateX(0px) translateY(-20px) rotate(0deg) scale(1); 
            }
            87.5% { 
              transform: translateX(-30px) translateY(-10px) rotate(-2deg) scale(1.03); 
            }
          }
          
          @keyframes bootScoot {
            0%, 100% { 
              transform: translateX(0px) translateY(0px) rotate(0deg) scale(1); 
            }
            20% { 
              transform: translateX(20px) translateY(-12px) rotate(2deg) scale(1.04); 
            }
            40% { 
              transform: translateX(-15px) translateY(-8px) rotate(-1.5deg) scale(0.96); 
            }
            60% { 
              transform: translateX(25px) translateY(-15px) rotate(2.5deg) scale(1.06); 
            }
            80% { 
              transform: translateX(-20px) translateY(-10px) rotate(-2deg) scale(0.94); 
            }
          }
          
          @keyframes countrySway {
            0%, 100% { 
              transform: translateX(0px) translateY(0px) rotate(0deg) scale(1); 
            }
            25% { 
              transform: translateX(15px) translateY(-8px) rotate(1.5deg) scale(1.02); 
            }
            50% { 
              transform: translateX(0px) translateY(-12px) rotate(0deg) scale(1); 
            }
            75% { 
              transform: translateX(-15px) translateY(-8px) rotate(-1.5deg) scale(1.02); 
            }
          }
          
          @keyframes drunkSway {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(calc(1.5deg * var(--drunk-intensity, 1))); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(calc(-1.5deg * var(--drunk-intensity, 1))); }
            100% { transform: rotate(0deg); }
          }
        `}</style>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen ${club.color} text-white p-6 relative overflow-hidden`} style={{ backgroundImage: getBackgroundImage(), backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{club.name}</h1>
            <p className="text-xl opacity-90">{club.music}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 bg-black bg-opacity-50 px-4 py-2 rounded-lg mb-2">
              <Beer className="w-5 h-5" />
              <span className="text-lg font-bold">{drinkCount} drinks</span>
            </div>
          </div>
        </div>

        <div className="bg-black bg-opacity-60 p-6 rounded-lg mb-6 border-2 border-white border-opacity-20">
          <p className="text-2xl mb-3 font-semibold">{club.description}</p>
          <p className="text-lg opacity-90">{club.ambiance}</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => {
              const amounts = [1, 2, 3, 1, 2, 1, 3, 2, 1, 4];
              const drinks = Math.floor(Math.random() * amounts.length);
              const drinkAmount = amounts[drinks];
              
              const messages = [
                `Bartender pours ${drinkAmount} ${drinkAmount === 1 ? 'drink' : 'drinks'}... heavy handed tonight!`,
                `You got ${drinkAmount}! ${drinkAmount > 2 ? 'Someone\'s getting messy' : 'Keeping it chill'}`,
                `${drinkAmount} coming right up! ${drinkAmount === 4 ? 'RIP tomorrow morning' : ''}`,
                `That'll be ${drinkAmount} ${drinkAmount === 1 ? 'drink' : 'drinks'}. Bartender's feeling generous!`
              ];
              
              setLastDrink(drinkAmount);
              setDrinkCount(prev => prev + drinkAmount);
              setBarMessage(messages[Math.floor(Math.random() * messages.length)]);
              
              setTimeout(() => setBarMessage(''), 3000);
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 px-8 rounded-lg text-xl flex items-center justify-center gap-3 transform transition hover:scale-105 shadow-lg"
          >
            <Beer className="w-8 h-8" />
            Go to Bar
          </button>

          {barMessage && (
            <div className="bg-green-600 bg-opacity-90 p-4 rounded-lg text-center animate-pulse">
              <p className="text-lg font-bold">{barMessage}</p>
              {lastDrink && lastDrink > 2 && (
                <p className="text-sm mt-1">🍺 {Array(lastDrink).fill('🍺').join(' ')}</p>
              )}
            </div>
          )}

          <button
            onClick={() => setLocation('map')}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg text-xl flex items-center justify-center gap-3 transform transition hover:scale-105"
          >
            <ArrowLeft className="w-6 h-6" />
            Leave Club
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ClubView);
