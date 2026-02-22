import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { TagColorModes, TagProps } from './types.ts';

const Tag = ({ title, forceActive = false, onToggle, isSelected, containerStyle, style, disabled }: TagProps) => {
  const { colors } = useTheme();

  const currentMode = forceActive || isSelected ? TagColorModes.Active : TagColorModes.Inactive;

  const localColors = useMemo(
    () =>
      ({
        [TagColorModes.Inactive]: {
          borderColor: colors.borderPrimary,
          backgroundColor: colors.backgroundBase,
          text: colors.textPrimary,
        },
        [TagColorModes.Active]: {
          borderColor: colors.primary60,
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
    },
    tagsText: {
      color: localColors.text,
    },
  });

  return (
    <PressableCustom
      disabled={disabled}
      style={[styles.tags, computedStyles.tags, style]}
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
    borderRadius: RADIUS.medium,
    paddingVertical: SPACING.xxs,
    paddingHorizontal: SPACING.xs,
  },
  tagsText: {
    textAlign: 'center',
  },
});

export default Tag;
