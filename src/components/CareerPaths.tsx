import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Clock, 
  Star,
  ExternalLink,
  Users,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { calculateCareerMatches, generateLearningPath } from '../utils/careerAI';

interface CareerMatch {
  careerPath: string;
  matchScore: number;
  skillGaps: string[];
  strengths: string[];
}

export default function CareerPaths() {
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<CareerMatch | null>(null);
  const [learningPath, setLearningPath] = useState<any[]>([]);

  useEffect(() => {
    // Mock user skills for demo
    const mockSkills = [
      { name: 'JavaScript', proficiency: 8 },
      { name: 'Python', proficiency: 6 },
      { name: 'React', proficiency: 7 },
      { name: 'SQL', proficiency: 5 },
      { name: 'Communication', proficiency: 8 },
      { name: 'Problem Solving', proficiency: 9 },
    ];

    const matches = calculateCareerMatches(mockSkills);
    setCareerMatches(matches);
    
    if (matches.length > 0) {
      setSelectedCareer(matches[0]);
      const path = generateLearningPath(matches[0].skillGaps, 'intermediate');
      setLearningPath(path);
    }
  }, []);

  const handleCareerSelect = (career: CareerMatch) => {
    setSelectedCareer(career);
    const path = generateLearningPath(career.skillGaps, 'intermediate');
    setLearningPath(path);
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-blue-500 to-blue-600';
    if (score >= 40) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getMatchLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Needs Development';
  };

  const careerDetails = {
    'Software Engineer': {
      description: 'Design, develop, and maintain software applications using various programming languages and frameworks.',
      salaryRange: '$70,000 - $150,000',
      growthRate: '+8.5%',
      companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix'],
      locations: ['San Francisco', 'Seattle', 'New York', 'Austin'],
      requirements: ['Bachelor\'s degree in CS or related field', '2+ years programming experience'],
      workStyle: '70% Remote opportunities',
    },
    'Data Scientist': {
      description: 'Analyze complex data to help organizations make strategic business decisions using statistical methods and machine learning.',
      salaryRange: '$80,000 - $180,000',
      growthRate: '+11.2%',
      companies: ['Google', 'Tesla', 'Spotify', 'Uber', 'Airbnb'],
      locations: ['San Francisco', 'Boston', 'Seattle', 'New York'],
      requirements: ['Master\'s degree in Statistics/Math/CS', 'Experience with ML tools'],
      workStyle: '60% Remote opportunities',
    },
    'UX Designer': {
      description: 'Create intuitive and engaging user experiences for digital products through research, design, and testing.',
      salaryRange: '$65,000 - $140,000',
      growthRate: '+7.8%',
      companies: ['Apple', 'Adobe', 'Figma', 'Spotify', 'Airbnb'],
      locations: ['San Francisco', 'New York', 'Los Angeles', 'Portland'],
      requirements: ['Bachelor\'s in Design or related field', 'Portfolio of UX work'],
      workStyle: '65% Remote opportunities',
    },
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Career Path Recommendations</h1>
        <p className="text-slate-600">Discover career paths tailored to your skills and interests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Career Matches List */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Your Matches</h2>
          <div className="space-y-4">
            {careerMatches.map((career, index) => (
              <div
                key={career.careerPath}
                onClick={() => handleCareerSelect(career)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedCareer?.careerPath === career.careerPath
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-slate-800">{career.careerPath}</h3>
                  <span className="text-sm font-semibold text-blue-600">#{index + 1}</span>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-600">{getMatchLabel(career.matchScore)}</span>
                    <span className="font-medium">{career.matchScore}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${getMatchColor(career.matchScore)} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${career.matchScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{career.strengths.length} strengths</span>
                  <span>{career.skillGaps.length} gaps to fill</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Details */}
        <div className="lg:col-span-2">
          {selectedCareer && (
            <div className="bg-white rounded-xl shadow-lg border border-slate-100">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-slate-800">{selectedCareer.careerPath}</h2>
                  <div className={`px-4 py-2 bg-gradient-to-r ${getMatchColor(selectedCareer.matchScore)} text-white rounded-full`}>
                    <span className="text-sm font-semibold">{selectedCareer.matchScore}% Match</span>
                  </div>
                </div>
                
                <p className="text-slate-600 mb-6">
                  {careerDetails[selectedCareer.careerPath as keyof typeof careerDetails]?.description}
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-slate-700">Salary Range</span>
                    </div>
                    <p className="text-lg font-bold text-slate-800">
                      {careerDetails[selectedCareer.careerPath as keyof typeof careerDetails]?.salaryRange}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-slate-700">Growth Rate</span>
                    </div>
                    <p className="text-lg font-bold text-green-600">
                      {careerDetails[selectedCareer.careerPath as keyof typeof careerDetails]?.growthRate}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-slate-700">Work Style</span>
                    </div>
                    <p className="text-lg font-bold text-slate-800">
                      {careerDetails[selectedCareer.careerPath as keyof typeof careerDetails]?.workStyle}
                    </p>
                  </div>
                </div>

                {/* Strengths and Gaps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Your Strengths</span>
                    </h3>
                    <div className="space-y-2">
                      {selectedCareer.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      <span>Skills to Develop</span>
                    </h3>
                    <div className="space-y-2">
                      {selectedCareer.skillGaps.map((gap, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{gap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Path */}
              {learningPath.length > 0 && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-teal-600" />
                    <span>Recommended Learning Path</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {learningPath.map((resource, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-slate-800">{resource.title}</h4>
                          <ExternalLink className="h-4 w-4 text-slate-400" />
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                          <span className="capitalize">{resource.type}</span>
                          <span>•</span>
                          <span>{resource.provider}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span>{resource.duration} hours</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Companies */}
              <div className="p-6 bg-slate-50 rounded-b-xl">
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                  <Users className="h-4 w-4 text-orange-600" />
                  <span>Top Hiring Companies</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {careerDetails[selectedCareer.careerPath as keyof typeof careerDetails]?.companies.map((company, index) => (
                    <span key={index} className="px-3 py-1 bg-white text-slate-700 text-sm rounded-full border border-slate-200">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}