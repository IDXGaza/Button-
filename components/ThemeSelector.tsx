
import React from 'react';
import { Theme } from '../App';

interface Props {
  themes: Theme[];
  currentTheme: Theme;
  onSelect: (theme: Theme) => void;
}

const ThemeSelector: React.FC<Props> = ({ themes, currentTheme, onSelect }) => {
  return (
    <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-4 rounded-full shadow-lg border border-white/50 animate-fade-in">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme)}
          className={`
            w-10 h-10 rounded-full transition-all duration-300 transform hover:scale-125
            ${theme.buttonFrom} ${theme.buttonTo} bg-gradient-to-br
            ${currentTheme.id === theme.id ? 'ring-4 ring-white ring-offset-2 scale-110 shadow-md' : 'opacity-70'}
          `}
          title={theme.name}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
