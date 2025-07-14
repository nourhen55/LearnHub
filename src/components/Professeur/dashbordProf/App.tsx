import React, { useState } from 'react';
import Sidebar from '../Action/Sidebar';
import Dashboard from '../Action/Dashboard';
import VideoSection from '../Action/VideoSection';
import ContactSection from '../Action/ContactSection';
import ProfileSection from '../Action/ProfileSection';
import SettingsSection from '../Action/SettingsSection';
import AssignmentsSection from '../Action/AssignmentsSection';
import AttendanceSection from '../Action/AttendanceSection';
import EvaluationsSection from '../Action/EvaluationsSection';
import AnnouncementsSection from '../Action/AnnouncementsSection';
import ResourcesSection from '../Action/ResourcesSection';
import CalendarSection from '../Action/CalendarSection';
import SupportSection from '../Action/SupportSection';

function DashbordProf() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'video':
        return <VideoSection />;
      case 'contact':
        return <ContactSection />;
      case 'profile':
        return <ProfileSection />;
      case 'settings':
        return <SettingsSection />;
      case 'assignments':
        return <AssignmentsSection />;
      case 'attendance':
        return <AttendanceSection />;
      case 'evaluations':
        return <EvaluationsSection />;
      case 'announcements':
        return <AnnouncementsSection />;
      case 'resources':
        return <ResourcesSection />;
      case 'calendar':
        return <CalendarSection />;
      case 'support':
        return <SupportSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default DashbordProf;