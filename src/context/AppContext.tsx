import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Task, LeaderboardUser } from '../types';
import { useAuth, UserProfile } from './AuthContext';

interface Announcement {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'warning' | 'reward';
  read: boolean;
}

interface AppContextType {
  user: User | null;
  tasks: Task[];
  leaderboard: LeaderboardUser[];
  announcements: Announcement[];
  dailyProgress: { completed: number; total: number; bonusEarned: boolean };
  rewardSummary: { totalEarned: number; streak: number; nextReward: string };
  updateXP: (amount: number) => void;
  completeTask: (taskId: string) => void;
  markAnnouncementRead: (id: string) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function getLevelName(level: number): string {
  const names: Record<number, string> = {
    1: 'Beginner Farmer', 2: 'Smart Farmer', 3: 'Expert Farmer',
    4: 'Master Cultivator', 5: 'Legend of the Land',
  };
  return names[level] || (level > 5 ? 'Legend of the Land' : 'Beginner Farmer');
}

function getNextReward(level: number): string {
  const rewards: Record<number, string> = {
    1: 'Soil Kit', 2: 'Premium Seeds', 3: 'Drip Guide', 4: 'Organic Fertilizer',
  };
  return rewards[level] || 'Golden Badge';
}

function buildTasksFromCrops(cropTypes: string[]): Task[] {
  const taskMap: Record<string, { title: string; subtitle: string; iconType: string; category: string }> = {
    wheat: { title: 'Wheat Rust Check', subtitle: 'Scan wheat stalks for rust signs', iconType: 'camera', category: 'Crop' },
    rice: { title: 'Paddy Water Level', subtitle: 'Ensure water level is 5cm deep', iconType: 'droplet', category: 'Water' },
    tomato: { title: 'Tomato Pruning', subtitle: 'Remove excessive suckers', iconType: 'leaf', category: 'Crop' },
    'sugar cane': { title: 'Cane Irrigation', subtitle: 'Verify furrow irrigation flow', iconType: 'droplet', category: 'Water' },
    cotton: { title: 'Bollworm Inspection', subtitle: 'Check cotton bolls for pests', iconType: 'bug', category: 'Pest' },
    maize: { title: 'Maize Growth Monitor', subtitle: 'Measure stalk height and photo', iconType: 'camera', category: 'Crop' },
  };

  const tasks: Task[] = cropTypes.map((crop, i) => {
    const data = taskMap[crop.toLowerCase()] || {
      title: `${crop} Health Check`, subtitle: `Upload a photo of your ${crop}`, iconType: 'camera', category: 'Crop',
    };
    return { id: `crop_${i}`, xpReward: 50, status: 'pending' as const, ...data } as Task;
  });

  tasks.push(
    { id: 'daily_soil', category: 'Soil', title: 'Soil Moisture Reading', subtitle: 'Log current soil conditions', xpReward: 30, iconType: 'droplet', status: 'pending' },
    { id: 'daily_photo', category: 'Crop', title: 'Farm Photo Update', subtitle: 'Capture your field progress', xpReward: 40, iconType: 'camera', status: 'pending' },
  );

  return tasks;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, updateProfile } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Derive user from profile
  const user: User | null = profile ? {
    id: profile.id,
    name: profile.name,
    village: profile.village,
    currentXP: profile.currentXP,
    currentLevel: profile.currentLevel,
    levelName: getLevelName(profile.currentLevel),
    totalTasksCompleted: Math.floor(profile.currentXP / 50),
    profileImageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(profile.name)}`,
  } : null;

  // Build tasks from crops
  useEffect(() => {
    if (profile?.cropTypes?.length) {
      setTasks(buildTasksFromCrops(profile.cropTypes));
    }
  }, [profile?.cropTypes?.join(',')]);

  // Build announcements
  useEffect(() => {
    if (profile) {
      setAnnouncements([
        { id: 'a1', title: '🌾 Rabi Season Alert', body: `Best time to prepare ${profile.cropTypes?.[0] || 'your crop'} fields in ${profile.village}.`, type: 'info', read: false },
        { id: 'a2', title: '🏆 Welcome Reward!', body: 'Complete your first task to earn 50 XP.', type: 'reward', read: false },
      ]);
    }
  }, [profile?.name]);

  // Leaderboard
  const leaderboard: LeaderboardUser[] = profile ? [
    { id: 'l1', name: 'Vanshika B.', xp: 2450, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vanshika', rank: 1 },
    { id: 'l2', name: 'Anil K.', xp: 2100, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anil', rank: 2 },
    { id: 'l3', name: 'Sita R.', xp: 1950, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sita', rank: 3 },
    { id: 'l4', name: 'Raj M.', xp: 1800, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Raj', rank: 4 },
    { id: 'l5', name: 'Priya D.', xp: 1600, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', rank: 5 },
    { id: profile.id, name: profile.name, xp: profile.currentXP, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(profile.name)}`, rank: 6 },
  ].sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 })) : [];

  // Daily progress
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const dailyProgress = { completed: completedCount, total: tasks.length, bonusEarned: completedCount >= 2 };

  // Rewards
  const rewardSummary = {
    totalEarned: profile?.currentXP || 0,
    streak: Math.min(Math.floor((profile?.currentXP || 0) / 100), 7),
    nextReward: getNextReward(profile?.currentLevel || 1),
  };

  const updateXP = useCallback((amount: number) => {
    if (!profile) return;
    const newXP = profile.currentXP + amount;
    const newLevel = Math.floor(newXP / 200) + 1;
    updateProfile({ currentXP: newXP, currentLevel: newLevel });
  }, [profile, updateProfile]);

  const completeTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' as const } : t));
  }, []);

  const markAnnouncementRead = useCallback((id: string) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  }, []);

  return (
    <AppContext.Provider value={{ user, tasks, leaderboard, announcements, dailyProgress, rewardSummary, updateXP, completeTask, markAnnouncementRead, isLoading: false }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
