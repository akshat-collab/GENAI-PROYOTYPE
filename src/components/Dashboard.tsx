import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Award,
  ArrowUpRight,
  Brain,
  Briefcase,
  DollarSign,
  Clock
} from 'lucide-react';
import { calculateCareerMatches, predictMarketDemand } from '../utils/careerAI';

export default function Dashboard() {
  const [stats, setStats] = useState({
    skillsAssessed: 12,
    careerMatches: 8,
    coursesCompleted: 3,
    goalProgress: 67,
  });

  const [topRecommendations, setTopRecommendations] = useState<any[]>([]);
  const [marketInsights, setMarketInsights] = useState<any[]>([]);

  useEffect(() => {
    // Mock user skills for demo
    const mockSkills = [
      { name: 'JavaScript', proficiency: 8 },
      { name: 'Python', proficiency: 6 },
      { name: 'React', proficiency: 7 },
      { name: 'SQL', proficiency: 5 },
    ];

    const matches = calculateCareerMatches(mockSkills);
    setTopRecommendations(matches.slice(0, 3));

    // Get market insights for user's top skills
    const insights = mockSkills.map(skill => predictMarketDemand(skill.name));
    setMarketInsights(insights);
  }, []);

  const statCards = [
    {
      title: 'Skills Assessed',
      value: stats.skillsAssessed,
      icon: Brain,
      color: 'from-blue-500 to-blue-600',
      change: '+2 this week',
    },
    {
      title: 'Career Matches',
      value: stats.careerMatches,
      icon: Target,
      color: 'from-teal-500 to-teal-600',
      change: '3 new matches',
    },
    {
      title: 'Courses Completed',
      value: stats.coursesCompleted,
      icon: BookOpen,
      color: 'from-orange-500 to-orange-600',
      change: '1 this month',
    },
    {
      title: 'Goal Progress',
      value: `${stats.goalProgress}%`,
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      change: '+12% this month',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back! 👋</h1>
        <p className="text-slate-600">Here's your career development overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</h3>
              <p className="text-slate-600 text-sm mb-2">{stat.title}</p>
              <p className="text-green-600 text-xs font-medium">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Career Recommendations */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Top Career Matches</h2>
            <Briefcase className="h-5 w-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {topRecommendations.map((rec, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-slate-800">{rec.careerPath}</h3>
                  <span className="text-sm font-semibold text-green-600">{rec.matchScore}% match</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>High demand</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-3 w-3" />
                    <span>$70k-150k</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${rec.matchScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Insights */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Market Insights</h2>
            <TrendingUp className="h-5 w-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {marketInsights.map((insight, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-slate-800">{insight.skill_name}</h3>
                  <span className="text-sm font-semibold text-blue-600">
                    Demand: {insight.demand_score}/100
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                  <div>
                    <span className="text-slate-500">Avg Salary:</span>
                    <p className="font-medium">${insight.avg_salary.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Growth Rate:</span>
                    <p className="font-medium text-green-600">+{insight.growth_rate}%</p>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-slate-500">Job Postings:</span>
                  <p className="text-sm font-medium">{insight.job_postings.toLocaleString()} active</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 text-left">
            <Brain className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-slate-800 mb-1">Take Skills Assessment</h3>
            <p className="text-sm text-slate-600">Update your skill profile</p>
          </button>
          <button className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 text-left">
            <BookOpen className="h-8 w-8 text-teal-600 mb-2" />
            <h3 className="font-medium text-slate-800 mb-1">Browse Courses</h3>
            <p className="text-sm text-slate-600">Find learning resources</p>
          </button>
          <button className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 text-left">
            <Clock className="h-8 w-8 text-orange-600 mb-2" />
            <h3 className="font-medium text-slate-800 mb-1">Set New Goals</h3>
            <p className="text-sm text-slate-600">Plan your career journey</p>
          </button>
        </div>
      </div>
    </div>
  );
}