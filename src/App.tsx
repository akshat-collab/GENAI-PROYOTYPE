import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import AuthForm from './components/AuthForm';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import SkillsAssessment from './components/SkillsAssessment';
import CareerPaths from './components/CareerPaths';
import LearningHub from './components/LearningHub';

function App() {
  const { user, loading } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'skills':
        return <SkillsAssessment />;
      case 'careers':
        return <CareerPaths />;
      case 'learning':
        return <LearningHub />;
      case 'trends':
        return <div className="p-8"><h1>Market Trends - Coming Soon</h1></div>;
      case 'profile':
        return <div className="p-8"><h1>Profile - Coming Soon</h1></div>;
      case 'settings':
        return <div className="p-8"><h1>Settings - Coming Soon</h1></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto">
        {renderActiveView()}
      </main>
    </div>
  );
}

export default App;