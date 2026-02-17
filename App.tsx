
import React, { useState, useCallback } from 'react';
import InteractiveButton from './components/InteractiveButton';
import ThemeSelector from './components/ThemeSelector';

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
    buttonFrom: 'from-indigo-500', 
    buttonTo: 'to-indigo-700', 
    buttonBorder: 'border-indigo-900', 
    bgClass: 'bg-indigo-50',
    glowColor: 'bg-indigo-400'
  },
  { 
    id: 'rose', 
    name: 'وردي', 
    buttonFrom: 'from-rose-500', 
    buttonTo: 'to-rose-700', 
    buttonBorder: 'border-rose-900', 
    bgClass: 'bg-rose-50',
    glowColor: 'bg-rose-400'
  },
  { 
    id: 'emerald', 
    name: 'زمردي', 
    buttonFrom: 'from-emerald-500', 
    buttonTo: 'to-emerald-700', 
    buttonBorder: 'border-emerald-900', 
    bgClass: 'bg-emerald-50',
    glowColor: 'bg-emerald-400'
  },
  { 
    id: 'amber', 
    name: 'كهرماني', 
    buttonFrom: 'from-amber-500', 
    buttonTo: 'to-amber-700', 
    buttonBorder: 'border-amber-900', 
    bgClass: 'bg-amber-50',
    glowColor: 'bg-amber-400'
  },
  { 
    id: 'violet', 
    name: 'بنفسجي', 
    buttonFrom: 'from-violet-500', 
    buttonTo: 'to-violet-700', 
    buttonBorder: 'border-violet-900', 
    bgClass: 'bg-violet-50',
    glowColor: 'bg-violet-400'
  },
];

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = useCallback(() => {
    setClickCount(prev => prev + 1);
  }, []);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-1000 ease-in-out ${currentTheme.bgClass} p-6 overflow-hidden`}>
      {/* تأثيرات بصرية للخلفية تتبع السمة */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 transition-colors duration-1000 ${currentTheme.glowColor} animate-pulse`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full blur-[150px] opacity-20 transition-colors duration-1000 ${currentTheme.glowColor} animate-pulse delay-1000`}></div>
      </div>

      <header className="mb-12 text-center select-none animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-4 drop-shadow-sm">
          زر الألوان التفاعلي
        </h1>
        <p className="text-slate-500 font-bold text-lg">اختر لونك المفضل واضغط للاستمتاع</p>
      </header>

      <main className="w-full flex flex-col items-center justify-center gap-12">
        <ThemeSelector 
          themes={themes} 
          currentTheme={currentTheme} 
          onSelect={setCurrentTheme} 
        />
        
        <InteractiveButton 
          theme={currentTheme} 
          onClick={handleButtonClick}
        />
        
        <div className="text-slate-400 font-bold text-sm tracking-widest uppercase">
          تم الضغط {clickCount} مرات
        </div>
      </main>

      <footer className="mt-auto pt-8 pb-4 text-slate-400 text-xs font-medium select-none">
        تصميم عصري تفاعلي
      </footer>
    </div>
  );
};

export default App;
