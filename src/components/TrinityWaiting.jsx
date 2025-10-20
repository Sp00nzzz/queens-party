import React, { useEffect, useState, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TrinityWaiting = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(6);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const audioRef = useRef(null);
  const winkAudioRef = useRef(null);
  const phoneVibrateAudioRef = useRef(null);

  useEffect(() => {
    // Play background music when component mounts
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume to 50%
      audioRef.current.play().catch(error => {
        console.log('TrinityWaiting music play failed:', error);
      });
    }

    // Set up countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          navigate('/trinity');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Show phone popup after 3 seconds and play phone vibrate sound
    const phonePopupTimer = setTimeout(() => {
      setShowPhonePopup(true);
      if (phoneVibrateAudioRef.current) {
        phoneVibrateAudioRef.current.volume = 0.7;
        phoneVibrateAudioRef.current.play().catch(error => {
          console.log('Phone vibrate sound play failed:', error);
        });
      }
    }, 1300);

    // Cleanup intervals and pause audio on component unmount
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(phonePopupTimer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (winkAudioRef.current) {
        winkAudioRef.current.pause();
        winkAudioRef.current.currentTime = 0;
      }
      if (phoneVibrateAudioRef.current) {
        phoneVibrateAudioRef.current.pause();
        phoneVibrateAudioRef.current.currentTime = 0;
      }
    };
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black relative">
      {/* Background Music */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        controls={false}
        style={{ display: 'none' }}
      >
        <source src="/Assets/TrinityWaiting.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Wink Sound Effect */}
      <audio
        ref={winkAudioRef}
        preload="auto"
        controls={false}
        style={{ display: 'none' }}
      >
        <source src="/Assets/Wink.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Phone Vibrate Sound Effect */}
      <audio
        ref={phoneVibrateAudioRef}
        preload="auto"
        controls={false}
        style={{ display: 'none' }}
      >
        <source src="/Assets/PhoneVibrate.m4a" type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>
      
      <img 
        src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqL9n68nssBb2z-duRtZEaTMzI-oJIoxyZtjkwSjwinFTzr_YEL3YCETV5KOWyPzztloHhecxzBxhqz7x30d-rPjFFxYps05zUaGtXw5VRJ_SIQiXCtmDdU1fyPifp-NSTKYPO8uiKKdHdJ=s1360-w1360-h1020-rw"
        alt="Trinity Waiting"
        className="w-full h-full object-cover"
      />
      
      {/* Leave Button - Top Left */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 opacity-30 hover:opacity-100 text-white font-bold py-2 px-4 rounded-lg text-sm flex items-center gap-2 transform transition hover:scale-105 z-50"
      >
        <ArrowLeft className="w-4 h-4" />
        Leave
      </button>
      
      {/* Timer countdown overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-lg">
        <div className="text-center">
          <p className="text-lg font-semibold">Uh oh! Theres a line at Trin!</p>
          <p className="text-3xl font-bold text-white-400">{countdown}</p>
        </div>
      </div>

      {/* Phone Popup - Bottom Right Corner */}
      {showPhonePopup && (
        <div className="absolute bottom-4 right-20 z-50">
          <div className="animate-slide-up">
            <img 
              src="/Assets/Phonepopup.png"
              alt="Phone Popup" 
              draggable="false"
              className="w-128 h-96 object-contain"
            />
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes slideUp {
          0% { 
            transform: translateY(100px);
          }
          100% { 
            transform: translateY(0px);
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default memo(TrinityWaiting);
