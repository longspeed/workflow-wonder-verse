import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "AutomateAI has revolutionized our workflow. We save countless hours every week with their seamless integrations.",
    name: "Sarah Johnson",
    title: "Operations Manager",
    company: "Innovate Solutions",
    avatar: '/avatars/sarah.png',
    rating: 5,
    color: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30',
  },
  {
    quote: "The easiest automation platform we've ever used. The gold standard for connecting our sales and marketing tools.",
    name: "Michael Chen",
    title: "Head of Marketing",
    company: "Growth Labs",
    avatar: '/avatars/michael.png',
    rating: 5,
    color: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    quote: "Exceptional support and a truly elegant user experience. AutomateAI is a game-changer for our e-commerce business.",
    name: "Emily Davis",
    title: "Founder",
    company: "ShopPulse",
    avatar: '/avatars/emily.png',
    rating: 5,
    color: 'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-yellow-50/30 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-900 to-yellow-700 dark:from-yellow-300 dark:to-yellow-500 bg-clip-text text-transparent mb-6 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
            Join thousands of businesses who trust AutomateAI to streamline their operations.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card 
                className="group rounded-2xl shadow-xl hover:shadow-2xl border border-primary/20 hover:border-primary/40 bg-white/90 dark:bg-gray-800/90 backdrop-blur transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                    <img 
                      src={testimonial.avatar} 
                      alt={`${testimonial.name} avatar`} 
                      className="w-20 h-20 rounded-full object-cover relative border-4 border-primary/20 dark:border-primary/40" 
                    />
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 text-primary/20 dark:text-primary/40 absolute -top-4 -left-2" />
                    <p className="text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed">"{testimonial.quote}"</p>
                  </div>
                  <div className="text-yellow-900 dark:text-yellow-100 font-semibold text-lg">{testimonial.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}, {testimonial.company}</div>
                  <div className="mt-4 text-sm text-primary dark:text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read full case study →
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Trusted by</span>
            <div className="flex items-center gap-4">
              {['Company 1', 'Company 2', 'Company 3', 'Company 4'].map((company, idx) => (
                <span key={idx} className="font-medium text-gray-900 dark:text-gray-100">{company}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 