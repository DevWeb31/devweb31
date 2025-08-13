import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeContext } from '../hooks/useThemeContext';
import { Theme } from '../types/ThemeContextType';
import { useSnackbar } from '../hooks/useSnackbar';
import { Snackbar } from './Snackbar';

export const ThemeToggle: React.FC = () => {
  const { theme, changeTheme } = useThemeContext();
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  const getNextTheme = (currentTheme: Theme): Theme => {
    switch (currentTheme) {
      case 'system':
        return 'light';
      case 'light':
        return 'dark';
      case 'dark':
        return 'system';
      default:
        return 'system';
    }
  };

  const getThemeIcon = (currentTheme: Theme) => {
    switch (currentTheme) {
      case 'system':
        return <Monitor className='h-5 w-5' />;
      case 'light':
        return <Sun className='h-5 w-5' />;
      case 'dark':
        return <Moon className='h-5 w-5' />;
      default:
        return <Monitor className='h-5 w-5' />;
    }
  };

  const getThemeLabel = (currentTheme: Theme): string => {
    switch (currentTheme) {
      case 'system':
        return 'Passer au thème clair';
      case 'light':
        return 'Passer au thème sombre';
      case 'dark':
        return 'Passer au thème système';
      default:
        return 'Changer de thème';
    }
  };

  const getThemeMessage = (theme: Theme): string => {
    switch (theme) {
      case 'system':
        return 'Thème système activé';
      case 'light':
        return 'Thème clair activé';
      case 'dark':
        return 'Thème sombre activé';
      default:
        return 'Thème changé';
    }
  };

  const handleClick = () => {
    const nextTheme = getNextTheme(theme);
    changeTheme(nextTheme);
    showSnackbar(getThemeMessage(nextTheme), 'success');
  };

  return (
    <>
      <button
        onClick={handleClick}
        className='p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
        aria-label={getThemeLabel(theme)}
        title={getThemeLabel(theme)}
      >
        {getThemeIcon(theme)}
      </button>

      <Snackbar
        message={snackbar.message}
        isVisible={snackbar.isVisible}
        onClose={hideSnackbar}
        type={snackbar.type}
        duration={2000}
      />
    </>
  );
};
