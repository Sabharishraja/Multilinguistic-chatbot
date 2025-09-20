import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  BookOpen, 
  Award, 
  Calendar, 
  Bell, 
  Sparkles,
  TrendingUp,
  Globe,
  Shield,
  Zap,
  Star
} from 'lucide-react';

const Homepage: React.FC = () => {
  const announcements = [
    "🎓 New semester admissions open - Apply before March 15th",
    "🚀 Annual Tech Fest 2024 registration now live",
    "📚 Library timings extended during exam period",
    "💼 Placement drive by TCS scheduled for next week"
  ];

  const quickLinks = [
    { 
      name: 'Admissions', 
      path: '/admissions', 
      icon: Users, 
      gradient: 'from-primary-500 to-primary-600',
      description: 'Start your journey with us'
    },
    { 
      name: 'Academics', 
      path: '/academics', 
      icon: BookOpen, 
      gradient: 'from-success-500 to-success-600',
      description: 'Explore our programs'
    },
    { 
      name: 'Placements', 
      path: '/placements', 
      icon: Award, 
      gradient: 'from-secondary-500 to-secondary-600',
      description: 'Career opportunities'
    },
    { 
      name: 'Contact', 
      path: '/contact', 
      icon: Globe, 
      gradient: 'from-accent-500 to-accent-600',
      description: 'Get in touch'
    }
  ];

  const stats = [
    { label: 'Students', value: '5,000+', icon: Users, color: 'text-primary-600' },
    { label: 'Faculty', value: '200+', icon: BookOpen, color: 'text-success-600' },
    { label: 'Courses', value: '50+', icon: Award, color: 'text-secondary-600' },
    { label: 'Years of Excellence', value: '25+', icon: Calendar, color: 'text-accent-600' }
  ];

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Learning',
      description: 'Experience personalized education with our advanced AI chatbot assistant',
      gradient: 'from-primary-500 to-secondary-500'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security measures',
      gradient: 'from-success-500 to-accent-500'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: '95% placement rate with top companies across various industries',
      gradient: 'from-warning-500 to-error-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-mesh">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />
              Welcome to the Future of Education
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 animate-slide-up">
              Empowering Minds,
              <br />
              <span className="text-gradient bg-gradient-to-r from-accent-300 to-primary-300 bg-clip-text text-transparent">
                Shaping Futures
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up">
              Experience world-class education with cutting-edge technology, personalized learning, 
              and a vibrant community of innovators and leaders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
              <Link
                to="/admissions"
                className="group btn-primary text-lg px-8 py-4 shadow-2xl hover:shadow-glow-lg"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="btn-outline border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 backdrop-blur-sm"
              >
                Discover More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce-subtle"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent-500/20 rounded-full blur-2xl animate-pulse-soft"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary-500/20 rounded-full blur-lg animate-bounce-subtle" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Announcements Ticker */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 border-b border-primary-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-3 mr-8 flex-shrink-0">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white text-lg">Latest Updates</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap text-white/90">
                {announcements.map((announcement, index) => (
                  <span key={index} className="mr-16 text-lg">
                    {announcement}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-padding bg-neutral-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
              Quick <span className="text-gradient">Access</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Navigate seamlessly through our comprehensive educational ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={index}
                  to={link.path}
                  className="group card-hover p-8 text-center hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${link.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-large`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                    {link.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
              Our <span className="text-gradient">Impact</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Numbers that reflect our commitment to educational excellence and student success
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-dark-700 dark:to-dark-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-medium">
                    <Icon className={`w-10 h-10 ${stat.color}`} />
                  </div>
                  <div className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-2 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-neutral-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
              Why Choose <span className="text-gradient">TechEdu</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Experience the future of education with our innovative approach and cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card-hover p-8 text-center group animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-large`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="section-padding bg-white dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
              Featured <span className="text-gradient">Programs</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Discover our most popular academic programs designed for tomorrow's leaders
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Computer Science Engineering',
                description: 'Cutting-edge curriculum covering AI, ML, and software development with hands-on projects',
                image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600',
                gradient: 'from-primary-500 to-secondary-500',
                badge: 'Most Popular'
              },
              {
                title: 'Business Administration',
                description: 'Comprehensive business education with industry partnerships and real-world case studies',
                image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
                gradient: 'from-success-500 to-accent-500',
                badge: 'High Demand'
              },
              {
                title: 'Mechanical Engineering',
                description: 'Hands-on learning with state-of-the-art laboratories and industry collaboration',
                image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600',
                gradient: 'from-warning-500 to-error-500',
                badge: 'Innovation Focus'
              }
            ].map((program, index) => (
              <div key={index} className="card-hover overflow-hidden group animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="relative">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${program.gradient} text-white text-sm font-medium rounded-full`}>
                    {program.badge}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                    {program.description}
                  </p>
                  <Link 
                    to="/academics"
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold group-hover:translate-x-1 transition-transform"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-mesh relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8">
            <Star className="w-4 h-4 mr-2" />
            Join 5,000+ Successful Students
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">
            Ready to Transform
            <br />
            <span className="text-gradient bg-gradient-to-r from-accent-300 to-primary-300 bg-clip-text text-transparent">
              Your Future?
            </span>
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students who have transformed their lives through quality education, 
            innovative learning, and endless opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/admissions"
              className="group btn-primary text-lg px-8 py-4 shadow-2xl hover:shadow-glow-lg"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/student-portal"
              className="btn-outline border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 backdrop-blur-sm"
            >
              Student Portal
            </Link>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-bounce-subtle"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent-500/20 rounded-full blur-2xl animate-pulse-soft"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-secondary-500/20 rounded-full blur-lg animate-bounce-subtle" style={{ animationDelay: '2s' }}></div>
      </section>
    </div>
  );
};

export default Homepage;