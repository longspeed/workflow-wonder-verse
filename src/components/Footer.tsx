import React from 'react';
import { Github, Twitter, Linkedin, Mail, Globe, Heart, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
    <footer className="bg-gradient-to-b from-white to-yellow-50/30 dark:from-gray-900 dark:to-gray-800 border-t border-primary/20 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16">
            {/* Brand Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="mb-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-yellow-300 dark:from-yellow-400 dark:to-yellow-500 rounded-full blur-sm opacity-50"></div>
                    <Zap className="h-10 w-10 text-primary relative" />
                  </div>
                  <h2 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-900 to-yellow-700 dark:from-yellow-300 dark:to-yellow-500 bg-clip-text text-transparent tracking-tight">
                    AutomateAI
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed text-base">
                  The world's most trusted marketplace for AI automation solutions. Empowering businesses to scale intelligently and efficiently.
                </p>
              </div>
              {/* Social Links */}
              <div className="flex space-x-6 mt-4">
                {[
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Mail, href: '#', label: 'Email' },
                  { icon: Globe, href: '#', label: 'Website' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-300 smooth-motion"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-6 text-yellow-900 dark:text-yellow-100">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <a 
                        href="#" 
                        className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary/80 transition-colors duration-300 text-base smooth-motion flex items-center group"
                      >
                        {link}
                        <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-primary/20 py-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-3 text-yellow-900 dark:text-yellow-100">Stay Updated</h3>
              <p className="text-gray-600 dark:text-gray-400 text-base">
                Get the latest automation trends and platform updates
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-primary/20 focus:border-primary dark:border-gray-700 dark:focus:border-primary/50"
              />
              <Button className="bg-gradient-to-r from-primary to-yellow-600 hover:from-primary/90 hover:to-yellow-700 text-yellow-900 dark:text-yellow-100 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>
        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-primary/20 py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between text-base text-gray-500 dark:text-gray-400 gap-6">
            <div className="mb-4 md:mb-0">
              <p>© 2024 AutomateAI. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-8">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="hover:text-primary dark:hover:text-primary/80 transition-colors duration-300 smooth-motion"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Made with</span>
                <Heart className="w-5 h-5 text-primary animate-pulse" />
                <span>for automation</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
