import React from 'react';
import {
  Users,
  Video,
  MessageCircle,
  FileText,
  TrendingUp,
  Calendar,
  Star,
  BookOpen,
  Clock,
  CheckCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Étudiants actifs', value: '248', icon: Users, color: 'from-blue-500 to-cyan-500', change: '+12%' },
    { label: 'Vidéos publiées', value: '42', icon: Video, color: 'from-red-500 to-pink-500', change: '+8%' },
    { label: 'Messages non lus', value: '15', icon: MessageCircle, color: 'from-green-500 to-emerald-500', change: '+5%' },
    { label: 'Devoirs en attente', value: '23', icon: FileText, color: 'from-orange-500 to-yellow-500', change: '+3%' }
  ];

  const recentActivities = [
    { id: 1, type: 'message', student: 'Marie Dubois', action: 'a envoyé un message', time: '2 min', color: 'bg-green-100 text-green-800' },
    { id: 2, type: 'assignment', student: 'Jean Martin', action: 'a rendu un devoir', time: '15 min', color: 'bg-blue-100 text-blue-800' },
    { id: 3, type: 'evaluation', student: 'Sophie Laurent', action: 'a laissé une évaluation', time: '1h', color: 'bg-yellow-100 text-yellow-800' },
    { id: 4, type: 'video', student: 'Pierre Durand', action: 'a regardé une vidéo', time: '2h', color: 'bg-purple-100 text-purple-800' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Cours de Mathématiques', time: '14:00', students: 25, type: 'video' },
    { id: 2, title: 'Correction des devoirs', time: '16:30', students: 0, type: 'work' },
    { id: 3, title: 'Réunion parents', time: '18:00', students: 15, type: 'meeting' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Bonjour Prof. Dupont, voici un aperçu de votre activité</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                {new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Activités récentes</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
                  {activity.type === 'message' && <MessageCircle className="w-4 h-4" />}
                  {activity.type === 'assignment' && <FileText className="w-4 h-4" />}
                  {activity.type === 'evaluation' && <Star className="w-4 h-4" />}
                  {activity.type === 'video' && <Video className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{activity.student}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Prochains événements</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Voir agenda
            </button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  {event.type === 'video' && <Video className="w-5 h-5 text-white" />}
                  {event.type === 'work' && <FileText className="w-5 h-5 text-white" />}
                  {event.type === 'meeting' && <Users className="w-5 h-5 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{event.title}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">{event.time}</span>
                    {event.students > 0 && (
                      <span className="text-sm text-gray-500">{event.students} participants</span>
                    )}
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105">
            <Video className="w-5 h-5" />
            <span className="font-medium">Lancer un cours</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105">
            <FileText className="w-5 h-5" />
            <span className="font-medium">Créer un devoir</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Envoyer un message</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all transform hover:scale-105">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Ajouter une ressource</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;