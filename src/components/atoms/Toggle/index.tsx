import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import Animated, { LinearTransition, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { RADIUS } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { ToggleProps } from './types.ts';

const Toggle = ({ isActive, setIsActive }: ToggleProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      borderColor: colors.iconPrimary,
      alignItems: isActive ? 'flex-end' : 'flex-start',
    },
  });

  const animatedStyles = {
    container: useAnimatedStyle(() => ({
      backgroundColor: withTiming(isActive ? colors.iconPrimary : colors.backgroundBase),
    })),
    dot: useAnimatedStyle(() => ({
      backgroundColor: withTiming(isActive ? colors.backgroundBase : colors.iconPrimary),
    })),
  };

  return (
    <Pressable disabled={setIsActive === undefined} hitSlop={5} onPress={() => setIsActive?.(prev => !prev)}>
      <Animated.View style={[styles.container, computedStyles.container, animatedStyles.container]}>
        <Animated.View layout={LinearTransition} style={[styles.dot, animatedStyles.dot]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    width: 36,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 3,
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: RADIUS.circle,
  },
});

export default Toggle;
