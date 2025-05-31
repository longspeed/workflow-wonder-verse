
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AuthButton = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="w-20 h-10 bg-gray-200 animate-pulse rounded"></div>;
  }

  if (!user) {
    return (
      <Button 
        onClick={() => navigate('/auth')}
        className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900"
      >
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50">
          <User className="h-4 w-4" />
          {user.user_metadata?.full_name || user.email}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-yellow-200">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/sell')}>
          Sell Products
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;
