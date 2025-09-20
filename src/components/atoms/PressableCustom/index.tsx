import { GestureResponderEvent, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { PressableCustomProps } from './types.ts';

const PressableCustom = ({
  children,
  onPressIn,
  onPressOut,
  style,
  containerStyle,
  ...pressableProps
}: PressableCustomProps) => {
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handlePressIn = (event: GestureResponderEvent) => {
    opacity.value = withTiming(0.6, { duration: 100 });
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    opacity.value = withTiming(1, { duration: 300 });
    onPressOut?.(event);
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} style={containerStyle} {...pressableProps}>
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </Pressable>
  );
};

export default PressableCustom;
