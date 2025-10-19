import React from 'react';

const MapView = ({ navigateToStages, navigateToAle, navigateToTrinity, navigateToShwarma, navigateToPizza, navigateToPopeyes }) => {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/Assets/Map.png"
            alt="Downtown Kingston Map" 
            draggable="false"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative h-full">
          <button
            onClick={navigateToShwarma}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
            style={{ top: '20%', left: '35%' }}
          >
            <div className="relative rounded-lg shadow-2xl transition-all group-hover:scale-110 border-2 border-white overflow-hidden" style={{ width: '180px', height: '120px' }}>
              <img 
                src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqoEdSRAXWtbSXA0zJbdqXU8RU6TcvSy_PL0lb38qzMmeDA6QdzB0GyUKXej2AtBwcd-8RZYGZEG9c-7yzIcRrO6IQ6y9q75MtaqPAdFCTdmdHDTBGnCPxFkevDEZpnox4o9yXXnQ=s1360-w1360-h1020-rw"
                alt="Shwarma Dubai" 
                draggable="false"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-30 transition-all flex items-end p-2">
                <div className="text-white text-left">
                  <p className="font-bold text-sm drop-shadow-lg">Shwarma Dubai</p>
                  <p className="text-xs opacity-90 drop-shadow-lg">Fresh & delicious</p>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={navigateToTrinity}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
            style={{ top: '42%', left: '31%' }}
          >
            <div className="relative rounded-lg shadow-2xl transition-all group-hover:scale-110 border-2 border-white overflow-hidden" style={{ width: '180px', height: '120px' }}>
              <img 
                src="https://www.kingstonist.com/wp-content/uploads/2021/09/Screen-Shot-2021-09-08-at-4.34.20-PM.png"
                alt="Trinity Social" 
                draggable="false"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-30 transition-all flex items-end p-2">
                <div className="text-white text-left">
                  <p className="font-bold text-sm drop-shadow-lg">Trinity Social</p>
                  <p className="text-xs opacity-90 drop-shadow-lg">63% commies</p>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={navigateToPopeyes}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
            style={{ top: '45%', left: '55%' }}
          >
            <div className="relative rounded-lg shadow-2xl transition-all group-hover:scale-110 border-2 border-white overflow-hidden" style={{ width: '180px', height: '120px' }}>
              <img 
                src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4noZOI0h3JbD2tKGnuk-vt6vaOYAdGeO3r8DecOSOuNt9zI7oN30rU2TllqdbOTHnpfO061KFsCBLEZEl6ZNHAKMB4cCwBUTdUi9tLdtdjPka_9MLpxH09nOvnpcgK18iP7DXb-3=s1360-w1360-h1020-rw"
                alt="Popeyes" 
                draggable="false"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-30 transition-all flex items-end p-2">
                <div className="text-white text-left">
                  <p className="font-bold text-sm drop-shadow-lg">Popeyes</p>
                  <p className="text-xs opacity-90 drop-shadow-lg">Louisiana Kitchen</p>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={navigateToAle}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
            style={{ top: '53%', left: '70%' }}
          >
            <div className="relative rounded-lg shadow-2xl transition-all group-hover:scale-110 border-2 border-white overflow-hidden" style={{ width: '180px', height: '120px' }}>
              <img 
                src="https://img.restaurantguru.com/r06e-The-Ale-House-and-Canteen-advertisement.jpg"
                alt="Ale House" 
                draggable="false"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-30 transition-all flex items-end p-2">
                <div className="text-white text-left">
                  <p className="font-bold text-sm drop-shadow-lg">Ale House</p>
                  <p className="text-xs opacity-90 drop-shadow-lg">TUMBLE TUESDAYS</p>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={navigateToStages}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
            style={{ top: '65%', left: '50%' }}
          >
            <div className="relative rounded-lg shadow-2xl transition-all group-hover:scale-110 border-2 border-white overflow-hidden" style={{ width: '180px', height: '120px' }}>
              <img 
                src="https://ipfs.indivision.ca/ipfs/Qmd6VmzTS2RpXwyUcnzZHmarHuspN4xouJ84Q7U6q4tege"
                alt="Stages Nightclub" 
                draggable="false"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-30 transition-all flex items-end p-2">
                <div className="text-white text-left">
                  <p className="font-bold text-sm drop-shadow-lg">Stages</p>
                  <p className="text-xs opacity-90 drop-shadow-lg">froshies probably here</p>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={navigateToPizza}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
            style={{ bottom: '-2%', left: '45%' }}
          >
            <div className="relative rounded-lg shadow-2xl transition-all group-hover:scale-110 border-2 border-white overflow-hidden" style={{ width: '180px', height: '120px' }}>
              <img 
                src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrteC3Ob-m3n6fDOKSa63wfJRvcqNTp_D9jajlYDag4VirODJ9dH13mHzHYSXuO7gTgie6KdCnwx8qSUXXPpYtLQtSVN0FdpFySxwNo7_0X9vntxwE4gZttPpqqR6U6u9Emg9Z0=s1360-w1360-h1020-rw"
                alt="Pizza Pizza" 
                draggable="false"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-30 transition-all flex items-end p-2">
                <div className="text-white text-left">
                  <p className="font-bold text-sm drop-shadow-lg">Pizza Pizza</p>
                  <p className="text-xs opacity-90 drop-shadow-lg">Late night cravings</p>
                </div>
              </div>
            </div>
          </button>
        </div>
        
        <div className="absolute bottom-4 right-4 z-30">
          <img 
            src="/Assets/Logo.png"
            alt="Logo" 
            draggable="false"
            className="w-15 h-15 object-contain"
            width="150px"
            height="150px"
          />
        </div>
      </div>
    </div>
  );
};

export default MapView;
