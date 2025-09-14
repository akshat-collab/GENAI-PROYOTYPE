// AI Career Recommendation Engine
// Note: In a production environment, this would use advanced ML models
// For this demo, we'll implement a rule-based system with weighted scoring

interface SkillWeight {
  [key: string]: number;
}

interface CareerMatch {
  careerPath: string;
  matchScore: number;
  skillGaps: string[];
  strengths: string[];
}

// Sample career paths with required skills and weights
const CAREER_PATHS = {
  'Software Engineer': {
    requiredSkills: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL'],
    weights: { 'JavaScript': 0.25, 'Python': 0.2, 'React': 0.2, 'Node.js': 0.15, 'SQL': 0.1 },
    salaryRange: { min: 70000, max: 150000 },
    growthRate: 8.5,
    description: 'Design, develop, and maintain software applications',
  },
  'Data Scientist': {
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'R'],
    weights: { 'Python': 0.3, 'Machine Learning': 0.25, 'Statistics': 0.2, 'SQL': 0.15, 'R': 0.1 },
    salaryRange: { min: 80000, max: 180000 },
    growthRate: 11.2,
    description: 'Analyze complex data to help organizations make decisions',
  },
  'UX Designer': {
    requiredSkills: ['Design Thinking', 'Figma', 'User Research', 'Prototyping', 'HTML/CSS'],
    weights: { 'Design Thinking': 0.25, 'Figma': 0.2, 'User Research': 0.25, 'Prototyping': 0.2, 'HTML/CSS': 0.1 },
    salaryRange: { min: 65000, max: 140000 },
    growthRate: 7.8,
    description: 'Design user experiences for digital products',
  },
  'Product Manager': {
    requiredSkills: ['Product Strategy', 'Analytics', 'Communication', 'Agile', 'Market Research'],
    weights: { 'Product Strategy': 0.25, 'Analytics': 0.2, 'Communication': 0.25, 'Agile': 0.15, 'Market Research': 0.15 },
    salaryRange: { min: 90000, max: 200000 },
    growthRate: 9.1,
    description: 'Oversee product development and strategy',
  },
  'Cybersecurity Analyst': {
    requiredSkills: ['Network Security', 'Python', 'Risk Assessment', 'Incident Response', 'Compliance'],
    weights: { 'Network Security': 0.3, 'Python': 0.2, 'Risk Assessment': 0.2, 'Incident Response': 0.15, 'Compliance': 0.15 },
    salaryRange: { min: 75000, max: 160000 },
    growthRate: 12.8,
    description: 'Protect organizations from cyber threats',
  },
};

export function calculateCareerMatches(userSkills: { name: string; proficiency: number }[]): CareerMatch[] {
  const matches: CareerMatch[] = [];

  for (const [careerName, careerData] of Object.entries(CAREER_PATHS)) {
    let totalScore = 0;
    const userSkillMap = new Map(userSkills.map(skill => [skill.name, skill.proficiency]));
    const skillGaps: string[] = [];
    const strengths: string[] = [];

    // Calculate weighted score based on user skills
    for (const [skill, weight] of Object.entries(careerData.weights)) {
      const userProficiency = userSkillMap.get(skill) || 0;
      
      if (userProficiency === 0) {
        skillGaps.push(skill);
      } else if (userProficiency >= 7) {
        strengths.push(skill);
      }
      
      // Normalize proficiency (0-10) and apply weight
      totalScore += (userProficiency / 10) * weight;
    }

    // Bonus for having additional relevant skills
    const bonusSkills = userSkills.filter(skill => 
      !careerData.requiredSkills.includes(skill.name) && skill.proficiency >= 6
    );
    totalScore += bonusSkills.length * 0.05; // 5% bonus per additional relevant skill

    // Convert to percentage
    const matchScore = Math.round(totalScore * 100);

    matches.push({
      careerPath: careerName,
      matchScore,
      skillGaps,
      strengths,
    });
  }

  // Sort by match score descending
  return matches.sort((a, b) => b.matchScore - a.matchScore);
}

export function generateLearningPath(skillGaps: string[], currentLevel: string): any[] {
  const learningResources = {
    'JavaScript': [
      { title: 'JavaScript Fundamentals', type: 'course', duration: 40, provider: 'FreeCodeCamp' },
      { title: 'ES6+ Features', type: 'tutorial', duration: 15, provider: 'MDN' },
    ],
    'Python': [
      { title: 'Python for Beginners', type: 'course', duration: 50, provider: 'Codecademy' },
      { title: 'Data Structures in Python', type: 'course', duration: 30, provider: 'edX' },
    ],
    'React': [
      { title: 'React Official Tutorial', type: 'tutorial', duration: 25, provider: 'React.dev' },
      { title: 'Advanced React Patterns', type: 'course', duration: 35, provider: 'Pluralsight' },
    ],
    'Machine Learning': [
      { title: 'ML Basics', type: 'course', duration: 60, provider: 'Coursera' },
      { title: 'Practical ML Projects', type: 'tutorial', duration: 40, provider: 'Kaggle' },
    ],
    'Design Thinking': [
      { title: 'Design Thinking Process', type: 'course', duration: 30, provider: 'IDEO' },
      { title: 'User-Centered Design', type: 'tutorial', duration: 20, provider: 'Interaction Design Foundation' },
    ],
  };

  const path: any[] = [];
  skillGaps.forEach(skill => {
    if (learningResources[skill as keyof typeof learningResources]) {
      path.push(...learningResources[skill as keyof typeof learningResources]);
    }
  });

  return path;
}

export function predictMarketDemand(skillName: string): JobMarketData {
  // Mock data - in production, this would fetch from job market APIs
  const mockData: Record<string, JobMarketData> = {
    'JavaScript': {
      skill_name: 'JavaScript',
      demand_score: 95,
      avg_salary: 85000,
      job_postings: 15420,
      growth_rate: 8.2,
      top_companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix'],
      location_demand: { 'San Francisco': 98, 'New York': 92, 'Seattle': 89, 'Austin': 85 },
    },
    'Python': {
      skill_name: 'Python',
      demand_score: 92,
      avg_salary: 95000,
      job_postings: 12350,
      growth_rate: 11.5,
      top_companies: ['Google', 'Tesla', 'Spotify', 'Uber', 'Airbnb'],
      location_demand: { 'San Francisco': 95, 'New York': 88, 'Boston': 91, 'Seattle': 87 },
    },
    'Machine Learning': {
      skill_name: 'Machine Learning',
      demand_score: 88,
      avg_salary: 120000,
      job_postings: 8920,
      growth_rate: 15.3,
      top_companies: ['OpenAI', 'Google', 'Microsoft', 'NVIDIA', 'Amazon'],
      location_demand: { 'San Francisco': 96, 'Seattle': 92, 'Boston': 89, 'New York': 86 },
    },
  };

  return mockData[skillName] || {
    skill_name: skillName,
    demand_score: 70,
    avg_salary: 75000,
    job_postings: 5000,
    growth_rate: 6.5,
    top_companies: ['Various Tech Companies'],
    location_demand: { 'Major Cities': 75 },
  };
}