import { useState, useEffect } from 'react';

// Simple mock user context - in a real app, this would come from authentication
export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<string>('John Doe'); // Default to John Doe for demo

  // In a real app, you would:
  // 1. Check for authenticated user
  // 2. Load user preferences from localStorage/API
  // 3. Handle login/logout

  const switchUser = (userName: string) => {
    setCurrentUser(userName);
    localStorage.setItem('currentUser', userName);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  return {
    currentUser,
    switchUser,
    isAuthenticated: true // Mock authentication
  };
}
