import React, { useState, useMemo } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { Course } from '../types';
import { CourseCard } from './CourseCard';
import { coursesData } from '../data/coursesData';

interface DashboardProps {
  activeCategory: string;
}

export function Dashboard({ activeCategory }: DashboardProps) {
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'title' | 'progress' | 'duration'>('title');
  const [filterLevel, setFilterLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses;

    // Filter by category
    if (activeCategory !== 'all') {
      if (activeCategory === 'favorites') {
        filtered = filtered.filter(course => course.isFavorite);
      } else if (activeCategory === 'progress') {
        filtered = filtered.filter(course => course.progress > 0);
      } else if (activeCategory === 'recent') {
        filtered = filtered.filter(course => course.isNew);
      } else {
        filtered = filtered.filter(course => course.category === activeCategory);
      }
    }

    // Filter by level
    if (filterLevel !== 'all') {
      filtered = filtered.filter(course => course.level === filterLevel);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'progress':
          return b.progress - a.progress;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        default:
          return 0;
      }
    });

    return filtered;
  }, [courses, activeCategory, filterLevel, sortBy]);

  const handleToggleFavorite = (courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, isFavorite: !course.isFavorite }
        : course
    ));
  };

  const handleStartCourse = (courseId: string) => {
    console.log('Starting course:', courseId);
    // Ici on pourrait naviguer vers la page du cours
  };

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'all': return 'Tous les cours';
      case 'development': return 'Cours de développement';
      case 'design': return 'Cours de design';
      case 'exercises': return 'Exercices pratiques';
      case 'favorites': return 'Mes favoris';
      case 'progress': return 'Cours en cours';
      case 'recent': return 'Récemment ajoutés';
      default: return 'Cours';
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-800">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {getCategoryTitle()}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {filteredAndSortedCourses.length} cours disponible{filteredAndSortedCourses.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Filters and controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          {/* Level filter */}
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value as any)}
            className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les niveaux</option>
            <option value="beginner">Débutant</option>
            <option value="intermediate">Intermédiaire</option>
            <option value="advanced">Avancé</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="title">Trier par titre</option>
            <option value="progress">Trier par progression</option>
            <option value="duration">Trier par durée</option>
          </select>
        </div>

        {/* View mode */}
        <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-500 text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-500 text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Courses grid */}
      {filteredAndSortedCourses.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredAndSortedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onToggleFavorite={handleToggleFavorite}
              onStartCourse={handleStartCourse}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Filter className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Aucun cours trouvé
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Essayez de modifier vos filtres pour voir plus de résultats.
          </p>
        </div>
      )}
    </div>
  );
}