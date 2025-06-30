import React, { useState } from 'react'; 
import '../index.css';

import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Play,
  Search,
  Star,
  CheckCircle,
  BarChart3,
  Zap,
  Heart,
  Bookmark,
  Grid,
  List,
  Plus,
  Target,
  Activity,
  Users,
  Lightbulb,
  Gift
} from 'lucide-react';

// هنا نوعي Types لو تحب تستعملهم، أو إحذفهم لو ما عندكش تعريف
// import { Course, UserStats, UserProfile } from '../types';

export const Dashboard: React.FC = () => {
  // تعويض useTheme بقيم ثابتة:
  const isDarkMode = false;
  const currentThemeColor = 'blue';
  const translations = {
    'Tous': 'Tous',
    'Bonjour': 'Bonjour',
    'Prêt à continuer votre parcours d\'apprentissage ?': 'Prêt à continuer votre parcours d\'apprentissage ?',
    'Cours Terminés': 'Cours Terminés',
    'Série d\'apprentissage': 'Série d\'apprentissage',
    'Temps Total': 'Temps Total',
    'Classement': 'Classement',
    'Rechercher un cours...': 'Rechercher un cours...',
    'Mes Cours': 'Mes Cours',
    'Langues': 'Langues',
    'Technologie': 'Technologie',
    'Business': 'Business',
    'Design': 'Design'
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy] = useState<'recent' | 'progress' | 'name'>('recent');

  const userProfile = {
    name: "Sophie Martin",
    email: "sophie.martin@email.com",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
    level: "Intermédiaire",
    joinDate: "Janvier 2023",
    location: "Paris, France",
    bio: "Passionnée par l'apprentissage continu et le développement personnel.",
    skills: ["JavaScript", "React", "Python", "Design UX", "Marketing Digital"],
    achievements: 24,
    followers: 156,
    following: 89
  };

  const userStats = {
    coursesCompleted: 12,
    totalCourses: 18,
    learningStreak: 7,
    totalHours: 84,
    certificates: 5,
    currentLevel: "Intermédiaire",
    weeklyGoal: 10,
    weeklyProgress: 7,
    rank: 156,
    points: 2840
  };

  const courses = [
    {
      id: "1",
      title: "Français Niveau 1",
      category: "Langues",
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      difficulty: "Débutant",
      instructor: "Marie Dubois",
      duration: "8h 30min",
      image: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400",
      lastAccessed: "Hier",
      rating: 4.8,
      studentsCount: 1250,
      isFavorite: true,
      isBookmarked: false
    },
    // ...أضف باقي الدورات هنا أو اترك هذه واحدة فقط للاختبار
  ];

  const categories = [
    translations['Tous'],
    translations['Langues'],
    translations['Technologie'],
    translations['Business'],
    translations['Design']
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === translations['Tous'] || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'progress':
        return b.progress - a.progress;
      case 'name':
        return a.title.localeCompare(b.title);
      case 'recent':
      default:
        return 0;
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Débutant":
        return isDarkMode ? "text-green-400 bg-green-900" : "text-green-600 bg-green-100";
      case "Intermédiaire":
        return isDarkMode ? "text-yellow-400 bg-yellow-900" : "text-yellow-600 bg-yellow-100";
      case "Avancé":
        return isDarkMode ? "text-red-400 bg-red-900" : "text-red-600 bg-red-100";
      default:
        return isDarkMode ? "text-gray-400 bg-gray-800" : "text-gray-600 bg-gray-100";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return `bg-green-500`;
    if (progress >= 75) return `bg-${currentThemeColor}-500`;
    if (progress >= 50) return `bg-yellow-500`;
    return `bg-gray-400`;
  };

  const baseClasses = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900';

  const cardClasses = isDarkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-100';

  return (
    <div className={`min-h-screen ${baseClasses}`}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {translations['Bonjour']} {userProfile.name.split(' ')[0]} !
        </h2>

        <input
          type="text"
          placeholder={translations['Rechercher un cours...']}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mb-6 p-3 border rounded-lg"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCourses.map((course) => (
            <div key={course.id} className={`${cardClasses} rounded-xl shadow-sm border p-6`}>
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-bold mb-2">{course.title}</h3>
              <p className="mb-2">Par {course.instructor}</p>
              <p className="mb-2">Progression : {course.progress}%</p>
              <div className={`inline-block px-2 py-1 rounded ${getDifficultyColor(course.difficulty)}`}>
                {course.difficulty}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
