import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { Languages } from '@/features/locales/types.ts';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { TagColorModes, TagProps } from './types.ts';

const Tag = ({
  tag,
  forceActive = false,
  onToggle,
  onLongPress,
  isSelected,
  containerStyle,
  style,
  disabled,
}: TagProps) => {
  const { colors } = useTheme();
  const { i18n } = useTranslation();

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
      onPress={() => onToggle?.(tag)}
      onLongPress={() => onLongPress?.(tag)}
    >
      <TextCustom
        text={tag.locale[i18n.resolvedLanguage as Languages]}
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
