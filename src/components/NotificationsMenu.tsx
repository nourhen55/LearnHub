import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  BookOpen,
  Trophy,
  Clock,
  MessageSquare,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { Notification } from '../types';
import { useTheme } from '../contexts/ThemeContext';

export const NotificationsMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'course' | 'achievement'>('all');
  const menuRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, currentThemeColor } = useTheme();

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'course',
      title: 'Nouveau cours disponible',
      message: 'Le cours "React Avancé" vient d\'être publié',
      time: 'Il y a 5 min',
      isRead: false,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Félicitations ! 🎉',
      message: 'Vous avez terminé le cours "JavaScript ES6"',
      time: 'Il y a 1h',
      isRead: false
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Rappel d\'étude',
      message: 'Il est temps de continuer votre cours de Python',
      time: 'Il y a 2h',
      isRead: true
    },
    {
      id: '4',
      type: 'social',
      title: 'Marie a commenté',
      message: 'Marie a laissé un commentaire sur votre projet',
      time: 'Il y a 3h',
      isRead: true,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '5',
      type: 'system',
      title: 'Mise à jour système',
      message: 'Nouvelles fonctionnalités disponibles',
      time: 'Il y a 1 jour',
      isRead: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'achievement': return Trophy;
      case 'reminder': return Clock;
      case 'social': return MessageSquare;
      case 'system': return Settings;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    const baseColors = {
      course: 'blue',
      achievement: 'yellow',
      reminder: 'green',
      social: 'purple',
      system: 'gray'
    };
    
    const color = baseColors[type as keyof typeof baseColors] || 'gray';
    return isDarkMode 
      ? `bg-${color}-900 text-${color}-300` 
      : `bg-${color}-100 text-${color}-600`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const baseClasses = isDarkMode 
    ? 'bg-gray-800 text-white border-gray-700' 
    : 'bg-white text-gray-900 border-gray-200';

  const hoverClasses = isDarkMode 
    ? 'hover:bg-gray-700' 
    : 'hover:bg-gray-50';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`relative p-3 transition-all duration-200 ${baseClasses} ${hoverClasses} border rounded-xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-${currentThemeColor}-500 focus:ring-offset-2`}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className={`absolute right-0 mt-3 w-96 ${baseClasses} border rounded-2xl shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200`}>
          <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Bell className="w-5 h-5" />
                Notifications
              </h3>
              <button className={`text-sm font-medium hover:underline text-${currentThemeColor}-600`}>
                Tout marquer comme lu
              </button>
            </div>
            
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'Toutes', count: notifications.length },
                { key: 'unread', label: 'Non lues', count: unreadCount },
                { key: 'course', label: 'Cours', count: notifications.filter(n => n.type === 'course').length },
                { key: 'achievement', label: 'Succès', count: notifications.filter(n => n.type === 'achievement').length }
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                    filter === key
                      ? `bg-${currentThemeColor}-600 text-white`
                      : isDarkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Aucune notification</p>
              </div>
            ) : (
              <ul className="py-2">
                {filteredNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  
                  return (
                    <li key={notification.id} className={`border-b last:border-b-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-50'} ${!notification.isRead ? (isDarkMode ? 'bg-gray-700/30' : 'bg-blue-50/30') : ''}`}>
                      <div className={`p-4 transition-colors cursor-pointer ${hoverClasses}`}>
                        <div className="flex gap-3">
                          <div className="flex-shrink-0">
                            {notification.avatar ? (
                              <img
                                src={notification.avatar}
                                alt=""
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${!notification.isRead ? (isDarkMode ? 'text-white' : 'text-gray-900') : (isDarkMode ? 'text-gray-200' : 'text-gray-700')}`}>
                                  {notification.title}
                                </p>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {notification.message}
                                </p>
                                <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                  {notification.time}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-2 ml-2">
                                {!notification.isRead && (
                                  <div className={`w-2 h-2 bg-${currentThemeColor}-600 rounded-full`}></div>
                                )}
                                <button className={`p-1 rounded transition-colors ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-100 bg-gray-50'}`}>
            <button className={`w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors text-${currentThemeColor}-600 hover:text-${currentThemeColor}-700 hover:bg-${currentThemeColor}-50 ${isDarkMode ? 'hover:bg-gray-600' : ''}`}>
              Voir toutes les notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};