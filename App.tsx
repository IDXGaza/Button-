
import React, { useState, useCallback } from 'react';
import InteractiveButton from './components/InteractiveButton';
import ThemeSelector from './components/ThemeSelector';
import { playZaSound } from './utils/audio';

export interface Theme {
  id: string;
  name: string;
  buttonFrom: string;
  buttonTo: string;
  buttonBorder: string;
  bgClass: string;
  glowColor: string;
}

const themes: Theme[] = [
  { 
    id: 'indigo', 
    name: 'أرجواني', 
    buttonFrom: 'from-indigo-600', 
    buttonTo: 'to-indigo-800', 
    buttonBorder: 'border-indigo-900', 
    bgClass: 'bg-indigo-400',
    glowColor: 'bg-indigo-300'
  },
  { 
    id: 'rose', 
    name: 'وردي', 
    buttonFrom: 'from-rose-600', 
    buttonTo: 'to-rose-800', 
    buttonBorder: 'border-rose-900', 
    bgClass: 'bg-rose-400',
    glowColor: 'bg-rose-300'
  },
  { 
    id: 'emerald', 
    name: 'زمردي', 
    buttonFrom: 'from-emerald-600', 
    buttonTo: 'to-emerald-800', 
    buttonBorder: 'border-emerald-900', 
    bgClass: 'bg-emerald-400',
    glowColor: 'bg-emerald-300'
  },
  { 
    id: 'amber', 
    name: 'كهرماني', 
    buttonFrom: 'from-amber-600', 
    buttonTo: 'to-amber-800', 
    buttonBorder: 'border-amber-900', 
    bgClass: 'bg-amber-400',
    glowColor: 'bg-amber-300'
  }
];

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  const handleAction = useCallback(() => {
    playZaSound();
    console.log("Zzzzz sound played!");
  }, []);

  return (
    <div className={`h-full w-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${currentTheme.bgClass} overflow-hidden relative`}>
      
      <div className="absolute top-6 right-6 z-50">
        <ThemeSelector 
          themes={themes} 
          currentTheme={currentTheme} 
          onSelect={setCurrentTheme} 
        />
      </div>

      {/* تأثيرات إضاءة خلفية ضخمة لتعزيز وضوح اللون */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className={`absolute top-0 left-0 w-full h-full opacity-20 bg-gradient-to-b from-white/30 to-black/20`}></div>
        <div className={`absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full blur-[150px] opacity-70 transition-colors duration-1000 ${currentTheme.glowColor} animate-pulse`}></div>
        <div className={`absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full blur-[150px] opacity-70 transition-colors duration-1000 ${currentTheme.glowColor} animate-pulse delay-1000`}></div>
      </div>

      <main className="flex items-center justify-center w-full scale-110">
        <InteractiveButton 
          theme={currentTheme} 
          onClick={handleAction}
        />
      </main>

      {/* نص زخرفي خلفي يزيد من جمالية تغيير اللون */}
      <div className="absolute bottom-12 text-white/20 font-black text-7xl md:text-9xl pointer-events-none select-none uppercase tracking-tighter transition-opacity duration-1000">
        {currentTheme.name}
      </div>
      
    </div>
  );
};

export default App;
