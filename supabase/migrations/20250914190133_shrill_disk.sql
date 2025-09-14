/*
  # Seed Initial Data

  1. Skills
    - Add common programming and soft skills
    - Include market demand and growth rates

  2. Career Paths
    - Popular tech career paths
    - Include salary ranges and requirements

  3. Learning Resources
    - Sample courses and tutorials
    - Link to relevant skills
*/

-- Insert initial skills
INSERT INTO skills (name, category, description, market_demand, growth_rate) VALUES
('JavaScript', 'Programming', 'Popular programming language for web development', 95, 8.5),
('Python', 'Programming', 'Versatile programming language for web, data science, and AI', 92, 11.2),
('React', 'Frontend', 'JavaScript library for building user interfaces', 88, 9.1),
('Node.js', 'Backend', 'JavaScript runtime for server-side development', 82, 7.8),
('SQL', 'Database', 'Language for managing relational databases', 90, 6.5),
('Machine Learning', 'AI/ML', 'Algorithms that learn from data', 85, 15.3),
('UX Design', 'Design', 'User experience design principles and practices', 78, 7.2),
('Project Management', 'Management', 'Planning and executing projects effectively', 83, 5.8),
('Communication', 'Soft Skills', 'Effective verbal and written communication', 95, 4.2),
('Problem Solving', 'Soft Skills', 'Analytical thinking and solution development', 92, 3.8),
('Leadership', 'Soft Skills', 'Leading teams and driving results', 87, 4.5),
('Data Analysis', 'Analytics', 'Analyzing data to derive insights', 89, 12.1),
('Cloud Computing', 'Infrastructure', 'AWS, Azure, GCP cloud platforms', 91, 18.5),
('Cybersecurity', 'Security', 'Protecting systems from digital threats', 86, 14.7),
('Mobile Development', 'Programming', 'iOS and Android app development', 79, 6.8)
ON CONFLICT (name) DO NOTHING;

-- Insert career paths
INSERT INTO career_paths (title, description, required_skills, salary_min, salary_max, growth_outlook, education_requirements, experience_level, industry, remote_friendly) VALUES
(
  'Software Engineer',
  'Design, develop, and maintain software applications using various programming languages and frameworks.',
  ARRAY['JavaScript', 'Python', 'SQL', 'Problem Solving'],
  70000, 150000, 8.5,
  ARRAY['Bachelor''s degree in Computer Science or related field', 'Strong programming fundamentals'],
  'entry',
  'Technology',
  true
),
(
  'Data Scientist',
  'Analyze complex data to help organizations make strategic business decisions using statistical methods and machine learning.',
  ARRAY['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
  80000, 180000, 11.2,
  ARRAY['Master''s degree in Statistics, Mathematics, or Computer Science', 'Experience with ML tools'],
  'mid',
  'Technology',
  true
),
(
  'UX Designer',
  'Create intuitive and engaging user experiences for digital products through research, design, and testing.',
  ARRAY['UX Design', 'Problem Solving', 'Communication'],
  65000, 140000, 7.8,
  ARRAY['Bachelor''s degree in Design, HCI, or related field', 'Portfolio of UX work'],
  'entry',
  'Design',
  true
),
(
  'Product Manager',
  'Oversee product development lifecycle from conception to launch, working with cross-functional teams.',
  ARRAY['Project Management', 'Communication', 'Leadership', 'Data Analysis'],
  90000, 200000, 9.1,
  ARRAY['Bachelor''s degree in Business, Engineering, or related field', 'Product management experience'],
  'mid',
  'Technology',
  true
),
(
  'Cloud Architect',
  'Design and implement cloud infrastructure solutions for scalable and reliable applications.',
  ARRAY['Cloud Computing', 'Python', 'SQL', 'Problem Solving'],
  100000, 220000, 18.5,
  ARRAY['Bachelor''s degree in Computer Science', 'Cloud certifications (AWS, Azure, GCP)'],
  'senior',
  'Technology',
  true
),
(
  'Cybersecurity Analyst',
  'Protect organizations from cyber threats through monitoring, analysis, and incident response.',
  ARRAY['Cybersecurity', 'Python', 'Problem Solving'],
  75000, 160000, 14.7,
  ARRAY['Bachelor''s degree in Cybersecurity or Computer Science', 'Security certifications preferred'],
  'entry',
  'Security',
  false
)
ON CONFLICT DO NOTHING;

-- Insert sample learning resources
INSERT INTO learning_resources (title, type, provider, url, skill_id, difficulty_level, duration_hours, rating, cost) VALUES
(
  'JavaScript Fundamentals',
  'course',
  'FreeCodeCamp',
  'https://freecodecamp.org/javascript',
  (SELECT id FROM skills WHERE name = 'JavaScript'),
  3, 40, 4.8, 0
),
(
  'Python for Beginners',
  'course',
  'Codecademy',
  'https://codecademy.com/python',
  (SELECT id FROM skills WHERE name = 'Python'),
  2, 50, 4.7, 49
),
(
  'React Official Tutorial',
  'tutorial',
  'React.dev',
  'https://react.dev/tutorial',
  (SELECT id FROM skills WHERE name = 'React'),
  4, 25, 4.9, 0
),
(
  'Machine Learning Basics',
  'course',
  'Coursera',
  'https://coursera.org/ml-basics',
  (SELECT id FROM skills WHERE name = 'Machine Learning'),
  6, 60, 4.6, 79
),
(
  'UX Design Process',
  'course',
  'IDEO',
  'https://ideo.com/ux-course',
  (SELECT id FROM skills WHERE name = 'UX Design'),
  3, 30, 4.5, 99
),
(
  'SQL Complete Guide',
  'course',
  'W3Schools',
  'https://w3schools.com/sql',
  (SELECT id FROM skills WHERE name = 'SQL'),
  3, 35, 4.4, 0
),
(
  'AWS Cloud Practitioner',
  'certification',
  'AWS Training',
  'https://aws.amazon.com/training',
  (SELECT id FROM skills WHERE name = 'Cloud Computing'),
  4, 25, 4.3, 300
),
(
  'Cybersecurity Fundamentals',
  'course',
  'SANS',
  'https://sans.org/cyber-fundamentals',
  (SELECT id FROM skills WHERE name = 'Cybersecurity'),
  5, 45, 4.7, 199
)
ON CONFLICT DO NOTHING;