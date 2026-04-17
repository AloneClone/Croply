import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from '../common/Touchable';
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/Theme';
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';
import { Droplets, Camera, Leaf, Bug, CheckCircle } from 'lucide-react-native';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    subtitle: string;
    xpReward: number;
    status: 'pending' | 'in_progress' | 'completed';
    iconType: string;
    category: string;
  };
  onPress: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress }) => {
  const isCompleted = task.status === 'completed';
  const isResume = task.status === 'in_progress';

  const getIcon = () => {
    if (isCompleted) return <CheckCircle size={24} color={Colors.primary} />;
    switch (task.iconType) {
      case 'droplet': return <Droplets size={24} color="#0066FF" />;
      case 'camera': return <Camera size={24} color="#E67E22" />;
      case 'leaf': return <Leaf size={24} color={Colors.primary} />;
      case 'bug': return <Bug size={24} color={Colors.status.error} />;
      default: return <Leaf size={24} color={Colors.primary} />;
    }
  };

  const getIconBg = () => {
    if (isCompleted) return Colors.accent.lightGreen;
    switch (task.category) {
      case 'Water': return Colors.accent.lightBlue;
      case 'Crop': return Colors.accent.lightOrange;
      case 'Pest': return '#FDECEA';
      default: return Colors.accent.lightGreen;
    }
  };

  const getBorderColor = () => {
    if (isCompleted) return Colors.primary;
    switch (task.category) {
      case 'Water': return Colors.secondary;
      case 'Crop': return '#E67E22';
      case 'Pest': return Colors.status.error;
      default: return Colors.primary;
    }
  };

  const renderButton = () => {
    if (isCompleted) {
      return (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>+{task.xpReward} XP</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={[styles.button, isResume && styles.buttonOutline]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, isResume && styles.buttonTextResume]}>
          {isResume ? 'Resume' : 'Start'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Card style={[styles.container, { borderLeftColor: getBorderColor() }, isCompleted && styles.completedContainer]}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: getIconBg() }]}>
          {getIcon()}
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.title, isCompleted && styles.completedTitle]}>{task.title}</Text>
          <Text style={styles.subtitle}>{task.subtitle}</Text>
          {isResume && (
            <View style={styles.progressRow}>
              <ProgressBar progress={0.6} height={4} color="#E67E22" />
            </View>
          )}
        </View>

        {renderButton()}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    borderLeftWidth: 4,
    paddingVertical: Spacing.md,
  },
  completedContainer: {
    opacity: 0.75,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: Spacing.md,
    marginRight: Spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: Colors.text.secondary,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontWeight: '500',
    marginTop: 2,
  },
  progressRow: {
    marginTop: 8,
    width: '60%',
  },
  button: {
    backgroundColor: Colors.accent.navy,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#E67E22',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonTextResume: {
    color: '#E67E22',
  },
  completedBadge: {
    backgroundColor: Colors.accent.lightGreen,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  completedText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
});
