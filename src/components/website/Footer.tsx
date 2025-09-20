import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  ExternalLink,
  Heart,
  Sparkles
} from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Placements', path: '/placements' },
    { name: 'Research', path: '/research' },
    { name: 'Campus Life', path: '/campus-life' }
  ];

  const studentServices = [
    { name: 'Student Portal', path: '/student-portal' },
    { name: 'Library', path: '/library' },
    { name: 'Hostel', path: '/hostel' },
    { name: 'Circulars', path: '/circulars' },
    { name: 'Fee Payment', path: '/fee-payment' },
    { name: 'Grievance', path: '/grievance' }
  ];

  const importantLinks = [
    { name: 'NAAC', url: 'https://naac.gov.in', external: true },
    { name: 'AICTE', url: 'https://aicte-india.org', external: true },
    { name: 'UGC', url: 'https://ugc.ac.in', external: true },
    { name: 'NIRF Ranking', url: 'https://nirfindia.org', external: true },
    { name: 'Digital India', url: 'https://digitalindia.gov.in', external: true },
    { name: 'Swachh Bharat', url: 'https://swachhbharatmission.gov.in', external: true }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/techeducollege', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/techeducollege', color: 'hover:text-sky-500' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/techeducollege', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/school/techeducollege', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/techeducollege', color: 'hover:text-red-500' }
  ];

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-dark-900 to-neutral-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 to-secondary-900/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"></div>
      
      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* College Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-4 mb-8 group">
              <div className="p-3 bg-gradient-primary rounded-2xl shadow-large group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold group-hover:text-primary-400 transition-colors">
                  TechEdu College
                </h3>
                <p className="text-sm text-neutral-400 font-medium">Excellence in Education</p>
              </div>
            </Link>
            
            <p className="text-neutral-300 mb-8 leading-relaxed">
              Empowering minds and shaping futures through innovative education, 
              cutting-edge research, and inclusive learning environments since 1999.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary-600/20 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0" />
                </div>
                <div className="text-sm text-neutral-300">
                  <p className="font-medium">123 Education Street</p>
                  <p>Tech City, State 560001</p>
                  <p>India</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-success-600/20 rounded-lg">
                  <Phone className="w-5 h-5 text-success-400 flex-shrink-0" />
                </div>
                <div className="text-sm text-neutral-300">
                  <p>+91 80 1234 5678</p>
                  <p>+91 80 8765 4321</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-accent-600/20 rounded-lg">
                  <Mail className="w-5 h-5 text-accent-400 flex-shrink-0" />
                </div>
                <div className="text-sm text-neutral-300">
                  <p>info@techeducollege.edu.in</p>
                  <p>admissions@techeducollege.edu.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-8 text-gradient">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Services */}
          <div>
            <h4 className="text-xl font-semibold mb-8 text-gradient">Student Services</h4>
            <ul className="space-y-4">
              {studentServices.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.path}
                    className="text-neutral-300 hover:text-secondary-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-xl font-semibold mb-8 text-gradient">Important Links</h4>
            <ul className="space-y-4">
              {importantLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-accent-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transform transition-transform">
                      {link.name}
                    </span>
                    <ExternalLink className="w-3 h-3 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Social Media & Bottom Bar */}
      <div className="relative border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-neutral-400 font-medium">Follow us:</span>
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-neutral-400 ${social.color} transition-all duration-200 hover:scale-110 hover:-translate-y-1`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Admin Link */}
            <div className="flex items-center space-x-6 text-sm">
              <Link
                to="/admin"
                className="text-neutral-400 hover:text-primary-400 transition-colors font-medium"
              >
                Admin Dashboard
              </Link>
              <span className="text-neutral-600">|</span>
              <button className="text-neutral-400 hover:text-secondary-400 transition-colors font-medium">
                Privacy Policy
              </button>
              <span className="text-neutral-600">|</span>
              <button className="text-neutral-400 hover:text-accent-400 transition-colors font-medium">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative bg-neutral-950 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left space-y-4 md:space-y-0">
            <p className="text-neutral-400 flex items-center justify-center md:justify-start">
              © 2024 TechEdu College. All rights reserved.
            </p>
            <p className="text-neutral-400 flex items-center justify-center md:justify-end">
              <span>Designed with</span>
              <Heart className="w-4 h-4 mx-2 text-red-500 animate-pulse-soft" />
              <span>for Smart Education Initiative</span>
              <Sparkles className="w-4 h-4 ml-2 text-primary-400" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;