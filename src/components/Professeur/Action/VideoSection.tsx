import React, { useState } from 'react';
import {
  Video,
  Play,
  Plus,
  Calendar,
  Users,
  Clock,
  Share2,
  Eye,
  Edit,
  Trash2,
  Link,
  Camera
} from 'lucide-react';

const VideoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('live');

  const liveVideos = [
    {
      id: 1,
      title: 'Cours de Mathématiques - Algèbre',
      scheduledFor: '2024-01-15T14:00:00',
      duration: '90 min',
      participants: 25,
      status: 'upcoming',
      link: 'https://meet.example.com/math-algebra'
    },
    {
      id: 2,
      title: 'Révision Physique Quantique',
      scheduledFor: '2024-01-15T16:30:00',
      duration: '60 min',
      participants: 18,
      status: 'live',
      link: 'https://meet.example.com/physics-quantum'
    }
  ];

  const recordedVideos = [
    {
      id: 1,
      title: 'Introduction aux Équations Différentielles',
      subject: 'Mathématiques',
      duration: '45 min',
      views: 127,
      uploadDate: '2024-01-10',
      thumbnail: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Les Lois de Newton - Partie 1',
      subject: 'Physique',
      duration: '38 min',
      views: 89,
      uploadDate: '2024-01-08',
      thumbnail: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Analyse Statistique des Données',
      subject: 'Statistiques',
      duration: '52 min',
      views: 156,
      uploadDate: '2024-01-05',
      thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Vidéos</h1>
          <p className="text-gray-600 mt-1">Organisez vos cours en direct et votre bibliothèque vidéo</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all transform hover:scale-105">
            <Camera className="w-4 h-4" />
            <span>Démarrer en direct</span>
          </button>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105">
            <Plus className="w-4 h-4" />
            <span>Planifier un cours</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'live'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Video className="w-4 h-4" />
              <span>Cours en direct</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('recorded')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'recorded'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Vidéos enregistrées</span>
            </div>
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'live' && (
            <div className="space-y-4">
              {liveVideos.map((video) => (
                <div key={video.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          video.status === 'live' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {video.status === 'live' ? 'EN DIRECT' : 'À VENIR'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(video.scheduledFor)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{video.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{video.participants} participants</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Link className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      {video.status === 'live' ? (
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                          Rejoindre
                        </button>
                      ) : (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                          Démarrer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'recorded' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordedVideos.map((video) => (
                <div key={video.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-full">
                        <Play className="w-6 h-6 text-white" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{video.subject}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{video.views} vues</span>
                      </div>
                      <span>{new Date(video.uploadDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Lire
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoSection;