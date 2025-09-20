import React from 'react';
import { Award, Target, Eye, Users, BookOpen, Globe, Trophy, Star } from 'lucide-react';

const About: React.FC = () => {
  const achievements = [
    { title: 'NAAC A+ Accredited', description: 'Highest grade from National Assessment and Accreditation Council' },
    { title: 'Top 50 Engineering Colleges', description: 'Ranked among India\'s premier engineering institutions' },
    { title: '95% Placement Rate', description: 'Excellent career opportunities for our graduates' },
    { title: 'International Partnerships', description: 'Collaborations with universities worldwide' }
  ];

  const milestones = [
    { year: '1999', event: 'College Established', description: 'Founded with a vision to provide quality education' },
    { year: '2005', event: 'First Graduation Batch', description: '100 students graduated with flying colors' },
    { year: '2010', event: 'Research Center Launch', description: 'Established state-of-the-art research facilities' },
    { year: '2015', event: 'International Recognition', description: 'Received global accreditation and partnerships' },
    { year: '2020', event: 'Digital Transformation', description: 'Implemented AI-powered learning systems' },
    { year: '2024', event: 'Smart Campus Initiative', description: 'Launched multilingual chatbot and digital services' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About TechEdu College</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              25 years of excellence in education, innovation, and student success
            </p>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-blue-50 border border-blue-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be a globally recognized institution that nurtures innovative minds, 
                fosters inclusive learning, and creates leaders who drive positive change 
                in society through technology and knowledge.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-green-50 border border-green-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide world-class education that combines academic excellence with 
                practical skills, ethical values, and cultural diversity, preparing 
                students for successful careers and meaningful contributions to society.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-purple-50 border border-purple-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Excellence in education, integrity in conduct, innovation in thinking, 
                inclusivity in approach, and commitment to sustainable development 
                and social responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* College History */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to becoming a leading educational institution
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <div className="text-blue-600 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.event}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Achievements & Rankings</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recognition and accolades that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">By the Numbers</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our impact in education and student development
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: 'Total Students', value: '5,000+' },
              { icon: BookOpen, label: 'Faculty Members', value: '200+' },
              { icon: Award, label: 'Courses Offered', value: '50+' },
              { icon: Globe, label: 'International Partners', value: '25+' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced leaders guiding our institution towards excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Rajesh Kumar',
                position: 'Principal',
                image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
                description: 'Ph.D. in Computer Science, 25+ years in academia'
              },
              {
                name: 'Prof. Priya Sharma',
                position: 'Vice Principal (Academics)',
                image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
                description: 'M.Tech in Electronics, Expert in curriculum development'
              },
              {
                name: 'Dr. Amit Patel',
                position: 'Dean of Research',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
                description: 'Ph.D. in Mechanical Engineering, Published researcher'
              }
            ].map((leader, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <img 
                  src={leader.image} 
                  alt={leader.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{leader.position}</p>
                  <p className="text-gray-600 text-sm">{leader.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;