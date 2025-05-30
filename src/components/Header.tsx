import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot, Menu } from 'lucide-react';
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
    <header className="bg-white/80 backdrop-blur border-b border-border shadow-none sticky top-0 z-30 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <Bot className="h-10 w-10 text-primary transition-transform duration-200 group-hover:scale-110" />
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">AutomateAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-gray-700 hover:text-primary transition-colors duration-200 px-2 py-1 font-medium smooth-motion${location.pathname === item.href ? ' text-primary' : ''}`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-primary rounded-full transition-all duration-200" />
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
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-6 mt-12">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-gray-700 hover:text-primary transition-colors text-lg font-medium py-2 px-2 rounded-lg smooth-motion${location.pathname === item.href ? ' text-primary bg-primary/10' : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-6 border-t border-border">
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
