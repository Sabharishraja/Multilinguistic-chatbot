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
  ExternalLink
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
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/techeducollege' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/techeducollege' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/techeducollege' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/school/techeducollege' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/techeducollege' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* College Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-600 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">TechEdu College</h3>
                <p className="text-sm text-gray-400">Excellence in Education</p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Empowering minds and shaping futures through innovative education, 
              cutting-edge research, and inclusive learning environments since 1999.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>123 Education Street</p>
                  <p>Tech City, State 560001</p>
                  <p>India</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>+91 80 1234 5678</p>
                  <p>+91 80 8765 4321</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>info@techeducollege.edu.in</p>
                  <p>admissions@techeducollege.edu.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Student Services</h4>
            <ul className="space-y-3">
              {studentServices.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Important Links</h4>
            <ul className="space-y-3">
              {importantLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Social Media & Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Admin Link */}
            <div className="flex items-center space-x-4">
              <Link
                to="/admin"
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Admin Dashboard
              </Link>
              <span className="text-gray-600">|</span>
              <button className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </button>
              <span className="text-gray-600">|</span>
              <button className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left">
            <p className="text-sm text-gray-400">
              © 2024 TechEdu College. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mt-2 md:mt-0">
              Designed with ❤️ for Smart Education Initiative
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;