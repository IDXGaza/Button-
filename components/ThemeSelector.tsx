
import React from 'react';
import { Theme } from '../App';

interface Props {
  themes: Theme[];
  currentTheme: Theme;
  onSelect: (theme: Theme) => void;
}

const ThemeSelector: React.FC<Props> = ({ themes, currentTheme, onSelect }) => {
  return (
    <div className="flex flex-col items-center gap-3 bg-white/30 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-white/40 animate-fade-in">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme)}
          className={`
            w-8 h-8 rounded-full transition-all duration-300 transform hover:scale-125
            ${theme.buttonFrom} ${theme.buttonTo} bg-gradient-to-br
            ${currentTheme.id === theme.id ? 'ring-2 ring-white ring-offset-2 scale-110 shadow-lg' : 'opacity-60'}
          `}
          title={theme.name}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
