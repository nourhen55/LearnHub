import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  Video,
  MessageCircle,
  User,
  Settings,
  FileText,
  UserCheck,
  Star,
  Megaphone,
  BookOpen,
  Calendar,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen
}) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', color: 'from-blue-500 to-purple-600' },
    { id: 'video', icon: Video, label: 'Vidéos', color: 'from-red-500 to-pink-600' },
    { id: 'contact', icon: MessageCircle, label: 'Messages', color: 'from-green-500 to-teal-600' },
    { id: 'profile', icon: User, label: 'Profil', color: 'from-indigo-500 to-purple-600' },
    { id: 'assignments', icon: FileText, label: 'Devoirs', color: 'from-orange-500 to-red-600' },
    { id: 'attendance', icon: UserCheck, label: 'Présence', color: 'from-cyan-500 to-blue-600' },
    { id: 'evaluations', icon: Star, label: 'Évaluations', color: 'from-yellow-500 to-orange-600' },
    { id: 'announcements', icon: Megaphone, label: 'Annonces', color: 'from-purple-500 to-pink-600' },
    { id: 'resources', icon: BookOpen, label: 'Ressources', color: 'from-emerald-500 to-green-600' },
    { id: 'calendar', icon: Calendar, label: 'Agenda', color: 'from-violet-500 to-purple-600' },
    { id: 'support', icon: HelpCircle, label: 'Support', color: 'from-gray-500 to-slate-600' },
    { id: 'settings', icon: Settings, label: 'Paramètres', color: 'from-slate-500 to-gray-600' }
  ];
const navigate = useNavigate();

const handleLogout = () => {
  // Efface les données stockées
  sessionStorage.clear();

  // 🔄 Tu peux aussi mettre à jour le champ isOnline dans Firestore ici si besoin

  // Redirection
  navigate("/login");
};

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white shadow-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">EduSpace</h1>
                <p className="text-sm text-gray-500">Professeur</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center px-3 py-2.5 rounded-lg text-left transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg transform scale-105' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
              <button
  onClick={handleLogout}
  className="mt-0.5 w-full flex items-center justify-center px-3 py-2 rounded-lg bg-10 hover:bg-red-100 text-red-600 hover:text-red-100 transition"
>
  <X className="w-4 h-4 mr-2" />
  Déconnexion
</button>

          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;