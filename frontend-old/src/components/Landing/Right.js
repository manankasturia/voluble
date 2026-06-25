import React from 'react'
import videoSrc from '../../assets/landingvideo.mp4'
const Right = () => {
  return (
    <div className='w-[40%] h-full flex justify-center items-center'><video
    src={videoSrc}
    autoPlay
    muted
    loop
    className="w-full h-auto rounded-lg shadow-lg object-cover"
  /></div>
  )
}

export default Right