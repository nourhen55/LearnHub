import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Video,
  BookOpen,
  Edit,
  Trash2,
  Filter,
  Eye,
  MapPin,
  AlertCircle
} from 'lucide-react';

const CalendarSection: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const events = [
    {
      id: 1,
      title: 'Cours de Mathématiques',
      type: 'course',
      start: new Date(2024, 0, 15, 14, 0),
      end: new Date(2024, 0, 15, 16, 0),
      location: 'Amphithéâtre A',
      students: 25,
      description: 'Cours sur les équations différentielles'
    },
    {
      id: 2,
      title: 'Réunion pédagogique',
      type: 'meeting',
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 11, 30),
      location: 'Salle de conférence',
      students: 0,
      description: 'Réunion mensuelle avec l\'équipe pédagogique'
    },
    {
      id: 3,
      title: 'Correction des devoirs',
      type: 'work',
      start: new Date(2024, 0, 16, 9, 0),
      end: new Date(2024, 0, 16, 12, 0),
      location: 'Bureau',
      students: 0,
      description: 'Correction des devoirs de statistiques'
    },
    {
      id: 4,
      title: 'Cours de Physique',
      type: 'course',
      start: new Date(2024, 0, 17, 16, 0),
      end: new Date(2024, 0, 17, 18, 0),
      location: 'Laboratoire',
      students: 32,
      description: 'Travaux pratiques sur les lois de Newton'
    },
    {
      id: 5,
      title: 'Rendez-vous parents',
      type: 'meeting',
      start: new Date(2024, 0, 18, 14, 0),
      end: new Date(2024, 0, 18, 17, 0),
      location: 'Bureau',
      students: 0,
      description: 'Entretiens individuels avec les parents'
    }
  ];

  const eventTypes = [
    { id: 'course', label: 'Cours', color: 'bg-blue-500', icon: BookOpen },
    { id: 'meeting', label: 'Réunion', color: 'bg-green-500', icon: Users },
    { id: 'work', label: 'Travail', color: 'bg-purple-500', icon: Edit },
    { id: 'video', label: 'Vidéo', color: 'bg-red-500', icon: Video }
  ];

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const getEventColor = (type: string) => {
    const eventType = eventTypes.find(t => t.id === type);
    return eventType ? eventType.color : 'bg-gray-500';
  };

  const getEventIcon = (type: string) => {
    const eventType = eventTypes.find(t => t.id === type);
    return eventType ? eventType.icon : BookOpen;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.start.toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const todayEvents = getEventsForDate(new Date());
  const upcomingEvents = events
    .filter(event => event.start > new Date())
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Agenda</h1>
          <p className="text-gray-600 mt-1">Planifiez et organisez votre emploi du temps</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105">
            <Plus className="w-4 h-4" />
            <span>Nouvel événement</span>
          </button>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105">
            <CalendarIcon className="w-4 h-4" />
            <span>Synchroniser</span>
          </button>
        </div>
      </div>

      {/* View Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('day')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'day' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Jour
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'week' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'month' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Mois
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-700 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentDate).map((day, index) => {
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                  const isToday = day.toDateString() === new Date().toDateString();
                  const dayEvents = getEventsForDate(day);

                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border border-gray-100 rounded-lg transition-colors cursor-pointer hover:bg-gray-50 ${
                        isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                      } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        isCurrentMonth ? 'text-gray-800' : 'text-gray-400'
                      } ${isToday ? 'text-blue-600' : ''}`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => {
                          const Icon = getEventIcon(event.type);
                          return (
                            <div
                              key={event.id}
                              className={`text-xs px-2 py-1 rounded ${getEventColor(event.type)} text-white truncate`}
                            >
                              <div className="flex items-center space-x-1">
                                <Icon className="w-3 h-3" />
                                <span>{event.title}</span>
                              </div>
                            </div>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500 px-2">
                            +{dayEvents.length - 2} autres
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Events */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Aujourd'hui</h3>
            {todayEvents.length > 0 ? (
              <div className="space-y-3">
                {todayEvents.map((event) => {
                  const Icon = getEventIcon(event.type);
                  return (
                    <div key={event.id} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg ${getEventColor(event.type)} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{event.title}</p>
                        <p className="text-sm text-gray-600">
                          {formatTime(event.start)} - {formatTime(event.end)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Aucun événement aujourd'hui</p>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">À venir</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const Icon = getEventIcon(event.type);
                return (
                  <div key={event.id} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg ${getEventColor(event.type)} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{event.title}</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(event.start)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatTime(event.start)} - {formatTime(event.end)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Légende</h3>
            <div className="space-y-2">
              {eventTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div key={type.id} className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded ${type.color}`} />
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{type.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions rapides</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Créer un cours
              </button>
              <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                Planifier une réunion
              </button>
              <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                Bloquer du temps
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;