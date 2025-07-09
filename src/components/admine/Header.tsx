import React, { useEffect, useState } from 'react';
import { LogOut, User, Settings, Crown } from 'lucide-react';

const Header: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('userName') || '';
    const storedEmail = sessionStorage.getItem('userEmail') || '';
    setUsername(storedUsername);
    setEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/'; // redirect vers la page login ou accueil
  };

  return (
    <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-xl sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg relative">
              <Settings className="w-7 h-7 text-white" />
              <div className="absolute -top-1 -right-1">
                <Crown className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Panneau d'Administration
              </h1>
              <p className="text-gray-300/80">Gestion avancée des professeurs</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{username}</p>
                <p className="text-xs text-gray-300">{email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-6 py-3 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/20 hover:border-white/30 backdrop-blur-sm group"
            >
              <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
