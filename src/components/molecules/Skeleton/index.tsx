import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { RADIUS } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { SkeletonProps } from './types.tsx';

const Skeleton = ({ style }: SkeletonProps) => {
  const { colors } = useTheme();

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 800,
      }),
      -1,
      true,
    );
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], [colors.grayDisabled, colors.gray40]);

    return {
      backgroundColor,
    };
  });

  return <Animated.View style={[styles.container, animatedStyle, style]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 48,
    borderRadius: RADIUS.small,
  },
});

export default Skeleton;
