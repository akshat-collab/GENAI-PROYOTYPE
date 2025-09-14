import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Star, 
  Clock, 
  Award, 
  Filter,
  Search,
  ExternalLink,
  TrendingUp
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  provider: string;
  type: 'course' | 'tutorial' | 'certification' | 'book';
  skill: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  rating: number;
  price: number;
  image: string;
  description: string;
  students: number;
  tags: string[];
}

export default function LearningHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('all');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Complete JavaScript Course 2024',
      provider: 'TechAcademy',
      type: 'course',
      skill: 'JavaScript',
      level: 'beginner',
      duration: 45,
      rating: 4.8,
      price: 89,
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master JavaScript from basics to advanced concepts including ES6+, async/await, and modern frameworks.',
      students: 125000,
      tags: ['Web Development', 'Frontend', 'Programming'],
    },
    {
      id: '2',
      title: 'Python Data Science Bootcamp',
      provider: 'DataPro',
      type: 'course',
      skill: 'Python',
      level: 'intermediate',
      duration: 60,
      rating: 4.9,
      price: 149,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Comprehensive Python course covering pandas, numpy, matplotlib, and machine learning basics.',
      students: 89000,
      tags: ['Data Science', 'Machine Learning', 'Analytics'],
    },
    {
      id: '3',
      title: 'React Advanced Patterns',
      provider: 'ReactMasters',
      type: 'course',
      skill: 'React',
      level: 'advanced',
      duration: 35,
      rating: 4.7,
      price: 119,
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Deep dive into advanced React patterns, performance optimization, and custom hooks.',
      students: 45000,
      tags: ['React', 'Frontend', 'Advanced'],
    },
    {
      id: '4',
      title: 'UX Design Fundamentals',
      provider: 'DesignPro',
      type: 'course',
      skill: 'UX Design',
      level: 'beginner',
      duration: 30,
      rating: 4.6,
      price: 79,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn user experience design principles, wireframing, prototyping, and user research methods.',
      students: 67000,
      tags: ['Design', 'UX', 'User Research'],
    },
    {
      id: '5',
      title: 'Machine Learning A-Z',
      provider: 'AIInstitute',
      type: 'course',
      skill: 'Machine Learning',
      level: 'intermediate',
      duration: 80,
      rating: 4.8,
      price: 199,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Complete machine learning course with hands-on projects in Python, covering supervised and unsupervised learning.',
      students: 156000,
      tags: ['Machine Learning', 'AI', 'Python'],
    },
    {
      id: '6',
      title: 'AWS Cloud Practitioner Certification',
      provider: 'CloudMaster',
      type: 'certification',
      skill: 'AWS',
      level: 'beginner',
      duration: 25,
      rating: 4.5,
      price: 69,
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Prepare for the AWS Cloud Practitioner certification with comprehensive coverage of AWS services.',
      students: 78000,
      tags: ['Cloud', 'AWS', 'Certification'],
    },
  ];

  const skills = ['All', 'JavaScript', 'Python', 'React', 'UX Design', 'Machine Learning', 'AWS'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const types = ['All', 'Course', 'Tutorial', 'Certification', 'Book'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel.toLowerCase();
    const matchesType = selectedType === 'all' || course.type === selectedType.toLowerCase();
    const matchesSkill = selectedSkill === 'all' || course.skill === selectedSkill;

    return matchesSearch && matchesLevel && matchesType && matchesSkill;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-blue-600 bg-blue-100';
      case 'advanced': return 'text-purple-600 bg-purple-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return Play;
      case 'tutorial': return BookOpen;
      case 'certification': return Award;
      case 'book': return BookOpen;
      default: return BookOpen;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Learning Hub</h1>
        <p className="text-slate-600">Discover courses and resources to advance your career</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, tutorials, certifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {skills.map(skill => (
                <option key={skill} value={skill === 'All' ? 'all' : skill}>
                  {skill}
                </option>
              ))}
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {levels.map(level => (
                <option key={level} value={level === 'All' ? 'all' : level.toLowerCase()}>
                  {level}
                </option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {types.map(type => (
                <option key={type} value={type === 'All' ? 'all' : type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-slate-600">
          Showing {filteredCourses.length} results
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const TypeIcon = getTypeIcon(course.type);
          return (
            <div key={course.id} className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-2">
                    <TypeIcon className="h-4 w-4 text-slate-700" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600 font-medium">{course.provider}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">{course.description}</p>

                <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{course.duration}h</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-slate-800">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </div>
                  <button className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                    <span className="text-sm font-medium">Enroll</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-700 mb-2">No courses found</h3>
          <p className="text-slate-500">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
}