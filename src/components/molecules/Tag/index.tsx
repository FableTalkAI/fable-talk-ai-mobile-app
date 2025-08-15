import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { TagColorModes, TagProps } from './types.ts';

const Tag = ({ title, forceActive = false, onToggle, isSelected }: TagProps) => {
  const { colors } = useTheme();

  const currentMode = forceActive || isSelected ? TagColorModes.Active : TagColorModes.Inactive;

  const localColors = useMemo(
    () =>
      ({
        [TagColorModes.Inactive]: {
          borderColor: colors.grayDisabled,
          backgroundColor: colors.backgroundBase,
          text: colors.textSecondary,
        },
        [TagColorModes.Active]: {
          borderColor: colors.primary40,
          backgroundColor: colors.backgroundHover,
          text: colors.primary40,
        },
      }[currentMode]),
    [currentMode, colors],
  );

  const computedStyles = StyleSheet.create({
    tags: {
      borderColor: localColors.borderColor,
      backgroundColor: localColors.backgroundColor,
      borderRadius: RADIUS.medium,
      paddingVertical: SPACING.xxs,
      paddingHorizontal: SPACING.xs,
    },
    tagsText: {
      color: localColors.text,
    },
  });

  return (
    <PressableCustom
      style={[styles.tags, computedStyles.tags]}
      hitSlop={5}
      onPress={() => !forceActive && onToggle?.(title)}
    >
      <TextCustom text={title} mode={TextModes.Tag} style={computedStyles.tagsText} />
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  tags: {
    borderWidth: 2,
  },
});

export default Tag;
