import React from 'react';
import trulloLogo from '../../assets/LogoTrullo.png';
const LoadingIndicator = () => {
  return (
    <div className="w-screen h-screen relative bg-black/80">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img className="w-[10rem]" src={trulloLogo} alt="trullo logo" />
        </div>
        <div className="absolute top-2/3 left-1/2 -translate-x-1/3 -translate-y-2/3 border-2 w-10 h-10 rounded-full border-blue-400 border-t-blue-400/10 animate-spin"></div>
    </div>
  )
}

export default LoadingIndicator
