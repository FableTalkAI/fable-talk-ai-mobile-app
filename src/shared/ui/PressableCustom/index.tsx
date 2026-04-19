import { GestureResponderEvent, Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { PressableCustomProps } from './types.ts';

const PressableCustom = ({
  children,
  onPressIn,
  onPressOut,
  style,
  containerStyle,
  disabled,
  withEnteringAnimation = true,
  withExitingAnimation = true,
  needsOffscreenAlphaCompositing = true,
  ...pressableProps
}: PressableCustomProps) => {
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handlePressIn = (event: GestureResponderEvent) => {
    if (disabled) return;
    opacity.value = withTiming(0.6, { duration: 100 });
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    if (disabled) return;
    opacity.value = withTiming(1, { duration: 300 });
    onPressOut?.(event);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={containerStyle}
      disabled={disabled}
      {...pressableProps}
    >
      <Animated.View
        entering={withEnteringAnimation ? FadeIn : undefined}
        exiting={withExitingAnimation ? FadeOut : undefined}
      >
        <Animated.View needsOffscreenAlphaCompositing={needsOffscreenAlphaCompositing} style={[animatedStyle, style]}>
          {children}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default PressableCustom;
