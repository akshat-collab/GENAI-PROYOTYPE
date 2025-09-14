import React from 'react';
import { 
  User, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Settings, 
  LogOut,
  Brain,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Navigation({ activeView, onViewChange }: NavigationProps) {
  const { user, signOut } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'skills', label: 'Skills Assessment', icon: Brain },
    { id: 'careers', label: 'Career Paths', icon: Target },
    { id: 'learning', label: 'Learning Hub', icon: BookOpen },
    { id: 'trends', label: 'Market Trends', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-slate-900 text-white w-64 min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          Career AI
        </h1>
        <p className="text-slate-400 text-sm mt-1">Your AI Career Advisor</p>
      </div>

      {user && (
        <div className="mb-6 p-3 bg-slate-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">{user.user_metadata?.full_name || 'User'}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      <ul className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeView === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto pt-6 border-t border-slate-700">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </nav>
  );
}