
import React from 'react';
import { Theme } from '../App';

interface Props {
  themes: Theme[];
  currentTheme: Theme;
  onSelect: (theme: Theme) => void;
}

const ThemeSelector: React.FC<Props> = ({ themes, currentTheme, onSelect }) => {
  return (
    <div className="flex flex-col items-center gap-3 bg-white/40 backdrop-blur-2xl p-3 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/50 animate-fade-in">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme)}
          className={`
            w-9 h-9 rounded-full transition-all duration-300 transform hover:scale-125
            ${theme.buttonFrom} ${theme.buttonTo} bg-gradient-to-br
            ${currentTheme.id === theme.id ? 'ring-2 ring-slate-800 ring-offset-2 scale-110 shadow-lg' : 'opacity-70'}
          `}
          aria-label={theme.name}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
