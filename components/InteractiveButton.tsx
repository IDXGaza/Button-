
import React, { useState } from 'react';
import { Theme } from '../App';

interface Props {
  theme: Theme;
  onClick: () => void;
}

const InteractiveButton: React.FC<Props> = ({ theme, onClick }) => {
  const [isPressing, setIsPressing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onClick();
    // إعادة ضبط الأنميشن بعد فترة قصيرة
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`relative transition-all duration-300 transform 
          ${isPressing ? 'scale-90' : 'hover:scale-105 active:scale-95'}
          ${isAnimating ? 'animate-bounce' : ''}
        `}
      >
        {/* هالة مضيئة خلف الزر تتبع السمة */}
        <div className={`absolute inset-0 rounded-full blur-[60px] opacity-40 transition-all duration-700
          ${theme.glowColor} ${isAnimating ? 'scale-150 opacity-60' : 'scale-110'}
        `}></div>

        <button
          onMouseDown={() => setIsPressing(true)}
          onMouseUp={() => setIsPressing(false)}
          onMouseLeave={() => setIsPressing(false)}
          onClick={handleClick}
          className={`
            relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center 
            transition-all duration-200 border-b-[16px] md:border-b-[24px] active:border-b-0
            shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)]
            bg-gradient-to-b ${theme.buttonFrom} ${theme.buttonTo} ${theme.buttonBorder}
            cursor-pointer active:translate-y-4
          `}
        >
          <div className={`transition-transform duration-300 ${isAnimating ? 'scale-125' : 'scale-100'}`}>
            <svg 
              className="w-32 h-32 text-white drop-shadow-xl" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <circle cx="12" cy="12" r="5" />
            </svg>
          </div>
        </button>
      </div>

      <p className="mt-8 text-slate-600 font-black text-xl tracking-wide opacity-40 animate-pulse pointer-events-none">
        انقر للتفاعل
      </p>
    </div>
  );
};

export default InteractiveButton;
