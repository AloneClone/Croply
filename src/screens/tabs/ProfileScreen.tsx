import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { TouchableOpacity } from '../../components/common/Touchable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/Theme';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Settings, MapPin, Award, CheckCircle, ChevronRight, LogOut } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user } = useAppContext();
  const { profile, signOut } = useAuth();
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    signOut();
  };

  const handleAction = (action: string) => {
    if (action === 'Settings') navigation.navigate('Settings');
    if (action === 'Notifications') navigation.navigate('Notifications');
    if (action === 'Language') navigation.navigate('Language');
  };

  if (!user) return null;

  const stats = [
    { label: 'Tasks', value: user.totalTasksCompleted, icon: <CheckCircle size={20} color={Colors.primary} /> },
    { label: 'Total XP', value: user.currentXP, icon: <Award size={20} color={Colors.accent.gold} /> },
    { label: 'Level', value: user.currentLevel, icon: <Award size={20} color={Colors.secondary} /> },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Farm Profile</Text>
        <TouchableOpacity onPress={() => handleAction('Settings')}>
          <Settings size={22} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: user.profileImageUrl }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={Colors.text.secondary} />
            <Text style={styles.location}>{user.village}</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>{user.levelName}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              {stat.icon}
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Achievement Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badgeItem}>
                <View style={[styles.badgeCircle, { backgroundColor: Colors.accent.lightGreen }]}>
                    <CheckCircle size={24} color={Colors.primary} />
                </View>
                <Text style={styles.badgeText}>Early Bird</Text>
            </View>
            <View style={styles.badgeItem}>
                <View style={[styles.badgeCircle, { backgroundColor: Colors.accent.lightBlue }]}>
                    <Award size={24} color={Colors.secondary} />
                </View>
                <Text style={styles.badgeText}>Soil Master</Text>
            </View>
            <View style={styles.badgeItem}>
                <View style={[styles.badgeCircle, { backgroundColor: '#F0F0F0' }]}>
                    <Award size={24} color="#999" />
                </View>
                <Text style={[styles.badgeText, { color: '#999' }]}>Locked</Text>
            </View>
          </View>
        </View>

        {/* Settings List */}
        <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleAction('Notifications')}>
                <View style={styles.menuLeft}>
                    <Text style={styles.menuText}>Notification Settings</Text>
                </View>
                <ChevronRight size={20} color={Colors.text.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleAction('Language')}>
                <View style={styles.menuLeft}>
                    <Text style={styles.menuText}>Language ({profile?.language || 'English'})</Text>
                </View>
                <ChevronRight size={20} color={Colors.text.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={handleLogout}>
                <View style={styles.menuLeft}>
                    <LogOut size={20} color={Colors.status.error} />
                    <Text style={[styles.menuText, { color: Colors.status.error, marginLeft: 12 }]}>Logout</Text>
                </View>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.white,
    ...Shadows.soft,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginTop: Spacing.md,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
  levelBadge: {
    backgroundColor: Colors.accent.lightGreen,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    marginTop: 12,
  },
  levelBadgeText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    justifyContent: 'space-around',
    ...Shadows.soft,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  section: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badgeItem: {
    alignItems: 'center',
    width: '30%',
  },
  badgeCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
  },
  badgeText: {
      fontSize: 12,
      fontWeight: '600',
      color: Colors.text.primary,
  },
  menu: {
      marginTop: Spacing.xl,
      backgroundColor: Colors.white,
      marginHorizontal: Spacing.md,
      borderRadius: BorderRadius.lg,
      padding: Spacing.sm,
      ...Shadows.soft,
  },
  menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: '#F2F4F7',
  },
  menuLeft: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  menuText: {
      fontSize: 15,
      fontWeight: '600',
      color: Colors.text.primary,
  }
});
