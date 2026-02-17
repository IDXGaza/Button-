
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
    bgClass: 'bg-indigo-200', // لون أوضح
    glowColor: 'bg-indigo-500'
  },
  { 
    id: 'rose', 
    name: 'وردي', 
    buttonFrom: 'from-rose-500', 
    buttonTo: 'to-rose-700', 
    buttonBorder: 'border-rose-900', 
    bgClass: 'bg-rose-200', // لون أوضح
    glowColor: 'bg-rose-500'
  },
  { 
    id: 'emerald', 
    name: 'زمردي', 
    buttonFrom: 'from-emerald-500', 
    buttonTo: 'to-emerald-700', 
    buttonBorder: 'border-emerald-900', 
    bgClass: 'bg-emerald-200', // لون أوضح
    glowColor: 'bg-emerald-500'
  },
  { 
    id: 'amber', 
    name: 'كهرماني', 
    buttonFrom: 'from-amber-500', 
    buttonTo: 'to-amber-700', 
    buttonBorder: 'border-amber-900', 
    bgClass: 'bg-amber-200', // لون أوضح
    glowColor: 'bg-amber-500'
  }
];

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  const handleAction = useCallback(() => {
    // التفاعل فوري
    console.log("Button clicked!");
  }, []);

  return (
    <div className={`h-[100dvh] w-full flex flex-col items-center justify-center transition-colors duration-700 ease-in-out ${currentTheme.bgClass} overflow-hidden relative`}>
      
      {/* منتقي الألوان في الزاوية العلويّة */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeSelector 
          themes={themes} 
          currentTheme={currentTheme} 
          onSelect={setCurrentTheme} 
        />
      </div>

      {/* زينة الخلفية - تم زيادة الكثافة والحجم */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full blur-[120px] opacity-40 transition-colors duration-1000 ${currentTheme.glowColor} animate-pulse`}></div>
        <div className={`absolute -bottom-24 -right-24 w-[600px] h-[600px] rounded-full blur-[150px] opacity-40 transition-colors duration-1000 ${currentTheme.glowColor} animate-pulse delay-700`}></div>
      </div>

      {/* الزر في المنتصف */}
      <main className="flex items-center justify-center w-full">
        <InteractiveButton 
          theme={currentTheme} 
          onClick={handleAction}
        />
      </main>
      
    </div>
  );
};

export default App;
