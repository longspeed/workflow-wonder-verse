import React from 'react';
import { Card } from '@/components/ui/card';

const integrations = [
  { name: 'Slack', logo: '/integrations/slack.svg' },
  { name: 'Google Sheets', logo: '/integrations/sheets.svg' },
  { name: 'Stripe', logo: '/integrations/stripe.svg' },
  { name: 'Gmail', logo: '/integrations/gmail.svg' },
  { name: 'Notion', logo: '/integrations/notion.svg' },
  { name: 'Zapier', logo: '/integrations/zapier.svg' },
  { name: 'Airtable', logo: '/integrations/airtable.svg' },
  { name: 'HubSpot', logo: '/integrations/hubspot.svg' },
  { name: 'Shopify', logo: '/integrations/shopify.svg' },
  { name: 'Twilio', logo: '/integrations/twilio.svg' },
];

const IntegrationsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-yellow-50/30">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-900 to-yellow-700 bg-clip-text text-transparent mb-6 tracking-tight">
          Connect with Your Favorite Tools
        </h2>
        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          AutomateAI seamlessly integrates with the apps you use every day to streamline your workflows.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {integrations.map((integration) => (
            <Card 
              key={integration.name} 
              className="group rounded-2xl shadow-lg hover:shadow-xl border border-primary/20 hover:border-primary/40 bg-white/90 backdrop-blur transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center justify-center p-8">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <img 
                    src={integration.logo} 
                    alt={`${integration.name} logo`} 
                    className="h-14 w-14 object-contain relative" 
                  />
                </div>
                <span className="text-base font-semibold text-yellow-900 group-hover:text-primary transition-colors duration-300">
                  {integration.name}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection; 