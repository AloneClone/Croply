import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../../constants/Theme';
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';
import { useAppContext } from '../../context/AppContext';
import { Star, Trophy, Zap } from 'lucide-react-native';

export const ProgressCard: React.FC = () => {
  const { user } = useAppContext();

  if (!user) return null;

  const xpPerLevel = 200;
  const xpInCurrentLevel = user.currentXP % xpPerLevel;
  const xpNeeded = xpPerLevel - xpInCurrentLevel;
  const progress = xpInCurrentLevel / xpPerLevel;
  const nextLevel = user.currentLevel + 1;

  return (
    <Card variant="glow" style={styles.container}>
      {/* Top Section */}
      <View style={styles.topRow}>
        <View style={styles.rankBadge}>
          <Star size={14} color={Colors.white} fill={Colors.white} />
          <Text style={styles.rankText}>CURRENT RANK</Text>
        </View>
        <View style={styles.medalContainer}>
          <Trophy size={24} color={Colors.accent.gold} />
        </View>
      </View>

      <Text style={styles.levelTitle}>{user.levelName}</Text>

      {/* Progress Section */}
      <View style={styles.progressHeader}>
        <View>
          <Text style={styles.xpLabel}>XP Progress</Text>
          <View style={styles.xpValueContainer}>
            <Text style={styles.xpCurrent}>{xpInCurrentLevel}</Text>
            <Text style={styles.xpTotal}> / {xpPerLevel} XP</Text>
          </View>
        </View>
        <Text style={styles.nextLevelLabel}>NEXT: LEVEL {nextLevel}</Text>
      </View>

      <ProgressBar progress={progress} height={10} color={Colors.primary} />

      <View style={styles.bottomSection}>
        <Zap size={16} color={Colors.primary} fill={Colors.primary} />
        <Text style={styles.hintText}>{xpNeeded} XP until Level {nextLevel} unlock</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    padding: Spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  rankText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  medalContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF9C4',
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  xpLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontWeight: '600',
  },
  xpValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  xpCurrent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  xpTotal: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  nextLevelLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontWeight: 'bold',
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  hintText: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginLeft: 8,
    fontWeight: '500',
  }
});
