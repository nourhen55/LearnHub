import React, { useState } from 'react';
import {
  UserCheck,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Download,
  Plus,
  Edit,
  Search,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const AttendanceSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('all');

  const classes = [
    { id: 'math101', name: 'Mathématiques 101', students: 25 },
    { id: 'physics201', name: 'Physique 201', students: 32 },
    { id: 'stats301', name: 'Statistiques 301', students: 18 }
  ];

  const students = [
    {
      id: 1,
      name: 'Marie Dubois',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      class: 'math101',
      attendance: {
        present: 18,
        absent: 2,
        late: 1,
        total: 21
      },
      todayStatus: 'present'
    },
    {
      id: 2,
      name: 'Jean Martin',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      class: 'math101',
      attendance: {
        present: 15,
        absent: 4,
        late: 2,
        total: 21
      },
      todayStatus: 'absent'
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      class: 'math101',
      attendance: {
        present: 19,
        absent: 1,
        late: 1,
        total: 21
      },
      todayStatus: 'late'
    },
    {
      id: 4,
      name: 'Pierre Durand',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      class: 'physics201',
      attendance: {
        present: 20,
        absent: 0,
        late: 1,
        total: 21
      },
      todayStatus: 'present'
    }
  ];

  const attendanceStats = [
    { label: 'Présents aujourd\'hui', value: '89%', count: '178/200', icon: CheckCircle, color: 'from-green-500 to-emerald-500', trend: 'up' },
    { label: 'Absents', value: '8%', count: '16/200', icon: XCircle, color: 'from-red-500 to-pink-500', trend: 'down' },
    { label: 'En retard', value: '3%', count: '6/200', icon: AlertCircle, color: 'from-yellow-500 to-orange-500', trend: 'up' },
    { label: 'Taux moyen', value: '92%', count: 'Cette semaine', icon: TrendingUp, color: 'from-blue-500 to-cyan-500', trend: 'up' }
  ];

  const recentActivity = [
    { student: 'Marie Dubois', action: 'Marquée présente', time: '9:05', type: 'present' },
    { student: 'Jean Martin', action: 'Marqué absent', time: '9:00', type: 'absent' },
    { student: 'Sophie Laurent', action: 'Marquée en retard', time: '9:15', type: 'late' },
    { student: 'Pierre Durand', action: 'Marqué présent', time: '9:03', type: 'present' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'late':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const calculateAttendanceRate = (student: any) => {
    return Math.round((student.attendance.present / student.attendance.total) * 100);
  };

  const handleAttendanceChange = (studentId: number, status: string) => {
    // Logic to update attendance status
    console.log(`Student ${studentId} marked as ${status}`);
  };

  const filteredStudents = selectedClass === 'all' 
    ? students 
    : students.filter(student => student.class === selectedClass);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Présence & Discipline</h1>
          <p className="text-gray-600 mt-1">Suivez la présence et gérez la discipline des étudiants</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105">
            <Plus className="w-4 h-4" />
            <span>Nouvelle session</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {attendanceStats.map((stat, index) => {
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
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classe
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Toutes les classes</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher un étudiant..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Liste de présence</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">{student.name}</h4>
                        <p className="text-sm text-gray-600">
                          Taux: {calculateAttendanceRate(student)}% 
                          ({student.attendance.present}/{student.attendance.total})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(student.todayStatus)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.todayStatus)}`}>
                          {student.todayStatus === 'present' ? 'Présent' : 
                           student.todayStatus === 'absent' ? 'Absent' : 'En retard'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleAttendanceChange(student.id, 'present')}
                          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(student.id, 'late')}
                          className="p-1 text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                        >
                          <AlertCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(student.id, 'absent')}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Activité récente</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'present' ? 'bg-green-100' :
                    activity.type === 'absent' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    {getStatusIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      <span className="font-medium">{activity.student}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
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
                Marquer tous présents
              </button>
              <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                Envoyer rappel absences
              </button>
              <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                Générer rapport
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSection;