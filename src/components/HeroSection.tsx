import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const integrations = [
  { name: 'Slack', logo: '/integrations/slack.svg' },
  { name: 'Google Sheets', logo: '/integrations/sheets.svg' },
  { name: 'Stripe', logo: '/integrations/stripe.svg' },
  { name: 'Gmail', logo: '/integrations/gmail.svg' },
  { name: 'Notion', logo: '/integrations/notion.svg' },
];

const HeroSection = () => {
  return (
    <section className="relative bg-[#FFFDF6] pt-20 pb-12 sm:pb-20 border-b border-yellow-100">
      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-yellow-900 leading-tight tracking-tight mb-4">
          Automate Your Business Workflows<br />
          <span className="block text-yellow-700 font-semibold">Connect Your Favorite Apps—No Code Needed</span>
        </h1>
        <p className="text-lg text-yellow-800 mb-4 max-w-xl">
          Build custom automations that save you hours every week. Integrate tools like Slack, Google Sheets, Stripe, and more. Perfect for agencies, SaaS, and e-commerce teams.
        </p>
        <div className="flex items-center justify-center space-x-2 text-base font-medium text-yellow-700 mb-6">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
          <span>Trusted by 1,200+ businesses</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-6">
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-200">
            Try for Free
          </Button>
          <Button size="lg" variant="outline" className="bg-white border border-yellow-300 text-yellow-900 px-8 py-4 text-lg font-semibold rounded-full shadow-sm hover:bg-yellow-100 transition-all duration-200">
            See Live Demo
          </Button>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-yellow-700 text-sm">Works with:</span>
          {integrations.map((integration) => (
            <img key={integration.name} src={integration.logo} alt={integration.name} className="h-7 w-7 object-contain" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
