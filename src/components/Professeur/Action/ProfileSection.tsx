import React, { useState } from 'react';
import {
  User,
  Camera,
  Edit,
  Save,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Star,
  Users,
  Clock,
  Globe
} from 'lucide-react';

const ProfileSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Prof. Jean Dupont',
    email: 'jean.dupont@universite.fr',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    bio: 'Professeur de Mathématiques et de Physique avec plus de 15 ans d\'expérience dans l\'enseignement supérieur. Passionné par la transmission du savoir et l\'innovation pédagogique.',
    specialties: ['Mathématiques', 'Physique', 'Statistiques', 'Analyse numérique'],
    education: 'Doctorat en Mathématiques - Université de la Sorbonne',
    experience: '15 ans',
    languages: ['Français', 'Anglais', 'Espagnol'],
    availability: 'Lundi - Vendredi, 9h - 18h'
  });

  const stats = [
    { label: 'Étudiants', value: '248', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Cours donnés', value: '1,245', icon: BookOpen, color: 'from-green-500 to-emerald-500' },
    { label: 'Note moyenne', value: '4.8/5', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { label: 'Années d\'expérience', value: '15', icon: Clock, color: 'from-purple-500 to-pink-500' }
  ];

  const recentEvaluations = [
    { student: 'Marie Dubois', rating: 5, comment: 'Excellent professeur, très pédagogue !', date: '2024-01-10' },
    { student: 'Jean Martin', rating: 5, comment: 'Explications claires et détaillées', date: '2024-01-08' },
    { student: 'Sophie Laurent', rating: 4, comment: 'Très bon cours, merci !', date: '2024-01-05' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Logic to save profile changes
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mon Profil</h1>
          <p className="text-gray-600 mt-1">Gérez vos informations personnelles et professionnelles</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
          <span>{isEditing ? 'Sauvegarder' : 'Modifier'}</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations personnelles</h2>
            
            <div className="flex items-center space-x-6 mb-6">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{profile.name}</h3>
                <p className="text-gray-600">{profile.education}</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">Actif</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-800">{profile.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-800">{profile.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Localisation</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-800">{profile.location}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Disponibilité</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.availability}
                        onChange={(e) => setProfile({...profile, availability: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-800">{profile.availability}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Biographie</h2>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
            )}
          </div>

          {/* Specialties */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Spécialités</h2>
            <div className="flex flex-wrap gap-2">
              {profile.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Side Information */}
        <div className="space-y-6">
          {/* Languages */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Langues</h2>
            <div className="space-y-2">
              {profile.languages.map((language, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{language}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Evaluations */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Dernières évaluations</h2>
            <div className="space-y-4">
              {recentEvaluations.map((evaluation, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{evaluation.student}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < evaluation.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{evaluation.comment}</p>
                  <p className="text-xs text-gray-500">{evaluation.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;