import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from '../common/Touchable';
import { Colors, Spacing, BorderRadius } from '../../constants/Theme';
import { useAppContext } from '../../context/AppContext';
import { Gift, ChevronRight, Check } from 'lucide-react-native';

export const BonusBanner: React.FC = () => {
  const { dailyProgress } = useAppContext();

  const bonusText = dailyProgress.bonusEarned
    ? 'Bonus earned! +50 XP claimed 🎉'
    : `Complete ${2 - dailyProgress.completed} more task${2 - dailyProgress.completed === 1 ? '' : 's'} to earn +50 bonus XP`;

  return (
    <TouchableOpacity style={[styles.container, dailyProgress.bonusEarned && styles.containerEarned]} activeOpacity={0.9}>
      <View style={styles.left}>
        <View style={[styles.iconCircle, dailyProgress.bonusEarned && styles.iconCircleEarned]}>
          {dailyProgress.bonusEarned
            ? <Check size={22} color={Colors.white} />
            : <Gift size={22} color={Colors.white} fill={Colors.white} />}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{dailyProgress.bonusEarned ? 'Bonus Claimed!' : 'Daily Bonus'}</Text>
          <Text style={styles.subtitle}>{bonusText}</Text>
        </View>
      </View>
      {!dailyProgress.bonusEarned && <ChevronRight size={24} color={Colors.white} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerEarned: {
    backgroundColor: Colors.primary,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleEarned: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  textContainer: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});
