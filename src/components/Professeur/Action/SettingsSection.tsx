import React, { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Lock,
  Globe,
  Moon,
  Sun,
  Shield,
  Trash2,
  Save,
  AlertTriangle
} from 'lucide-react';

const SettingsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      newMessage: true,
      newStudent: true,
      assignmentSubmitted: true,
      evaluation: true
    },
    privacy: {
      profileVisible: true,
      contactInfo: false,
      onlineStatus: true
    },
    preferences: {
      language: 'fr',
      darkMode: false,
      timezone: 'Europe/Paris'
    }
  });

  const tabs = [
    { id: 'account', label: 'Compte', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Confidentialité', icon: Shield },
    { id: 'preferences', label: 'Préférences', icon: Settings }
  ];

  const handleToggle = (category: string, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !(prev[category as keyof typeof prev] as any)[setting]
      }
    }));
  };

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations du compte</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value="prof.dupont"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value="jean.dupont@universite.fr"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Mettre à jour
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Changer le mot de passe</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe actuel
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            Changer le mot de passe
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Méthodes de notification</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Notifications par email</h4>
              <p className="text-sm text-gray-600">Recevez des notifications par email</p>
            </div>
            <button
              onClick={() => handleToggle('notifications', 'email')}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                settings.notifications.email ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Notifications push</h4>
              <p className="text-sm text-gray-600">Recevez des notifications push</p>
            </div>
            <button
              onClick={() => handleToggle('notifications', 'push')}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                settings.notifications.push ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.push ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Notifications SMS</h4>
              <p className="text-sm text-gray-600">Recevez des notifications par SMS</p>
            </div>
            <button
              onClick={() => handleToggle('notifications', 'sms')}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                settings.notifications.sms ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.sms ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Types de notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Nouveaux messages</h4>
              <p className="text-sm text-gray-600">Notifications pour les nouveaux messages</p>
            </div>
            <button
              onClick={() => handleToggle('notifications', 'newMessage')}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                settings.notifications.newMessage ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.newMessage ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Nouveaux étudiants</h4>
              <p className="text-sm text-gray-600">Notifications pour les nouveaux étudiants</p>
            </div>
            <button
              onClick={() => handleToggle('notifications', 'newStudent')}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                settings.notifications.newStudent ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.newStudent ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Devoirs rendus</h4>
              <p className="text-sm text-gray-600">Notifications pour les devoirs rendus</p>
            </div>
            <button
              onClick={() => handleToggle('notifications', 'assignmentSubmitted')}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                settings.notifications.assignmentSubmitted ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.assignmentSubmitted ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Évaluations</h4>
              <p className="text-sm text-gray-600">Notifications pour les nouvelles évaluations</p>
            </div>
            <button
              onClick={() => handleToggle('notifications', 'evaluation')}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                settings.notifications.evaluation ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.evaluation ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Confidentialité du profil</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Profil visible</h4>
              <p className="text-sm text-gray-600">Permettre aux étudiants de voir votre profil</p>
            </div>
            <button
              onClick={() => handleToggle('privacy', 'profileVisible')}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                settings.privacy.profileVisible ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.privacy.profileVisible ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Informations de contact</h4>
              <p className="text-sm text-gray-600">Permettre aux étudiants de voir vos informations de contact</p>
            </div>
            <button
              onClick={() => handleToggle('privacy', 'contactInfo')}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                settings.privacy.contactInfo ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.privacy.contactInfo ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Statut en ligne</h4>
              <p className="text-sm text-gray-600">Afficher votre statut en ligne</p>
            </div>
            <button
              onClick={() => handleToggle('privacy', 'onlineStatus')}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                settings.privacy.onlineStatus ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.privacy.onlineStatus ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Préférences générales</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Langue
            </label>
            <select
              value={settings.preferences.language}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, language: e.target.value }
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuseau horaire
            </label>
            <select
              value={settings.preferences.timezone}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, timezone: e.target.value }
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Europe/Paris">Europe/Paris</option>
              <option value="Europe/London">Europe/London</option>
              <option value="America/New_York">America/New_York</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Mode sombre</h4>
              <p className="text-sm text-gray-600">Utiliser le thème sombre</p>
            </div>
            <button
              onClick={() => handleToggle('preferences', 'darkMode')}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                settings.preferences.darkMode ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Zone dangereuse</h3>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h4 className="font-medium text-red-800">Désactiver le compte</h4>
            </div>
            <p className="text-sm text-red-700 mb-3">
              Désactiver temporairement votre compte. Vous pourrez le réactiver plus tard.
            </p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Désactiver le compte
            </button>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              <h4 className="font-medium text-red-800">Supprimer le compte</h4>
            </div>
            <p className="text-sm text-red-700 mb-3">
              Supprimer définitivement votre compte. Cette action est irréversible.
            </p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Supprimer le compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Paramètres</h1>
          <p className="text-gray-600 mt-1">Gérez vos préférences et paramètres de compte</p>
        </div>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105">
          <Save className="w-4 h-4" />
          <span>Sauvegarder</span>
        </button>
      </div>

      <div className="flex space-x-6">
        {/* Sidebar */}
        <div className="w-64 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'account' && renderAccountSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'privacy' && renderPrivacySettings()}
          {activeTab === 'preferences' && renderPreferencesSettings()}
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;