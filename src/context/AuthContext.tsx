import React, { createContext, useContext, useState } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  village: string;
  region: string;
  language: string;
  cropTypes: string[];
  farmSize?: string;
  currentXP: number;
  currentLevel: number;
  onboardingCompleted: boolean;
}

interface AuthContextType {
  isLoggedIn: boolean;
  profile: UserProfile | null;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading] = useState(false); // no async loading needed

  const signIn = () => {
    setIsLoggedIn(true);
  };

  const signOut = () => {
    setIsLoggedIn(false);
    setProfile(null);
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    const newProfile: UserProfile = {
      id: 'user_' + Date.now(),
      name: data.name || '',
      village: data.village || '',
      region: data.region || '',
      language: data.language || 'English',
      cropTypes: data.cropTypes || [],
      farmSize: data.farmSize,
      currentXP: 0,
      currentLevel: 1,
      onboardingCompleted: true,
    };
    setProfile(newProfile);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!profile) return;
    setProfile({ ...profile, ...updates });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, profile, loading, signIn, signOut, completeOnboarding, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
