export interface User {
  id: string;
  name: string;
  village: string;
  currentXP: number;
  currentLevel: number;
  levelName: string;
  totalTasksCompleted: number;
  profileImageUrl: string;
}

export interface Task {
  id: string;
  category: 'Water' | 'Soil' | 'Crop' | 'Pest';
  title: string;
  subtitle: string;
  xpReward: number;
  iconType: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface Submission {
  id: string;
  userId: string;
  taskId: string;
  imageUrl: string;
  timestamp: string;
  gpsLocation: {
    latitude: number;
    longitude: number;
  };
  status: 'pending' | 'verified';
}

export interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  avatar: string;
  rank: number;
}
