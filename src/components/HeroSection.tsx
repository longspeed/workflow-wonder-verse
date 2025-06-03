import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const integrations = [
  { name: 'Slack', logo: '/integrations/slack.svg' },
  { name: 'Google Sheets', logo: '/integrations/sheets.svg' },
  { name: 'Stripe', logo: '/integrations/stripe.svg' },
  { name: 'Gmail', logo: '/integrations/gmail.svg' },
  { name: 'Notion', logo: '/integrations/notion.svg' },
];

const HeroSection = () => {
  return (
    <section className="relative bg-[#FFFDF6] dark:bg-gray-900 pt-20 pb-12 sm:pb-20 border-b border-yellow-100 dark:border-gray-800 overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-200 via-transparent to-transparent animate-pulse"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-yellow-900 dark:text-yellow-100 leading-tight tracking-tight mb-4">
            Automate Your Business Workflows<br />
            <span className="block text-yellow-700 dark:text-yellow-300 font-semibold">Connect Your Favorite Apps—No Code Needed</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-yellow-800 dark:text-yellow-200 mb-4 max-w-xl"
        >
          Build custom automations that save you hours every week. Integrate tools like Slack, Google Sheets, Stripe, and more. Perfect for agencies, SaaS, and e-commerce teams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center space-x-2 text-base font-medium text-yellow-700 dark:text-yellow-300 mb-6"
        >
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
          <span>Trusted by 1,200+ businesses</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-6"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-200 group"
          >
            Try for Free
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white dark:bg-gray-800 border border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100 px-8 py-4 text-lg font-semibold rounded-full shadow-sm hover:bg-yellow-100 dark:hover:bg-gray-700 transition-all duration-200 group"
          >
            <Play className="mr-2 h-5 w-5" />
            See Live Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col items-center gap-4 mt-2"
        >
          <span className="text-yellow-700 dark:text-yellow-300 text-sm">Works with:</span>
          <div className="flex items-center gap-4">
            {integrations.map((integration, index) => (
              <motion.img
                key={integration.name}
                src={integration.logo}
                alt={integration.name}
                className="h-7 w-7 object-contain"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Social proof section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 w-full max-w-2xl"
        >
          {['4.9/5 Rating', '10k+ Users', '24/7 Support', '99.9% Uptime'].map((stat, index) => (
            <div key={stat} className="text-center">
              <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{stat}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
