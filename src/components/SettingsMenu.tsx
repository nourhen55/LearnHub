import React, { useState, useRef, useEffect } from 'react';
import {
  Settings,
  Moon,
  Sun,
  Monitor,
  Globe,
  Type,
  Palette,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Bell,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Database,
  Users,
  Shield
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const SettingsMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { settings, updateSetting, currentThemeColor, isDarkMode } = useTheme();

  const toggleSubmenu = (submenu: string) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  const selectOption = (category: string, option: string) => {
    updateSetting(category as any, option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      id: 'theme',
      label: 'Apparence',
      icon: Monitor,
      options: [
        { value: 'Sombre', icon: Moon },
        { value: 'Clair', icon: Sun },
        { value: 'Automatique', icon: Monitor }
      ]
    },
    {
      id: 'language',
      label: 'Langue',
      icon: Globe,
      options: [
        { value: 'Français', flag: '🇫🇷' },
        { value: 'العربية', flag: '🇸🇦' },
        { value: 'English', flag: '🇺🇸' },
        { value: 'Español', flag: '🇪🇸' }
      ]
    },
    {
      id: 'fontSize',
      label: 'Taille du texte',
      icon: Type,
      options: [
        { value: 'Petite', size: 'text-sm' },
        { value: 'Moyenne', size: 'text-base' },
        { value: 'Grande', size: 'text-lg' },
        { value: 'Très grande', size: 'text-xl' }
      ]
    },
    {
      id: 'themeColor',
      label: 'Couleur principale',
      icon: Palette,
      options: [
        { value: 'Bleu', color: 'bg-blue-500' },
        { value: 'Vert', color: 'bg-emerald-500' },
        { value: 'Violet', color: 'bg-purple-500' },
        { value: 'Rose', color: 'bg-pink-500' },
        { value: 'Orange', color: 'bg-orange-500' }
      ]
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      options: [
        { value: 'Activées', icon: Bell },
        { value: 'Silencieuses', icon: VolumeX },
        { value: 'Désactivées', icon: X }
      ]
    },
    {
      id: 'sound',
      label: 'Sons',
      icon: Volume2,
      options: [
        { value: 'Activé', icon: Volume2 },
        { value: 'Désactivé', icon: VolumeX }
      ]
    },
    {
      id: 'privacy',
      label: 'Confidentialité',
      icon: Shield,
      options: [
        { value: 'Public', icon: Eye },
        { value: 'Amis seulement', icon: Users },
        { value: 'Privé', icon: EyeOff }
      ]
    },
    {
      id: 'autoSave',
      label: 'Sauvegarde auto',
      icon: Database,
      options: [
        { value: 'Activé', icon: Check },
        { value: 'Désactivé', icon: X }
      ]
    }
  ];

  const resetSettings = () => {
    updateSetting('theme', 'Automatique');
    updateSetting('language', 'Français');
    updateSetting('fontSize', 'Moyenne');
    updateSetting('themeColor', 'Bleu');
    updateSetting('notifications', 'Activées');
    updateSetting('sound', 'Activé');
    updateSetting('privacy', 'Public');
    updateSetting('autoSave', 'Activé');
  };

  const baseClasses = isDarkMode 
    ? 'bg-gray-800 text-white border-gray-700' 
    : 'bg-white text-gray-900 border-gray-200';

  const hoverClasses = isDarkMode 
    ? 'hover:bg-gray-700' 
    : 'hover:bg-gray-50';

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`
          group relative p-3 transition-all duration-200 ease-out
          ${baseClasses} ${hoverClasses}
          border rounded-xl shadow-sm hover:shadow-md
          focus:outline-none focus:ring-2 focus:ring-${currentThemeColor}-500 focus:ring-offset-2
          ${open ? `ring-2 ring-${currentThemeColor}-500 ring-offset-2` : ''}
        `}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Settings className={`w-5 h-5 transition-transform duration-200 ${open ? 'rotate-90' : 'group-hover:rotate-45'}`} />
      </button>

      {open && (
        <div className={`absolute right-0 mt-3 w-80 ${baseClasses} border rounded-2xl shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200`}>
          <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
            <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <Settings className="w-5 h-5" />
              Paramètres
            </h3>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Personnalisez votre expérience
            </p>
          </div>
          
          <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <ul className="py-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSubmenu === item.id;
                const selectedValue = settings[item.id as keyof typeof settings];
                
                return (
                  <li key={item.id} className={`border-b last:border-b-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-50'}`}>
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={`
                        w-full text-left px-4 py-3 transition-all duration-150
                        flex justify-between items-center group
                        ${isActive 
                          ? `bg-${currentThemeColor}-50 text-${currentThemeColor}-900 ${isDarkMode ? 'bg-gray-700' : ''}` 
                          : `${hoverClasses} ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? `text-${currentThemeColor}-600` : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-500'}`}>
                          {selectedValue}
                        </span>
                        {isActive ? 
                          <ChevronUp className={`w-4 h-4 text-${currentThemeColor}-600`} /> : 
                          <ChevronDown className={`w-4 h-4 ${isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        }
                      </div>
                    </button>
                    
                    {isActive && (
                      <div className={`${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-100'} border-t animate-in slide-in-from-top-1 duration-200`}>
                        <ul className="py-2">
                          {item.options.map((option) => {
                            const isSelected = selectedValue === option.value;
                            
                            return (
                              <li key={option.value}>
                                <button
                                  onClick={() => selectOption(item.id, option.value)}
                                  className={`
                                    w-full text-left px-8 py-2 text-sm transition-all duration-150
                                    flex items-center justify-between group
                                    ${isSelected 
                                      ? `bg-${currentThemeColor}-100 text-${currentThemeColor}-900 font-medium ${isDarkMode ? 'bg-gray-600' : ''}` 
                                      : `${isDarkMode ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-white'}`
                                    }
                                  `}
                                >
                                  <div className="flex items-center gap-3">
                                    {option.icon && <option.icon className="w-4 h-4" />}
                                    {option.flag && <span className="text-base">{option.flag}</span>}
                                    {option.color && <div className={`w-3 h-3 rounded-full ${option.color}`} />}
                                    <span className={option.size || ''}>{option.value}</span>
                                  </div>
                                  {isSelected && (
                                    <Check className={`w-4 h-4 text-${currentThemeColor}-600 animate-in zoom-in-50 duration-200`} />
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-100 bg-gray-50'}`}>
            <div className="flex gap-2">
              <button 
                onClick={resetSettings}
                className={`flex-1 px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600' 
                    : 'text-gray-700 bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                Réinitialiser
              </button>
              <button className={`flex-1 px-3 py-2 text-sm font-medium text-white bg-${currentThemeColor}-600 rounded-lg hover:bg-${currentThemeColor}-700 transition-colors`}>
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};