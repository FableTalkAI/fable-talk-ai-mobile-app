import { PressableCustomProps } from '@/components/atoms/PressableCustom/types.ts';
import { Pressable } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PressableEvent } from 'react-native-gesture-handler/lib/typescript/components/Pressable/PressableProps';

const PressableCustom = ({
  children,
  onPress,
  onPressIn,
  onPressOut,
  style,
  ...pressableProps
}: PressableCustomProps) => {
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handlePressIn = (event: PressableEvent) => {
    opacity.value = withTiming(0.6, { duration: 200 });
    onPressIn?.(event);
  };

  const handlePressOut = (event: PressableEvent) => {
    opacity.value = withTiming(1, { duration: 200 });
    onPressOut?.(event);
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={style}
        {...pressableProps}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default PressableCustom;
