import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AuthButton from './AuthButton';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Header = () => {
  const location = useLocation();
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Browse', href: '/browse' },
    { name: 'Sell', href: '/sell' },
    { name: 'About', href: '/about' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/90 backdrop-blur-md border-b border-primary/20 shadow-soft sticky top-0 z-30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <Zap className="h-12 w-12 text-primary relative transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <span className="text-3xl font-extrabold text-gradient tracking-tight">AutomateAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "nav-link",
                  location.pathname === item.href && "nav-link-active"
                )}
              >
                {item.name}
                {location.pathname === item.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Auth Button */}
          <div className="hidden md:flex items-center space-x-4">
            <AuthButton />
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4">
                  <AuthButton />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
