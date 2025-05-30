import React from 'react';
import { Github, Twitter, Linkedin, Mail, Globe, Heart } from 'lucide-react';

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
    <footer className="bg-white border-t border-border text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent tracking-tight">
                  AutomateAI
                </h2>
                <p className="text-gray-500 mt-4 leading-relaxed text-base">
                  The world's most trusted marketplace for AI automation solutions. Empowering businesses to scale intelligently and efficiently.
                </p>
              </div>
              {/* Social Links */}
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors smooth-motion">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors smooth-motion">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors smooth-motion">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors smooth-motion">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors smooth-motion">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href="#" 
                        className="text-gray-500 hover:text-primary transition-colors text-base smooth-motion"
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
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Stay Updated</h3>
              <p className="text-gray-500 text-base">
                Get the latest automation trends and platform updates
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-gray-100 border border-border rounded-l-xl focus:outline-none focus:border-primary text-gray-800 placeholder-gray-400 text-base smooth-motion"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-indigo-500 hover:from-blue-700 hover:to-indigo-700 rounded-r-xl font-semibold text-white text-base shadow-md transition-all duration-200 smooth-motion">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-base text-gray-400 gap-4">
            <div className="mb-4 md:mb-0">
              <p>© 2024 AutomateAI. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-primary transition-colors smooth-motion">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors smooth-motion">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors smooth-motion">Cookie Policy</a>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500" />
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
