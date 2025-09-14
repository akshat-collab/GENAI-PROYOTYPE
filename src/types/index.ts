export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  market_demand: number;
  growth_rate: number;
  created_at: string;
}

export interface UserSkill {
  id: string;
  user_id: string;
  skill_id: string;
  proficiency_level: number; // 1-10
  years_experience: number;
  verified: boolean;
  created_at: string;
  skill: Skill;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  required_skills: string[];
  salary_range: {
    min: number;
    max: number;
  };
  growth_outlook: number;
  education_requirements: string[];
  experience_level: 'entry' | 'mid' | 'senior';
  industry: string;
  remote_friendly: boolean;
  created_at: string;
}

export interface RecommendedPath {
  career_path: CareerPath;
  match_score: number;
  skill_gaps: string[];
  learning_time_estimate: number; // in months
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'course' | 'book' | 'tutorial' | 'certification';
  provider: string;
  url: string;
  skill_id: string;
  difficulty_level: number;
  duration_hours: number;
  rating: number;
  cost: number;
  created_at: string;
}

export interface JobMarketData {
  skill_name: string;
  demand_score: number;
  avg_salary: number;
  job_postings: number;
  growth_rate: number;
  top_companies: string[];
  location_demand: Record<string, number>;
}

export interface UserGoal {
  id: string;
  user_id: string;
  title: string;
  description: string;
  target_date: string;
  progress: number; // 0-100
  status: 'active' | 'completed' | 'paused';
  created_at: string;
}