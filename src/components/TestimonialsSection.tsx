import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "AutomateAI has revolutionized our workflow. We save countless hours every week with their seamless integrations.",
    name: "Sarah Johnson",
    title: "Operations Manager",
    company: "Innovate Solutions",
    avatar: '/avatars/sarah.png', // Placeholder avatar
  },
  {
    quote: "The easiest automation platform we've ever used. The gold standard for connecting our sales and marketing tools.",
    name: "Michael Chen",
    title: "Head of Marketing",
    company: "Growth Labs",
    avatar: '/avatars/michael.png', // Placeholder avatar
  },
  {
    quote: "Exceptional support and a truly elegant user experience. AutomateAI is a game-changer for our e-commerce business.",
    name: "Emily Davis",
    title: "Founder",
    company: "ShopPulse",
    avatar: '/avatars/emily.png', // Placeholder avatar
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-yellow-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-900 to-yellow-700 bg-clip-text text-transparent mb-6 tracking-tight">
          What Our Customers Say
        </h2>
        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          Join thousands of businesses who trust AutomateAI to streamline their operations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card 
              key={idx} 
              className="group rounded-2xl shadow-xl hover:shadow-2xl border border-primary/20 hover:border-primary/40 bg-white/90 backdrop-blur transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <img 
                    src={testimonial.avatar} 
                    alt={`${testimonial.name} avatar`} 
                    className="w-20 h-20 rounded-full object-cover relative border-4 border-primary/20" 
                  />
                </div>
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-primary/20 absolute -top-4 -left-2" />
                  <p className="text-lg text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
                </div>
                <div className="text-yellow-900 font-semibold text-lg">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.title}, {testimonial.company}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 