
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, Search, Bell, Moon, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

const Header = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Browse', href: '/browse' },
    { name: 'Sell', href: '/sell' },
    { name: 'About', href: '/about' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to browse page with search query
      window.location.href = `/browse?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-yellow-200 dark:border-gray-700 shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-yellow-300 dark:from-yellow-400 dark:to-yellow-500 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <Zap className="h-8 w-8 text-yellow-600 dark:text-yellow-400 relative transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 dark:from-yellow-300 dark:to-yellow-500 bg-clip-text text-transparent">
              AutomateAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors hover:text-yellow-600 dark:hover:text-yellow-400",
                  location.pathname === item.href 
                    ? "text-yellow-600 dark:text-yellow-400" 
                    : "text-gray-700 dark:text-gray-300"
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

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search automations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[200px] bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </form>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
            <Button 
              onClick={handleAuth}
              variant={isAuthenticated ? "outline" : "default"}
              size="sm"
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>{isAuthenticated ? 'Dashboard' : 'Sign In'}</span>
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search automations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </form>
                
                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-yellow-600 dark:hover:text-yellow-400",
                        location.pathname === item.href
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-gray-700 dark:text-gray-300"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                
                <div className="flex items-center space-x-4 pt-4 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                  <Button onClick={handleAuth} variant={isAuthenticated ? "outline" : "default"} size="sm">
                    {isAuthenticated ? 'Dashboard' : 'Sign In'}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
