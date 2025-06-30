import React, { useState } from 'react';
import { SettingsProvider } from './contexts/SettingsContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';

function Dashbord() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <Header />
        <div className="flex">
          <Sidebar 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <Dashboard activeCategory={activeCategory} />
        </div>
      </div>
    </SettingsProvider>
  );
}

export default Dashbord;