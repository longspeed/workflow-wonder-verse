
import React, { useState } from 'react';
import { Search, Menu, X, User, Bell, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                AutomateAI
              </h1>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search AI automations, integrations, workflows..."
                className="pl-10 pr-4 w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Browse
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Sell
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Integrations
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
              <User className="h-5 w-5" />
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
              Sign Up
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search automations..."
              className="pl-10 pr-4 w-full bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-900">
                Browse
              </Button>
              <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-900">
                Sell
              </Button>
              <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-900">
                Integrations
              </Button>
              <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-900">
                Notifications
              </Button>
              <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-900">
                Cart
              </Button>
              <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-900">
                Profile
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white mt-2">
                Sign Up
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
