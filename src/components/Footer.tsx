import React from 'react';
import { Github, Twitter, Linkedin, Mail, Globe, Heart, Zap } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Marketplace',
      links: [
        'Browse Automations',
        'Categories',
        'Featured Solutions',
        'New Releases',
        'Enterprise Solutions'
      ]
    },
    {
      title: 'For Sellers',
      links: [
        'Start Selling',
        'Seller Resources',
        'API Documentation',
        'Revenue Calculator',
        'Success Stories'
      ]
    },
    {
      title: 'Platform',
      links: [
        'Integration Hub',
        'Security & Compliance',
        'API Status',
        'System Requirements',
        'Roadmap'
      ]
    },
    {
      title: 'Support',
      links: [
        'Help Center',
        'Documentation',
        'Community Forum',
        'Contact Support',
        'Training Resources'
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-yellow-50/30 border-t border-primary/20 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full blur-sm opacity-50"></div>
                    <Zap className="h-10 w-10 text-primary relative" />
                  </div>
                  <h2 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-900 to-yellow-700 bg-clip-text text-transparent tracking-tight">
                    AutomateAI
                  </h2>
                </div>
                <p className="text-gray-600 mt-4 leading-relaxed text-base">
                  The world's most trusted marketplace for AI automation solutions. Empowering businesses to scale intelligently and efficiently.
                </p>
              </div>
              {/* Social Links */}
              <div className="flex space-x-6 mt-4">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300 smooth-motion">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300 smooth-motion">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300 smooth-motion">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300 smooth-motion">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300 smooth-motion">
                  <Globe className="w-6 h-6" />
                </a>
              </div>
            </div>
            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-6 text-yellow-900">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href="#" 
                        className="text-gray-600 hover:text-primary transition-colors duration-300 text-base smooth-motion"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Newsletter Section */}
        <div className="border-t border-primary/20 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-3 text-yellow-900">Stay Updated</h3>
              <p className="text-gray-600 text-base">
                Get the latest automation trends and platform updates
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-6 py-4 bg-white/50 backdrop-blur-sm border border-primary/20 rounded-l-xl focus:outline-none focus:border-primary text-gray-800 placeholder-gray-400 text-base smooth-motion"
              />
              <button className="px-10 py-4 bg-gradient-to-r from-primary to-yellow-600 hover:from-primary/90 hover:to-yellow-700 rounded-r-xl font-semibold text-yellow-900 text-base shadow-lg hover:shadow-xl transition-all duration-300 smooth-motion">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="border-t border-primary/20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-base text-gray-500 gap-6">
            <div className="mb-4 md:mb-0">
              <p>© 2024 AutomateAI. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#" className="hover:text-primary transition-colors duration-300 smooth-motion">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors duration-300 smooth-motion">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors duration-300 smooth-motion">Cookie Policy</a>
              <div className="flex items-center space-x-2">
                <span>Made with</span>
                <Heart className="w-5 h-5 text-primary" />
                <span>for automation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
