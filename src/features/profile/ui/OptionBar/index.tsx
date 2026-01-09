import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ArrowForwardIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import ResizeIcon from '@/shared/ui/ResizeIcon';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { OptionBarColorModes, OptionBarModes, OptionBarProps } from './types.ts';

const OptionBar = ({
  title,
  subtitle,
  mode = OptionBarModes.Simple,
  colorMode = OptionBarColorModes.Default,
  leftIcon,
  rightComponent,
  onPress,
  disabled,
}: OptionBarProps) => {
  const { colors } = useTheme();

  const localColors = useMemo(
    () =>
      ({
        [OptionBarColorModes.Default]: {
          title: colors.textPrimary,
          subtitle: colors.textSecondary,
          icon: colors.iconPrimary,
          iconBackground: colors.backgroundHover,
        },
        [OptionBarColorModes.Red]: {
          title: colors.errorDark,
          subtitle: colors.errorBase,
          icon: colors.errorDark,
          iconBackground: colors.errorLight,
        },
      }[colorMode]),
    [colorMode, colors],
  );

  const computedStyles = StyleSheet.create({
    iconContainer: {
      backgroundColor: localColors.iconBackground,
    },
    title: {
      color: localColors.title,
    },
    subtitle: {
      color: localColors.subtitle,
    },
  });

  const resizeIconOption = {
    width: 18,
    fill: localColors.icon,
  };

  if (mode === OptionBarModes.Simple) {
    return (
      <PressableCustom onPress={onPress} style={styles.simpleContainer}>
        <TextCustom text={title} />
        <ArrowForwardIcon width={8} fill={colors.iconPrimary} />
      </PressableCustom>
    );
  }

  if (mode === OptionBarModes.Complex) {
    return (
      <PressableCustom disabled={disabled} onPress={onPress} style={styles.pressable}>
        <ResizeIcon
          icon={leftIcon}
          containerStyle={[styles.iconContainer, computedStyles.iconContainer]}
          cloneElementProps={resizeIconOption}
        />

        <View style={styles.textContainer}>
          <TextCustom text={title} mode={TextModes.Secondary} style={computedStyles.title} />
          {subtitle && <TextCustom text={subtitle} mode={TextModes.ExtraSmall} style={computedStyles.subtitle} />}
        </View>

        {rightComponent ?? <ArrowForwardIcon fill={localColors.icon} width={8} />}
      </PressableCustom>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: RADIUS.small,
  },
  simpleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingLeft: SPACING.xs,
  },
});

export default OptionBar;
