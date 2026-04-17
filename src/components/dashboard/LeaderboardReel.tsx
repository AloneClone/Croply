import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/Theme';
import { useAppContext } from '../../context/AppContext';

export const LeaderboardReel: React.FC = () => {
  const { leaderboard } = useAppContext();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Top Cultivators Reel</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {leaderboard.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>{item.rank}</Text>
              </View>
            </View>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.xp}>{item.xp.toLocaleString()} XP</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginRight: Spacing.md,
    alignItems: 'center',
    width: 120,
    ...Shadows.soft,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F0F0F0',
  },
  rankBadge: {
    position: 'absolute',
    top: -4,
    left: -4,
    backgroundColor: Colors.accent.gold,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  rankText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.primary,
    textAlign: 'center',
  },
  xp: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 2,
  }
});
