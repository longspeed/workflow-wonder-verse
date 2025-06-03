
import React from 'react';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-yellow-200 rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-yellow-900">Welcome to AutomateAI</h1>
          <p className="text-yellow-700">
            Join the leading marketplace for AI automation tools
          </p>
        </div>
        <div className="text-center text-muted-foreground">
          Authentication form will be implemented here
        </div>
      </div>
    </div>
  );
}
