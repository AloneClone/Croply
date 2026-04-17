import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors, BorderRadius, Spacing } from '../../constants/Theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  color?: string;
  trackColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  height = 8, 
  color = Colors.primary,
  trackColor = '#E0E0E0' 
}) => {
  return (
    <View style={[styles.container, { height, backgroundColor: trackColor }]}>
      <View style={[styles.fill, { width: `${progress * 100}%`, backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
});
