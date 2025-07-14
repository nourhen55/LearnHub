import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  Edit,
  Trash2,
  Eye,
  Send,
  Clock,
  Users,
  AlertCircle,
  Info,
  CheckCircle,
  Filter,
  Calendar,
  Bell,
  Target
} from 'lucide-react';

const AnnouncementsSection: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedType, setSelectedType] = useState('all');

  const announcements = [
    {
      id: 1,
      title: 'Changement d\'horaire - Cours de Mathématiques',
      type: 'urgent',
      content: 'Le cours de mathématiques du vendredi 20 janvier est déplacé à 16h au lieu de 14h. Merci de noter ce changement.',
      targetAudience: 'Mathématiques 101',
      studentsCount: 25,
      readCount: 18,
      createdAt: '2024-01-15T09:00:00',
      publishedAt: '2024-01-15T09:00:00',
      status: 'published'
    },
    {
      id: 2,
      title: 'Nouveau chapitre disponible - Physique Quantique',
      type: 'informatif',
      content: 'Le chapitre 5 sur la physique quantique est maintenant disponible dans la section ressources. N\'hésitez pas à le consulter avant le prochain cours.',
      targetAudience: 'Physique 201',
      studentsCount: 32,
      readCount: 24,
      createdAt: '2024-01-14T14:30:00',
      publishedAt: '2024-01-14T14:30:00',
      status: 'published'
    },
    {
      id: 3,
      title: 'Rappel - Devoir à rendre',
      type: 'rappel',
      content: 'N\'oubliez pas de rendre votre devoir sur les statistiques avant vendredi 22 janvier à 23h59.',
      targetAudience: 'Statistiques 301',
      studentsCount: 18,
      readCount: 15,
      createdAt: '2024-01-13T10:15:00',
      publishedAt: '2024-01-13T10:15:00',
      status: 'published'
    },
    {
      id: 4,
      title: 'Session de révision prévue',
      type: 'informatif',
      content: 'Une session de révision pour l\'examen final aura lieu le 25 janvier de 14h à 16h en amphithéâtre A.',
      targetAudience: 'Toutes les classes',
      studentsCount: 75,
      readCount: 0,
      createdAt: '2024-01-15T16:00:00',
      publishedAt: null,
      status: 'draft'
    }
  ];

  const announcementTypes = [
    { id: 'all', label: 'Toutes', icon: Megaphone, color: 'bg-gray-100 text-gray-800' },
    { id: 'urgent', label: 'Urgent', icon: AlertCircle, color: 'bg-red-100 text-red-800' },
    { id: 'informatif', label: 'Informatif', icon: Info, color: 'bg-blue-100 text-blue-800' },
    { id: 'rappel', label: 'Rappel', icon: Clock, color: 'bg-yellow-100 text-yellow-800' }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'informatif':
        return <Info className="w-4 h-4 text-blue-600" />;
      case 'rappel':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Megaphone className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'informatif':
        return 'bg-blue-100 text-blue-800';
      case 'rappel':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateReadRate = (readCount: number, totalCount: number) => {
    return totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;
  };

  const filteredAnnouncements = selectedType === 'all' 
    ? announcements 
    : announcements.filter(announcement => announcement.type === selectedType);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Annonces & Mises à jour</h1>
          <p className="text-gray-600 mt-1">Communiquez avec vos étudiants et partagez des informations importantes</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle annonce</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          {announcementTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === type.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Annonces publiées</p>
              <p className="text-2xl font-bold text-gray-800">{announcements.filter(a => a.status === 'published').length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Taux de lecture</p>
              <p className="text-2xl font-bold text-gray-800">
                {Math.round(announcements.reduce((acc, a) => acc + calculateReadRate(a.readCount, a.studentsCount), 0) / announcements.length)}%
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Brouillons</p>
              <p className="text-2xl font-bold text-gray-800">{announcements.filter(a => a.status === 'draft').length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
              <Edit className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Liste des annonces</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <div key={announcement.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getTypeIcon(announcement.type)}
                      <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(announcement.type)}`}>
                        {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(announcement.status)}`}>
                        {announcement.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{announcement.content}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{announcement.targetAudience}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{announcement.studentsCount} étudiants</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{announcement.readCount} lectures ({calculateReadRate(announcement.readCount, announcement.studentsCount)}%)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(announcement.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    {announcement.status === 'draft' && (
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar for Read Rate */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Taux de lecture</span>
                    <span className="text-sm font-medium text-gray-800">
                      {calculateReadRate(announcement.readCount, announcement.studentsCount)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${calculateReadRate(announcement.readCount, announcement.studentsCount)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Créer une nouvelle annonce</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de l'annonce
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Changement d'horaire important"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'annonce
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="informatif">Informatif</option>
                  <option value="urgent">Urgent</option>
                  <option value="rappel">Rappel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audience cible
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Toutes les classes</option>
                  <option value="math101">Mathématiques 101</option>
                  <option value="physics201">Physique 201</option>
                  <option value="stats301">Statistiques 301</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenu de l'annonce
                </label>
                <textarea
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tapez votre annonce ici..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sendNotification"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="sendNotification" className="text-sm text-gray-700">
                  Envoyer une notification push aux étudiants
                </label>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Sauvegarder comme brouillon
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Publier maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsSection;