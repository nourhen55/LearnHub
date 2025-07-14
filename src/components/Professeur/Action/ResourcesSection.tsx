import React, { useState } from 'react';
import {
  BookOpen,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  FolderPlus,
  File,
  FileText,
  Video,
  Image,
  Link,
  Folder,
  Grid,
  List,
  Star,
  Clock,
  Users
} from 'lucide-react';

const ResourcesSection: React.FC = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const folders = [
    { id: 'all', name: 'Toutes les ressources', count: 24 },
    { id: 'math', name: 'Mathématiques', count: 12 },
    { id: 'physics', name: 'Physique', count: 8 },
    { id: 'stats', name: 'Statistiques', count: 4 }
  ];

  const resources = [
    {
      id: 1,
      title: 'Introduction aux Équations Différentielles',
      type: 'pdf',
      folder: 'math',
      size: '2.3 MB',
      downloads: 45,
      views: 123,
      uploadDate: '2024-01-15',
      description: 'Cours complet sur les équations différentielles avec exemples pratiques',
      thumbnail: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      url: '#'
    },
    {
      id: 2,
      title: 'Vidéo - Les Lois de Newton',
      type: 'video',
      folder: 'physics',
      size: '145 MB',
      downloads: 32,
      views: 89,
      uploadDate: '2024-01-12',
      description: 'Explication détaillée des trois lois de Newton avec démonstrations',
      thumbnail: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      url: '#'
    },
    {
      id: 3,
      title: 'Exercices Corrigés - Statistiques',
      type: 'pdf',
      folder: 'stats',
      size: '1.8 MB',
      downloads: 67,
      views: 234,
      uploadDate: '2024-01-10',
      description: 'Recueil d\'exercices corrigés sur les statistiques descriptives',
      thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      url: '#'
    },
    {
      id: 4,
      title: 'Présentation - Analyse Numérique',
      type: 'ppt',
      folder: 'math',
      size: '5.2 MB',
      downloads: 28,
      views: 76,
      uploadDate: '2024-01-08',
      description: 'Présentation PowerPoint sur les méthodes d\'analyse numérique',
      thumbnail: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      url: '#'
    },
    {
      id: 5,
      title: 'Formules Essentielles - Physique',
      type: 'pdf',
      folder: 'physics',
      size: '890 KB',
      downloads: 156,
      views: 445,
      uploadDate: '2024-01-05',
      description: 'Aide-mémoire avec toutes les formules essentielles de physique',
      thumbnail: 'https://images.pexels.com/photos/159574/science-chemistry-lab-laboratory-159574.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      url: '#'
    },
    {
      id: 6,
      title: 'Cours Interactif - Probabilités',
      type: 'link',
      folder: 'stats',
      size: 'Lien externe',
      downloads: 0,
      views: 67,
      uploadDate: '2024-01-03',
      description: 'Cours interactif en ligne sur les probabilités avec exercices',
      thumbnail: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      url: 'https://example.com/probabilites'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-blue-500" />;
      case 'ppt':
        return <File className="w-5 h-5 text-orange-500" />;
      case 'link':
        return <Link className="w-5 h-5 text-purple-500" />;
      case 'image':
        return <Image className="w-5 h-5 text-green-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-100 text-red-800';
      case 'video':
        return 'bg-blue-100 text-blue-800';
      case 'ppt':
        return 'bg-orange-100 text-orange-800';
      case 'link':
        return 'bg-purple-100 text-purple-800';
      case 'image':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredResources = resources.filter(resource => {
    const matchesFolder = selectedFolder === 'all' || resource.folder === selectedFolder;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Bibliothèque de Ressources</h1>
          <p className="text-gray-600 mt-1">Gérez et partagez vos ressources pédagogiques</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105">
            <FolderPlus className="w-4 h-4" />
            <span>Nouveau dossier</span>
          </button>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105">
            <Upload className="w-4 h-4" />
            <span>Télécharger</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total ressources</p>
              <p className="text-2xl font-bold text-gray-800">{resources.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Téléchargements</p>
              <p className="text-2xl font-bold text-gray-800">{resources.reduce((acc, r) => acc + r.downloads, 0)}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Vues totales</p>
              <p className="text-2xl font-bold text-gray-800">{resources.reduce((acc, r) => acc + r.views, 0)}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Dossiers</p>
              <p className="text-2xl font-bold text-gray-800">{folders.length - 1}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
              <Folder className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFolder === folder.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {folder.name} ({folder.count})
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher des ressources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex items-center space-x-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                        {resource.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      {getFileIcon(resource.type)}
                      <h3 className="font-semibold text-gray-800 truncate">{resource.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{resource.size}</span>
                      <span>{formatDate(resource.uploadDate)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{resource.downloads}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{resource.views}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                        Voir
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
          ) : (
            <div className="space-y-2">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    {getFileIcon(resource.type)}
                    <div>
                      <h3 className="font-medium text-gray-800">{resource.title}</h3>
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                      {resource.type.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">{resource.size}</span>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{resource.downloads}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{resource.views}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(resource.uploadDate)}</span>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
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

export default ResourcesSection;