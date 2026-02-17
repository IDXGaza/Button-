
import React, { useState } from 'react';
import { Theme } from '../App';

interface Props {
  theme: Theme;
  onClick: () => void;
}

const InteractiveButton: React.FC<Props> = ({ theme, onClick }) => {
  const [isPressing, setIsPressing] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

  const handleClick = () => {
    // تأثير بصري سريع جداً عند النقر
    setIsPopping(true);
    onClick();
    setTimeout(() => setIsPopping(false), 200);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`relative transition-all duration-300 transform 
          ${isPressing ? 'scale-90' : 'hover:scale-105 active:scale-95'}
          ${isPopping ? 'scale-110' : ''}
        `}
      >
        {/* Glow Effect */}
        <div className={`absolute inset-0 rounded-full blur-[60px] opacity-40 transition-all duration-700
          ${theme.glowColor} ${isPopping ? 'scale-150 opacity-60' : 'scale-110'}
        `}></div>

        <button
          onMouseDown={() => setIsPressing(true)}
          onMouseUp={() => setIsPressing(false)}
          onMouseLeave={() => setIsPressing(false)}
          onClick={handleClick}
          className={`
            relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center 
            transition-all duration-150 border-b-[16px] md:border-b-[24px] active:border-b-0
            shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]
            bg-gradient-to-b ${theme.buttonFrom} ${theme.buttonTo} ${theme.buttonBorder}
            cursor-pointer active:translate-y-4 overflow-hidden
          `}
        >
          <svg 
            className={`w-32 h-32 text-white drop-shadow-2xl transition-transform duration-150 ${isPopping ? 'scale-125' : 'scale-100'}`}
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M13 10V3L4 14H11V21L20 10H13Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InteractiveButton;
