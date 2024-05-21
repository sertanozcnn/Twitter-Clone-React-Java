import { Box } from '@mui/material';
import React, { useState } from 'react';

const UserReelCard = ({ item }) => {
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFullscreenChange = () => {
    setIsFullScreen(!!document.fullscreenElement);
  };

  return (
    <div className='w-[10rem] overflow-hidden'>
      <div
        className='pt-4 relative'
        onMouseEnter={() => {
          setControlsVisible(true);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setControlsVisible(false);
          setIsHovered(false);
        }}
      >
        <Box className='rounded-lg pb-4'>
          <video
            className="w-full h-fit rounded-lg"
            posterResizeMode="cover"
            resizeMode="cover"
            src={item.video}
            onControlsChange={(e) => setControlsVisible(!e.target.controls)}
            controls={controlsVisible}
            onFullscreenChange={handleFullscreenChange}
          >
            <source type="video/mp4" />
          </video>
          {(isFullScreen || isHovered) && (
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)', width: '100%' }}>
              <p className='font-kanit text-gray-100' style={{ margin: 10 }}>{item.title}</p>
            </div>
          )}
        </Box>
      </div>
    </div>
  );
}

export default UserReelCard;
