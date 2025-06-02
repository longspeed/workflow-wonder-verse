
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AuthButton from './AuthButton';

const Header = () => {
  const location = useLocation();
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Browse', href: '/browse' },
    { name: 'Sell', href: '/sell' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-primary/20 shadow-lg sticky top-0 z-30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <Zap className="h-12 w-12 text-primary relative transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <span className="text-3xl font-extrabold bg-gradient-to-r from-yellow-900 to-yellow-700 bg-clip-text text-transparent tracking-tight">AutomateAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-gray-700 hover:text-primary transition-colors duration-300 px-3 py-2 font-medium smooth-motion${location.pathname === item.href ? ' text-primary' : ''}`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-primary to-yellow-600 rounded-full transition-all duration-300" />
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
              <Button variant="outline" size="icon" className="md:hidden border-primary/20 hover:border-primary/40">
                <Menu className="h-5 w-5 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white/95 backdrop-blur-md border-l border-primary/20">
              <div className="flex flex-col space-y-8 mt-16">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-gray-700 hover:text-primary transition-colors text-lg font-medium py-3 px-4 rounded-xl smooth-motion${location.pathname === item.href ? ' text-primary bg-primary/10' : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-8 border-t border-primary/20">
                  <AuthButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
