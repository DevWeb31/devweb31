import React from 'react';
import { getCurrentConfig, isDevelopment } from '../config/environments';

interface EnvironmentIndicatorProps {
  showInProduction?: boolean;
}

export const EnvironmentIndicator: React.FC<EnvironmentIndicatorProps> = ({ 
  showInProduction = false 
}) => {
  const config = getCurrentConfig();
  
  // Ne pas afficher en production sauf si explicitement demandé
  if (!isDevelopment() && !showInProduction) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`
        px-3 py-1 rounded-full text-xs font-mono font-bold shadow-lg
        ${isDevelopment() 
          ? 'bg-yellow-500 text-black' 
          : 'bg-green-500 text-white'
        }
      `}>
        {config.name}
      </div>
    </div>
  );
};
