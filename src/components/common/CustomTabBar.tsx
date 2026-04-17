import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from './Touchable';
import { Colors } from '../../constants/Theme';
import { Home, ClipboardList, Globe, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const router = useRouter();

  const getIcon = (routeName: string, color: string) => {
    switch (routeName) {
      case 'index': return <Home size={24} color={color} />;
      case 'tasks': return <ClipboardList size={24} color={color} />;
      case 'leaderboard': return <Globe size={24} color={color} />;
      case 'profile': return <User size={24} color={color} />;
      default: return <Home size={24} color={color} />;
    }
  };

  const getLabel = (routeName: string) => {
    switch (routeName) {
      case 'index': return 'Home';
      case 'tasks': return 'Tasks';
      case 'leaderboard': return 'Global';
      case 'profile': return 'Profile';
      default: return routeName;
    }
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const handlePress = () => {
          if (!isFocused) {
            router.navigate(`/(tabs)/${route.name === 'index' ? '' : route.name}` as any);
          }
        };

        const color = isFocused ? Colors.primary : Colors.text.secondary;

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.7}
            onPress={handlePress}
            style={styles.tabItem}
          >
            {getIcon(route.name, color)}
            <Text style={[styles.tabLabel, { color }]}>
              {getLabel(route.name)}
            </Text>
          </TouchableOpacity>
        );
      })}
      {/* Add a generic layout spacer map so we match the margin required for FAB */}
      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    paddingTop: 10,
    paddingBottom: 15,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
  },
});
