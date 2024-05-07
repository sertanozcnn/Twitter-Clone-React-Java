import React, { useState } from 'react'



const UserReelCard = () => {
    const [controlsVisible, setControlsVisible] = useState(false);


    return (
        <div className='w-[10rem] overflow-hidden rounded-lg'>

          <div className='pt-2' onMouseEnter={() => setControlsVisible(true)} onMouseLeave={() => setControlsVisible(false)}>
            <video controls={controlsVisible} className='w-full h-80' src='https://videos.pexels.com/video-files/4434242/4434242-uhd_2160_3840_24fps.mp4' />
          </div>
        </div>
      );
}

export default UserReelCard
