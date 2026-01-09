import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS } from '@/shared/model/sizes.ts';

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
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.skeletonPrimary, colors.skeletonSecondary],
    );

    return {
      backgroundColor,
    };
  });

  return <Animated.View style={[styles.container, animatedStyle, style]} />;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.small,
  },
});

export default Skeleton;
