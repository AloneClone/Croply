import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle, Animated } from 'react-native';

interface TouchableProps extends PressableProps {
  style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
  activeOpacity?: number;
  children: React.ReactNode;
}

export const TouchableOpacity = React.forwardRef<View, TouchableProps>(
  ({ style, activeOpacity = 0.7, children, ...props }, ref) => {
    return (
      <Pressable
        ref={ref as any}
        {...props}
        onClick={props.onPress as any} // Direct DOM event for RNW + React 19 fallback
        onPointerUp={props.onPress} // Modern web pointer event fallback
        style={(state) => [
          typeof style === 'function' ? style(state) : style,
          { opacity: state.pressed ? activeOpacity : 1 },
        ]}
      >
        {children}
      </Pressable>
    );
  }
);
