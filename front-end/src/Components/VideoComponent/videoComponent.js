import { FaShoppingCart, FaGlobe } from "react-icons/fa";
import { useState } from "react";
import { BMW, Alfa, Toyota } from './Assets/video'

import './videoComponent.css';

export const VideoComponent = () => {

  const Videos = [BMW, Alfa, Toyota];

  const [videoIndex, setVideoIndex] = useState(0)

  const myCallback = () => {
    if (videoIndex === (Videos.length -1)) {
      setVideoIndex(0)
    } else {
      setVideoIndex(videoIndex+1)
    }
  }

  return (
    <div id="Video" className='rounded-lg bg-[#767676] w-100 ml-8 mr-12 overflow-hidden relative'>

      <video src={Videos[videoIndex]} className="w-full h-[400px] object-cover" onEnded={() => myCallback()} autoPlay muted ></video>

      <div className='absolute top-24 left-32 h-[15rem] flex flex-col space-y-24'>
        <div>
          <h1 className='text-white text-4xl font-bold z-10	'>Découvrez notre incroyable<br />collection NFTWheels</h1>
        </div>
        <div className='w-100 flex space-x-9'>

          <a href="/Buy">
            <div id='Acheter' className='flex justify-center items-center space-x-3 w-32'>
              <FaShoppingCart size={23} />
              <button>Buy</button>
            </div>
          </a>

          <a href="/Explore">
            <div id='Explorer' className='flex justify-center items-center space-x-3 w-32'>
              <FaGlobe size={23} />
              <button>Explore</button>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}