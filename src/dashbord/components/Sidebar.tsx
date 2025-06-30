import React from 'react';
import { 
  Home, 
  Code, 
  Palette, 
  Dumbbell, 
  Star, 
  TrendingUp,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function Sidebar({ activeCategory, onCategoryChange }: SidebarProps) {
  const { settings, updateSettings } = useSettings();

  const menuItems = [
    { id: 'all', label: 'Tous les cours', icon: Home, count: null },
    { id: 'development', label: 'Développement', icon: Code, count: 3 },
    { id: 'design', label: 'Design', icon: Palette, count: 2 },
    { id: 'exercises', label: 'Exercices', icon: Dumbbell, count: 2 },
    { id: 'favorites', label: 'Favoris', icon: Star, count: null },
    { id: 'progress', label: 'Progression', icon: TrendingUp, count: null },
    { id: 'recent', label: 'Récents', icon: Calendar, count: null },
  ];

  const toggleSidebar = () => {
    updateSettings({ sidebarCollapsed: !settings.sidebarCollapsed });
  };

  return (
    <aside className={`${settings.sidebarCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}>
      {/* Toggle button */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
        >
          {settings.sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeCategory === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onCategoryChange(item.id)}
                  className={`w-full flex items-center ${settings.sidebarCollapsed ? 'justify-center' : 'justify-between'} p-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />
                    {!settings.sidebarCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </div>
                  {!settings.sidebarCollapsed && item.count && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isActive 
                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Stats */}
      {!settings.sidebarCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 text-white">
            <h3 className="font-semibold mb-2">Statistiques</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Cours terminés</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span>Heures d'étude</span>
                <span className="font-medium">47h</span>
              </div>
              <div className="flex justify-between">
                <span>Série actuelle</span>
                <span className="font-medium">5 jours</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}