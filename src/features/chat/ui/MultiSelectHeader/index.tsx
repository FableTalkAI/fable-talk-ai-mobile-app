import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TrashBinIcon, XMarkIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme';
import { WINDOW_WIDTH } from '@/shared/model/device.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';

export type MultiSelectHeaderProps = {
  isVisible: boolean;
  style?: StyleProp<ViewStyle>;
  onCrossPress?: () => void;
  onBinPress?: () => void;
};

const MultiSelectHeader = ({ isVisible, style, onBinPress, onCrossPress }: MultiSelectHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      top: top + 4,
      backgroundColor: colors.backgroundBase,
      width: WINDOW_WIDTH - SPACING.xl * 2,
    },
  });

  if (!isVisible) return null;

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={[styles.container, computedStyles.container, style]}>
      <PressableCustom onPress={onCrossPress}>
        <XMarkIcon width={16} height={16} fill={colors.textPrimary} />
      </PressableCustom>

      <PressableCustom onPress={onBinPress}>
        <TrashBinIcon width={18} height={18} />
      </PressableCustom>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 48,
    borderRadius: RADIUS.large,
    paddingHorizontal: SPACING.m,
    left: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MultiSelectHeader;
