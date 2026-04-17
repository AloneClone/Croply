import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from '../../components/common/Touchable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/Theme';
import { useAppContext } from '../../context/AppContext';
import { Trophy, Medal, ChevronUp } from 'lucide-react-native';

export default function LeaderboardScreen() {
  const { leaderboard, user } = useAppContext();

  const getRankColor = (rank: number) => {
    switch(rank) {
      case 1: return '#FFD700'; // Gold
      case 2: return '#C0C0C0'; // Silver
      case 3: return '#CD7F32'; // Bronze
      default: return Colors.text.secondary;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Hall of Fame</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top 3 Podium Selection (Conceptual implementation) */}
        <View style={styles.podium}>
          {leaderboard.slice(0, 3).map((item) => (
            <View key={item.id} style={[styles.podiumItem, item.rank === 1 && styles.podiumFirst]}>
              <View style={[styles.podiumAvatarContainer, { borderColor: getRankColor(item.rank) }]}>
                <Image source={{ uri: item.avatar }} style={styles.podiumAvatar} />
                <View style={[styles.podiumRank, { backgroundColor: getRankColor(item.rank) }]}>
                  <Text style={styles.podiumRankText}>{item.rank}</Text>
                </View>
              </View>
              <Text style={styles.podiumName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.podiumXP}>{item.xp.toLocaleString()} XP</Text>
            </View>
          ))}
        </View>

        {/* Full List */}
        <View style={styles.listContainer}>
          {leaderboard.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <Text style={styles.rankNumber}>{item.rank}</Text>
              <Image source={{ uri: item.avatar }} style={styles.listAvatar} />
              <View style={styles.listInfo}>
                <Text style={styles.listName}>{item.name}</Text>
                <View style={styles.listStats}>
                  <ChevronUp size={14} color={Colors.primary} />
                  <Text style={styles.listTrend}>Up 2 places</Text>
                </View>
              </View>
              <Text style={styles.listXP}>{item.xp.toLocaleString()} XP</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sticky User Progress */}
      {user && (
        <View style={styles.userSticky}>
          <View style={styles.stickyContent}>
            <Text style={styles.stickyRank}>#{leaderboard.find(l => l.id === user.id)?.rank || leaderboard.length}</Text>
            <Image source={{ uri: user.profileImageUrl }} style={styles.stickyAvatar} />
            <View style={styles.stickyText}>
              <Text style={styles.stickyName}>You (Explorer)</Text>
              <Text style={styles.stickySubtext}>{user.currentXP > 0 ? 'Keep completing tasks to climb!' : 'Complete tasks to start ranking!'}</Text>
            </View>
            <Text style={styles.stickyXP}>{user.currentXP} XP</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  scrollContent: {
    paddingBottom: 160,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    paddingBottom: Spacing.md,
    ...Shadows.soft,
  },
  podiumItem: {
    alignItems: 'center',
    width: '30%',
  },
  podiumFirst: {
    transform: [{ scale: 1.15 }],
    marginBottom: Spacing.sm,
  },
  podiumAvatarContainer: {
    borderWidth: 3,
    borderRadius: 50,
    padding: 2,
    position: 'relative',
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
  },
  podiumRank: {
    position: 'absolute',
    bottom: -8,
    alignSelf: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  podiumRankText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.white,
  },
  podiumName: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  podiumXP: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.secondary,
    width: 30,
  },
  listAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: Spacing.md,
  },
  listInfo: {
    flex: 1,
  },
  listName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  listStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listTrend: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: '600',
    marginLeft: 2,
  },
  listXP: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  userSticky: {
    position: 'absolute',
    bottom: 90,
    left: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.accent.navy,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.glowGreen,
  },
  stickyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stickyRank: {
    color: Colors.accent.gold,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
  },
  stickyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    marginRight: 12,
  },
  stickyText: {
    flex: 1,
  },
  stickyName: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  stickySubtext: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
  },
  stickyXP: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
