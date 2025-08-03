import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { PressableEvent } from 'react-native-gesture-handler/lib/typescript/components/Pressable/PressableProps';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { PressableCustomProps } from './types.ts';

const PressableCustom = ({ children, onPressIn, onPressOut, style, ...pressableProps }: PressableCustomProps) => {
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handlePressIn = (event: PressableEvent) => {
    opacity.value = withTiming(0.6, { duration: 100 });
    onPressIn?.(event);
  };

  const handlePressOut = (event: PressableEvent) => {
    opacity.value = withTiming(1, { duration: 300 });
    onPressOut?.(event);
  };

  return (
    <Animated.View style={[animatedStyle, styles.wrapper]}>
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} style={style} {...pressableProps}>
        {children}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexShrink: 1,
  },
});

export default PressableCustom;
