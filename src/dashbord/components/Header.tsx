import React, { useState } from 'react';
import { Search, Settings, Bell, User, Moon, Sun } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { SettingsModal } from './SettingsModal';

export function Header() {
  const { settings, updateSettings } = useSettings();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' });
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors duration-200">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">LearnHub</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tableau de bord d'apprentissage</p>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des cours, exercices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              {settings.theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              <Settings className="w-5 h-5" />
            </button>

            <button className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
              <User className="w-5 h-5" />
              <span className="hidden md:block text-sm font-medium">Profil</span>
            </button>
          </div>
        </div>
      </header>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}