import React, { useState } from 'react';
import {
  HelpCircle,
  Send,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Search,
  Star,
  Headphones,
  Book,
  Settings,
  Video,
  Users
} from 'lucide-react';

const SupportSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [message, setMessage] = useState('');

  const supportStats = [
    { label: 'Tickets ouverts', value: '3', icon: AlertCircle, color: 'from-yellow-500 to-orange-500' },
    { label: 'Tickets résolus', value: '28', icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
    { label: 'Temps de réponse', value: '2h', icon: Clock, color: 'from-blue-500 to-cyan-500' },
    { label: 'Satisfaction', value: '4.9/5', icon: Star, color: 'from-purple-500 to-pink-500' }
  ];

  const tickets = [
    {
      id: 1,
      subject: 'Problème de connexion vidéo',
      category: 'technique',
      priority: 'high',
      status: 'open',
      createdAt: '2024-01-15T10:30:00',
      lastUpdate: '2024-01-15T14:20:00',
      description: 'Impossible de démarrer une session vidéo depuis ce matin'
    },
    {
      id: 2,
      subject: 'Demande de formation',
      category: 'formation',
      priority: 'medium',
      status: 'in_progress',
      createdAt: '2024-01-14T09:15:00',
      lastUpdate: '2024-01-14T16:30:00',
      description: 'Souhaitez-vous une formation sur les nouvelles fonctionnalités'
    },
    {
      id: 3,
      subject: 'Problème d\'accès aux notes',
      category: 'compte',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2024-01-13T14:45:00',
      lastUpdate: '2024-01-13T15:30:00',
      description: 'Les notes des étudiants ne s\'affichent pas correctement'
    }
  ];

  const faqItems = [
    {
      id: 1,
      question: 'Comment créer un nouveau cours vidéo ?',
      answer: 'Pour créer un nouveau cours vidéo, allez dans la section "Vidéos" et cliquez sur "Planifier un cours". Remplissez les informations requises et envoyez le lien aux étudiants.',
      category: 'video',
      helpful: 15
    },
    {
      id: 2,
      question: 'Comment corriger les devoirs en ligne ?',
      answer: 'Dans la section "Devoirs & Exercices", sélectionnez le devoir à corriger, cliquez sur "Voir les soumissions" et utilisez les outils de correction intégrés.',
      category: 'assignments',
      helpful: 23
    },
    {
      id: 3,
      question: 'Comment gérer les notifications ?',
      answer: 'Accédez aux "Paramètres" puis "Notifications" pour configurer vos préférences de notification par email, SMS ou push.',
      category: 'settings',
      helpful: 18
    },
    {
      id: 4,
      question: 'Comment exporter les données des étudiants ?',
      answer: 'Utilisez les options d\'exportation disponibles dans chaque section (présences, notes, évaluations) pour télécharger vos données au format PDF ou Excel.',
      category: 'data',
      helpful: 12
    }
  ];

  const contactMethods = [
    {
      id: 'email',
      title: 'Email',
      description: 'Écrivez-nous pour toute question',
      contact: 'support@eduspace.fr',
      icon: Mail,
      color: 'from-blue-500 to-cyan-500',
      responseTime: '24h'
    },
    {
      id: 'phone',
      title: 'Téléphone',
      description: 'Appelez-nous pour une aide urgente',
      contact: '+33 1 23 45 67 89',
      icon: Phone,
      color: 'from-green-500 to-emerald-500',
      responseTime: 'Immédiat'
    },
    {
      id: 'chat',
      title: 'Chat en direct',
      description: 'Discutez avec notre équipe',
      contact: 'Disponible 9h-18h',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-500',
      responseTime: '5 min'
    },
    {
      id: 'video',
      title: 'Assistance vidéo',
      description: 'Rendez-vous vidéo personnalisé',
      contact: 'Sur rendez-vous',
      icon: Video,
      color: 'from-orange-500 to-red-500',
      responseTime: '30 min'
    }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Support & Aide</h1>
          <p className="text-gray-600 mt-1">Obtenez de l'aide et contactez notre équipe de support</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105">
            <MessageCircle className="w-4 h-4" />
            <span>Chat en direct</span>
          </button>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105">
            <FileText className="w-4 h-4" />
            <span>Nouveau ticket</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'contact'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Headphones className="w-4 h-4" />
              <span>Nous contacter</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'tickets'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Mes tickets</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'faq'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Book className="w-4 h-4" />
              <span>FAQ</span>
            </div>
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'contact' && (
            <div className="space-y-6">
              {/* Contact Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${method.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{method.title}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Contact:</span>
                          <span className="font-medium text-gray-800">{method.contact}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Réponse:</span>
                          <span className="text-sm font-medium text-green-600">{method.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Contact Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Envoyez-nous un message</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Décrivez brièvement votre problème"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="technique">Problème technique</option>
                      <option value="compte">Gestion de compte</option>
                      <option value="formation">Demande de formation</option>
                      <option value="facturation">Facturation</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Décrivez votre problème en détail..."
                    />
                  </div>
                  <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
                    Envoyer le message
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">#{ticket.id} - {ticket.subject}</h3>
                      <p className="text-gray-600 mb-3">{ticket.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Créé: {formatDate(ticket.createdAt)}</span>
                        <span>Mis à jour: {formatDate(ticket.lastUpdate)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority === 'high' ? 'Urgent' : ticket.priority === 'medium' ? 'Moyen' : 'Faible'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status === 'open' ? 'Ouvert' : 
                         ticket.status === 'in_progress' ? 'En cours' : 'Résolu'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      Voir détails
                    </button>
                    <button className="text-gray-500 hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                      Ajouter un commentaire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher dans la FAQ..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">{item.question}</h3>
                    <p className="text-gray-600 mb-4">{item.answer}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Cette réponse vous a-t-elle été utile ?</span>
                        <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                          Oui
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Non
                        </button>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-500">{item.helpful} personnes ont trouvé cela utile</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportSection;