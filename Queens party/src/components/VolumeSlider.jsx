import React, { useCallback } from 'react';

const VolumeSlider = ({ audioRef, globalVolume, setGlobalVolume }) => {
  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setGlobalVolume(newVolume);
  }, [setGlobalVolume]);

  return (
    <div className="flex items-center gap-2">
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={globalVolume}
        onChange={handleVolumeChange}
        className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
      />
      <span className="text-white text-sm w-8">{Math.round(globalVolume * 100)}%</span>
    </div>
  );
};

export default VolumeSlider;
