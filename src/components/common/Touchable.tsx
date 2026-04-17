import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle, Animated, Platform } from 'react-native';

interface TouchableProps extends PressableProps {
  style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
  activeOpacity?: number;
  children: React.ReactNode;
}

export const TouchableOpacity = React.forwardRef<View, TouchableProps>(
  ({ style, activeOpacity = 0.7, children, ...props }, ref) => {
    const webProps = Platform.OS === 'web' ? {
      onClick: props.onPress as any,
      onPointerUp: props.onPress,
    } : {};

    return (
      <Pressable
        ref={ref as any}
        {...props}
        {...webProps}
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
