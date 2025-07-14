import React, { useState } from 'react';
import {
  Star,
  TrendingUp,
  TrendingDown,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Filter,
  Calendar,
  BarChart3,
  Award,
  Users,
  Eye,
  Download
} from 'lucide-react';

const EvaluationsSection: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const overallStats = [
    { label: 'Note moyenne', value: '4.8/5', count: '156 évaluations', icon: Star, color: 'from-yellow-500 to-orange-500', trend: 'up' },
    { label: 'Satisfaction', value: '96%', count: 'Recommandations', icon: ThumbsUp, color: 'from-green-500 to-emerald-500', trend: 'up' },
    { label: 'Participations', value: '234', count: 'Ce mois', icon: Users, color: 'from-blue-500 to-cyan-500', trend: 'up' },
    { label: 'Améliorations', value: '12', count: 'Suggestions', icon: TrendingUp, color: 'from-purple-500 to-pink-500', trend: 'down' }
  ];

  const evaluations = [
    {
      id: 1,
      student: 'Marie Dubois',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      subject: 'Mathématiques',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellente explication des concepts complexes. Les exemples pratiques sont très utiles.',
      categories: {
        pedagogy: 5,
        clarity: 5,
        availability: 4,
        content: 5
      }
    },
    {
      id: 2,
      student: 'Jean Martin',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      subject: 'Physique',
      rating: 4,
      date: '2024-01-14',
      comment: 'Très bon professeur, mais les cours pourraient être un peu plus interactifs.',
      categories: {
        pedagogy: 4,
        clarity: 4,
        availability: 5,
        content: 4
      }
    },
    {
      id: 3,
      student: 'Sophie Laurent',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      subject: 'Statistiques',
      rating: 5,
      date: '2024-01-13',
      comment: 'Parfait ! Les exercices pratiques aident vraiment à comprendre la théorie.',
      categories: {
        pedagogy: 5,
        clarity: 5,
        availability: 5,
        content: 5
      }
    },
    {
      id: 4,
      student: 'Pierre Durand',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      subject: 'Mathématiques',
      rating: 4,
      date: '2024-01-12',
      comment: 'Bonne pédagogie, mais j\'aimerais plus d\'exemples concrets.',
      categories: {
        pedagogy: 4,
        clarity: 4,
        availability: 4,
        content: 3
      }
    }
  ];

  const categoryStats = [
    { name: 'Pédagogie', value: 4.7, color: 'bg-blue-500' },
    { name: 'Clarté', value: 4.6, color: 'bg-green-500' },
    { name: 'Disponibilité', value: 4.5, color: 'bg-purple-500' },
    { name: 'Contenu', value: 4.4, color: 'bg-orange-500' }
  ];

  const suggestions = [
    { id: 1, text: 'Ajouter plus d\'exemples pratiques', count: 5, priority: 'high' },
    { id: 2, text: 'Augmenter l\'interactivité des cours', count: 3, priority: 'medium' },
    { id: 3, text: 'Fournir plus de ressources supplémentaires', count: 2, priority: 'low' },
    { id: 4, text: 'Organiser des sessions de révision', count: 4, priority: 'high' }
  ];

  const subjects = [
    { id: 'all', name: 'Toutes les matières' },
    { id: 'math', name: 'Mathématiques' },
    { id: 'physics', name: 'Physique' },
    { id: 'stats', name: 'Statistiques' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Évaluations des étudiants</h1>
          <p className="text-gray-600 mt-1">Consultez les retours et améliorez votre enseignement</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105">
            <Download className="w-4 h-4" />
            <span>Exporter rapport</span>
          </button>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105">
            <BarChart3 className="w-4 h-4" />
            <span>Statistiques</span>
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendIcon className={`w-4 h-4 mr-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="text-sm text-gray-600">{stat.count}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Période
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="quarter">Ce trimestre</option>
                <option value="year">Cette année</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Matière
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evaluations List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Évaluations récentes</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {evaluations.map((evaluation) => (
                  <div key={evaluation.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={evaluation.avatar}
                          alt={evaluation.student}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-gray-800">{evaluation.student}</h4>
                          <p className="text-sm text-gray-600">{evaluation.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(evaluation.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(evaluation.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{evaluation.comment}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          {renderStars(evaluation.categories.pedagogy)}
                        </div>
                        <p className="text-xs text-gray-600">Pédagogie</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          {renderStars(evaluation.categories.clarity)}
                        </div>
                        <p className="text-xs text-gray-600">Clarté</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          {renderStars(evaluation.categories.availability)}
                        </div>
                        <p className="text-xs text-gray-600">Disponibilité</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          {renderStars(evaluation.categories.content)}
                        </div>
                        <p className="text-xs text-gray-600">Contenu</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Category Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Évaluation par catégorie</h3>
            <div className="space-y-4">
              {categoryStats.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm font-bold text-gray-800">{category.value}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${(category.value / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Suggestions d'amélioration</h3>
            <div className="space-y-3">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm text-gray-800 flex-1">{suggestion.text}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                      {suggestion.priority === 'high' ? 'Élevée' : 
                       suggestion.priority === 'medium' ? 'Moyenne' : 'Faible'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-600">{suggestion.count} étudiants</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions rapides</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Demander une évaluation
              </button>
              <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                Répondre aux commentaires
              </button>
              <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                Créer un plan d'amélioration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationsSection;