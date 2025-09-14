/*
  # Career Advisor Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text)
      - `avatar_url` (text, optional)
      - `bio` (text, optional)
      - `current_role` (text, optional)
      - `years_experience` (integer, default 0)
      - `location` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `skills`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `category` (text)
      - `description` (text)
      - `market_demand` (integer, 1-100)
      - `growth_rate` (numeric)
      - `created_at` (timestamp)
    
    - `user_skills`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `skill_id` (uuid, references skills)
      - `proficiency_level` (integer, 1-10)
      - `years_experience` (integer, default 0)
      - `verified` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `career_paths`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `required_skills` (text array)
      - `salary_min` (integer)
      - `salary_max` (integer)
      - `growth_outlook` (numeric)
      - `education_requirements` (text array)
      - `experience_level` (text)
      - `industry` (text)
      - `remote_friendly` (boolean, default false)
      - `created_at` (timestamp)
    
    - `user_goals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text)
      - `target_date` (date)
      - `progress` (integer, 0-100, default 0)
      - `status` (text, default 'active')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `learning_resources`
      - `id` (uuid, primary key)
      - `title` (text)
      - `type` (text)
      - `provider` (text)
      - `url` (text)
      - `skill_id` (uuid, references skills)
      - `difficulty_level` (integer, 1-10)
      - `duration_hours` (integer)
      - `rating` (numeric)
      - `cost` (numeric, default 0)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access to skills, career_paths, learning_resources
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text NOT NULL,
  avatar_url text,
  bio text,
  current_role text,
  years_experience integer DEFAULT 0,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  category text NOT NULL,
  description text,
  market_demand integer DEFAULT 50 CHECK (market_demand >= 1 AND market_demand <= 100),
  growth_rate numeric DEFAULT 5.0,
  created_at timestamptz DEFAULT now()
);

-- Create user_skills table
CREATE TABLE IF NOT EXISTS user_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id uuid NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  proficiency_level integer NOT NULL CHECK (proficiency_level >= 1 AND proficiency_level <= 10),
  years_experience integer DEFAULT 0,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Create career_paths table
CREATE TABLE IF NOT EXISTS career_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  required_skills text[] DEFAULT '{}',
  salary_min integer DEFAULT 0,
  salary_max integer DEFAULT 0,
  growth_outlook numeric DEFAULT 5.0,
  education_requirements text[] DEFAULT '{}',
  experience_level text DEFAULT 'entry',
  industry text,
  remote_friendly boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create user_goals table
CREATE TABLE IF NOT EXISTS user_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  target_date date,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create learning_resources table
CREATE TABLE IF NOT EXISTS learning_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  provider text NOT NULL,
  url text,
  skill_id uuid REFERENCES skills(id) ON DELETE CASCADE,
  difficulty_level integer DEFAULT 5 CHECK (difficulty_level >= 1 AND difficulty_level <= 10),
  duration_hours integer DEFAULT 0,
  rating numeric DEFAULT 0,
  cost numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policies for skills (public read, admin write)
CREATE POLICY "Anyone can read skills"
  ON skills
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for user_skills
CREATE POLICY "Users can manage own skills"
  ON user_skills
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create policies for career_paths (public read)
CREATE POLICY "Anyone can read career paths"
  ON career_paths
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for user_goals
CREATE POLICY "Users can manage own goals"
  ON user_goals
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create policies for learning_resources (public read)
CREATE POLICY "Anyone can read learning resources"
  ON learning_resources
  FOR SELECT
  TO authenticated
  USING (true);

-- Create function to handle profile creation on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();