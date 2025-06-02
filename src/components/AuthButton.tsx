import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, ShoppingBag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';

const AuthButton = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="w-20 h-10 bg-yellow-100 animate-pulse rounded-lg"></div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Button 
          onClick={() => navigate('/auth')}
          className="btn-primary"
        >
          Sign In
        </Button>
      </motion.div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-yellow-200 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-200"
        >
          <User className="h-4 w-4" />
          <span className="max-w-[150px] truncate">
            {user.user_metadata?.full_name || user.email}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-white border-yellow-200 shadow-soft"
      >
        <DropdownMenuLabel className="text-yellow-900">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-yellow-100" />
        <DropdownMenuItem 
          onClick={() => navigate('/dashboard')}
          className="text-yellow-700 hover:bg-yellow-50 cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate('/sell')}
          className="text-yellow-700 hover:bg-yellow-50 cursor-pointer"
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Sell Products
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate('/settings')}
          className="text-yellow-700 hover:bg-yellow-50 cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-yellow-100" />
        <DropdownMenuItem 
          onClick={signOut} 
          className="text-red-600 hover:bg-red-50 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;
