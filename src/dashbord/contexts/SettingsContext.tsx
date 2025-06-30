import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserSettings } from '../types';

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

const defaultSettings: UserSettings = {
  theme: 'light',
  fontSize: 'medium',
  language: 'fr',
  notifications: true,
  autoPlay: false,
  sidebarCollapsed: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useLocalStorage<UserSettings>('user-settings', defaultSettings);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

useEffect(() => {
  const root = document.documentElement;

  // 1. الوضع الليلي
  if (settings.theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // 2. حجم النص
  root.classList.remove('text-sm', 'text-base', 'text-lg');

  switch (settings.fontSize) {
    case 'small':
      root.classList.add('text-sm');
      break;
    case 'medium':
      root.classList.add('text-base');
      break;
    case 'large':
      root.classList.add('text-lg');
      break;
  }
}, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}