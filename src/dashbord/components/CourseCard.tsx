import React from 'react';
import { 
  Clock, 
  User, 
  Star, 
  Play, 
  BookOpen,
  Code,
  Palette,
  Dumbbell,
  Heart,
  TrendingUp
} from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onToggleFavorite: (courseId: string) => void;
  onStartCourse: (courseId: string) => void;
}

export function CourseCard({ course, onToggleFavorite, onStartCourse }: CourseCardProps) {
  const categoryIcons = {
    development: Code,
    design: Palette,
    exercises: Dumbbell,
  };

  const levelColors = {
    beginner: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400',
    intermediate: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400',
    advanced: 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400',
  };

  const CategoryIcon = categoryIcons[course.category];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
      {/* Image et badges */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {course.isNew && (
            <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Nouveau
            </span>
          )}
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${levelColors[course.level]}`}>
            {course.level === 'beginner' ? 'Débutant' : course.level === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
          </span>
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => onToggleFavorite(course.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              course.isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`w-4 h-4 ${course.isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Play button */}
        <button
          onClick={() => onStartCourse(course.id)}
          className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 group-hover:scale-110"
        >
          <Play className="w-5 h-5" />
        </button>

        {/* Progress bar */}
        {course.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category and title */}
        <div className="flex items-center space-x-2 mb-3">
          <CategoryIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {course.category === 'development' ? 'Développement' : 
             course.category === 'design' ? 'Design' : 'Exercices'}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {course.tags.length > 3 && (
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              +{course.tags.length - 3}
            </span>
          )}
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        {course.progress > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Progression</span>
              <span className="font-medium text-gray-900 dark:text-white">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action button */}
        <button
          onClick={() => onStartCourse(course.id)}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group"
        >
          {course.progress > 0 ? (
            <>
              <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Continuer</span>
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Commencer</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}