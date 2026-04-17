import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../constants/Theme';

// Screens
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import HomeScreen from '../screens/tabs/HomeScreen';
import LeaderboardScreen from '../screens/tabs/LeaderboardScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import TasksScreen from '../screens/tabs/TasksScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import LanguageScreen from '../screens/settings/LanguageScreen';
import NotificationsScreen from '../screens/settings/NotificationsScreen';

// Icons (Using Lucide as it was in dependencies or fallback to View if needed)
import { Home, Trophy, User, CheckSquare } from 'lucide-react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Tasks" 
        component={TasksScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <CheckSquare color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Leaderboard" 
        component={LeaderboardScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isLoggedIn, profile, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : !profile?.onboardingCompleted ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Language" component={LanguageScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
