import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from '../common/Touchable';
import { Colors, Spacing, BorderRadius } from '../../constants/Theme';
import { useAppContext } from '../../context/AppContext';
import { Bell } from 'lucide-react-native';

export const Header: React.FC = () => {
  const { user } = useAppContext();

  if (!user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={{ uri: user.profileImageUrl }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.label}>EXPLORER</Text>
          <Text style={styles.title}>Hello, {user.name}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.notification}>
        <Bell size={24} color={Colors.text.primary} />
        <View style={styles.badge} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0E0E0',
  },
  textContainer: {
    marginLeft: Spacing.md,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text.secondary,
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  notification: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(218, 224, 233, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.status.error,
    borderWidth: 1.5,
    borderColor: Colors.white,
  }
});
