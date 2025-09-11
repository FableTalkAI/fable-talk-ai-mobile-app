import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { TagColorModes, TagProps } from './types.ts';

const Tag = ({ title, forceActive = false, onToggle, isSelected, containerStyle }: TagProps) => {
  const { colors } = useTheme();

  const currentMode = forceActive || isSelected ? TagColorModes.Active : TagColorModes.Inactive;

  const localColors = useMemo(
    () =>
      ({
        [TagColorModes.Inactive]: {
          borderColor: colors.grayDisabled,
          backgroundColor: colors.backgroundAlt,
          text: colors.textSecondary,
        },
        [TagColorModes.Active]: {
          borderColor: colors.primary40,
          backgroundColor: colors.backgroundHover,
          text: colors.iconPrimary,
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
      containerStyle={containerStyle}
      hitSlop={5}
      onPress={() => onToggle?.(title)}
    >
      <TextCustom
        text={title}
        mode={TextModes.Tag}
        style={[computedStyles.tagsText, styles.tagsText]}
        numberOfLines={1}
      />
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  tags: {
    borderWidth: 2,
  },
  tagsText: {
    textAlign: 'center',
  },
});

export default Tag;
