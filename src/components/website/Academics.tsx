import React, { useState } from 'react';
import { BookOpen, Users, Clock, Award, ArrowRight, Search, Filter } from 'lucide-react';

const Academics: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const departments = [
    {
      id: 'cse',
      name: 'Computer Science & Engineering',
      description: 'Cutting-edge programs in software development, AI, and data science',
      students: 1200,
      faculty: 45,
      courses: 12,
      color: 'bg-blue-500',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'ece',
      name: 'Electronics & Communication',
      description: 'Advanced electronics, telecommunications, and embedded systems',
      students: 800,
      faculty: 32,
      courses: 10,
      color: 'bg-green-500',
      image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'mech',
      name: 'Mechanical Engineering',
      description: 'Traditional and modern mechanical engineering with robotics',
      students: 900,
      faculty: 38,
      courses: 11,
      color: 'bg-orange-500',
      image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'civil',
      name: 'Civil Engineering',
      description: 'Infrastructure development and sustainable construction',
      students: 700,
      faculty: 28,
      courses: 9,
      color: 'bg-purple-500',
      image: 'https://images.pexels.com/photos/3862365/pexels-photo-3862365.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'mba',
      name: 'Business Administration',
      description: 'Comprehensive business education with industry focus',
      students: 400,
      faculty: 20,
      courses: 8,
      color: 'bg-indigo-500',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'arts',
      name: 'Arts & Sciences',
      description: 'Liberal arts, sciences, and interdisciplinary studies',
      students: 600,
      faculty: 35,
      courses: 15,
      color: 'bg-pink-500',
      image: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const courses = [
    {
      name: 'B.Tech Computer Science',
      department: 'cse',
      duration: '4 years',
      seats: 120,
      eligibility: '10+2 with PCM',
      fees: '₹1,50,000/year'
    },
    {
      name: 'M.Tech AI & ML',
      department: 'cse',
      duration: '2 years',
      seats: 60,
      eligibility: 'B.Tech in relevant field',
      fees: '₹2,00,000/year'
    },
    {
      name: 'B.Tech Electronics',
      department: 'ece',
      duration: '4 years',
      seats: 100,
      eligibility: '10+2 with PCM',
      fees: '₹1,40,000/year'
    },
    {
      name: 'MBA General',
      department: 'mba',
      duration: '2 years',
      seats: 80,
      eligibility: 'Bachelor\'s degree',
      fees: '₹3,00,000/year'
    },
    {
      name: 'B.Tech Mechanical',
      department: 'mech',
      duration: '4 years',
      seats: 120,
      eligibility: '10+2 with PCM',
      fees: '₹1,45,000/year'
    },
    {
      name: 'B.Sc Physics',
      department: 'arts',
      duration: '3 years',
      seats: 60,
      eligibility: '10+2 with PCM',
      fees: '₹80,000/year'
    }
  ];

  const filteredDepartments = departments.filter(dept =>
    (selectedDepartment === 'all' || dept.id === selectedDepartment) &&
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCourses = courses.filter(course =>
    (selectedDepartment === 'all' || course.department === selectedDepartment) &&
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Academic Programs</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover world-class education across diverse disciplines designed for tomorrow's leaders
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search departments or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Departments</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse academic departments, each offering specialized programs and research opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDepartments.map((department) => (
              <div key={department.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <img 
                  src={department.image} 
                  alt={department.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className={`w-3 h-3 ${department.color} rounded-full mr-3`}></div>
                    <h3 className="text-xl font-semibold text-gray-900">{department.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{department.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{department.students}</div>
                      <div className="text-xs text-gray-500">Students</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <BookOpen className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{department.faculty}</div>
                      <div className="text-xs text-gray-500">Faculty</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Award className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{department.courses}</div>
                      <div className="text-xs text-gray-500">Courses</div>
                    </div>
                  </div>
                  
                  <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    <span>View Courses</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Details</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Detailed information about our academic programs, eligibility, and admission requirements
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Seats</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Eligibility</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.map((course, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{course.name}</div>
                        <div className="text-sm text-gray-500">
                          {departments.find(d => d.id === course.department)?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{course.duration}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.seats}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.eligibility}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {course.fees}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 transition-colors">
                          More Info
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Calendar</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Important dates and events for the current academic year
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { event: 'Admission Opens', date: 'March 1, 2024', color: 'bg-blue-100 text-blue-800' },
              { event: 'Classes Begin', date: 'July 15, 2024', color: 'bg-green-100 text-green-800' },
              { event: 'Mid-term Exams', date: 'October 1-15, 2024', color: 'bg-amber-100 text-amber-800' },
              { event: 'Final Exams', date: 'April 1-30, 2025', color: 'bg-purple-100 text-purple-800' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${item.color}`}>
                  {item.event}
                </div>
                <p className="text-gray-900 font-semibold">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;