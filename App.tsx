
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
  accentColor: string;
}

const themes: Theme[] = [
  { 
    id: 'indigo', 
    name: 'أرجواني', 
    buttonFrom: 'from-indigo-600', 
    buttonTo: 'to-indigo-800', 
    buttonBorder: 'border-indigo-900', 
    bgClass: 'bg-indigo-500', 
    glowColor: 'bg-indigo-300',
    accentColor: 'text-indigo-200'
  },
  { 
    id: 'rose', 
    name: 'وردي', 
    buttonFrom: 'from-rose-600', 
    buttonTo: 'to-rose-800', 
    buttonBorder: 'border-rose-900', 
    bgClass: 'bg-rose-500',
    glowColor: 'bg-rose-300',
    accentColor: 'text-rose-200'
  },
  { 
    id: 'emerald', 
    name: 'زمردي', 
    buttonFrom: 'from-emerald-600', 
    buttonTo: 'to-emerald-800', 
    buttonBorder: 'border-emerald-900', 
    bgClass: 'bg-emerald-500',
    glowColor: 'bg-emerald-300',
    accentColor: 'text-emerald-200'
  },
  { 
    id: 'amber', 
    name: 'كهرماني', 
    buttonFrom: 'from-amber-600', 
    buttonTo: 'to-amber-800', 
    buttonBorder: 'border-amber-900', 
    bgClass: 'bg-amber-500',
    glowColor: 'bg-amber-300',
    accentColor: 'text-amber-200'
  }
];

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [isFlashing, setIsFlashing] = useState(false);

  const handleAction = useCallback(() => {
    playZaSound();
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 150);
  }, []);

  return (
    <div className={`h-full w-full flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${currentTheme.bgClass} overflow-hidden relative`}>
      
      {/* طبقة الوميض عند النقر */}
      <div className={`absolute inset-0 bg-white transition-opacity duration-150 pointer-events-none z-10 ${isFlashing ? 'opacity-20' : 'opacity-0'}`}></div>

      <div className="absolute top-6 right-6 z-50">
        <ThemeSelector 
          themes={themes} 
          currentTheme={currentTheme} 
          onSelect={setCurrentTheme} 
        />
      </div>

      {/* زينة الخلفية المتحركة */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className={`absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/20`}></div>
        <div className={`absolute -top-1/4 -left-1/4 w-[150%] h-[150%] rounded-full blur-[120px] opacity-50 transition-colors duration-1000 ${currentTheme.glowColor} animate-pulse`}></div>
      </div>

      <main className="flex flex-col items-center justify-center w-full z-20">
        <InteractiveButton 
          theme={currentTheme} 
          onClick={handleAction}
        />
        
        <div className={`mt-12 transition-all duration-500 ${currentTheme.accentColor} font-black text-4xl md:text-6xl tracking-widest uppercase opacity-40 select-none`}>
          {currentTheme.name}
        </div>
      </main>

      {/* علامة مائية كبيرة جداً في الخلفية */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none -rotate-12 scale-150">
        <span className="text-[20vw] font-black text-white whitespace-nowrap">
          {currentTheme.name.toUpperCase()}
        </span>
      </div>
      
    </div>
  );
};

export default App;
