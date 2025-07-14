import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Settings,
  Award,
  BarChart3,
  HelpCircle,
  Shield,
  ChevronRight,
  LogOut,
  X,
  Camera,
  Edit3,
  Share2,
  Trophy,
  Users
} from 'lucide-react';
import { UserProfile } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface UserMenuProps {
  userProfile: UserProfile;
  currentLevel: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ userProfile, currentLevel }) => {
  const [open, setOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, currentThemeColor } = useTheme();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
       const currentUserId = sessionStorage.getItem("userId"); 
      
          if (currentUserId) {
            try {
              const userRef = doc(db, "users", currentUserId);
              await updateDoc(userRef, {
                isOnline: false,
                lastSeen: Timestamp.now()
              });
            } catch (error) {
              console.error("Erreur lors de la mise à jour du statut de déconnexion :", error);
            }
          }
      console.log("Déconnecté !");
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  const menuItems = [
    { icon: User, label: 'Mon profil', action: () => setShowProfileModal(true) },
    { icon: Settings, label: 'Paramètres', action: () => {} },
    { icon: Award, label: 'Mes certificats', action: () => {} },
    { icon: BarChart3, label: 'Statistiques', action: () => {} },
    { icon: HelpCircle, label: 'Aide & Support', action: () => {} },
    { icon: Shield, label: 'Confidentialité', action: () => {} }
  ];

  const baseClasses = isDarkMode 
    ? 'bg-gray-800 text-white border-gray-700' 
    : 'bg-white text-gray-900 border-gray-200';

  const hoverClasses = isDarkMode 
    ? 'hover:bg-gray-700' 
    : 'hover:bg-gray-50';

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          aria-haspopup="true"
          aria-expanded={open}
          className={`flex items-center space-x-3 pl-4 border-l focus:outline-none rounded-lg p-2 transition-colors ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} ${hoverClasses}`}
          type="button"
        >
          <div className="text-right">
            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{userProfile.name}</p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentLevel}</p>
          </div>
          <div className="relative">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </button>

        {open && (
          <div className={`absolute right-0 mt-2 w-72 ${baseClasses} shadow-xl rounded-2xl border z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200`}>
            <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
              <div className="flex items-center gap-3">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{userProfile.name}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{userProfile.email}</p>
                  <div className={`flex items-center gap-4 mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className="flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      {userProfile.achievements}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {userProfile.followers}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className={`flex items-center w-full text-left px-4 py-3 text-sm transition-colors ${isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <item.icon className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  {item.label}
                  <ChevronRight className={`w-4 h-4 ml-auto ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </button>
              ))}
            </div>

            <div className={`border-t p-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Se déconnecter
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${baseClasses} rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Mon Profil</h2>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <button className={`absolute bottom-0 right-0 p-2 bg-${currentThemeColor}-600 text-white rounded-full hover:bg-${currentThemeColor}-700 transition-colors`}>
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{userProfile.name}</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{userProfile.email}</p>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Membre depuis {userProfile.joinDate}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className={`px-3 py-1 bg-${currentThemeColor}-100 text-${currentThemeColor}-800 rounded-full text-sm font-medium`}>
                      {userProfile.level}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{userProfile.location}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className={`text-center p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{userProfile.achievements}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Succès</div>
                </div>
                <div className={`text-center p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{userProfile.followers}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Abonnés</div>
                </div>
                <div className={`text-center p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{userProfile.following}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Abonnements</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>À propos</h4>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{userProfile.bio}</p>
              </div>

              <div className="mb-6">
                <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Compétences</h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 bg-${currentThemeColor}-100 text-${currentThemeColor}-800 rounded-full text-sm`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className={`flex-1 px-4 py-2 bg-${currentThemeColor}-600 text-white rounded-lg hover:bg-${currentThemeColor}-700 transition-colors flex items-center justify-center gap-2`}>
                  <Edit3 className="w-4 h-4" />
                  Modifier le profil
                </button>
                <button className={`px-4 py-2 border rounded-lg transition-colors ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};