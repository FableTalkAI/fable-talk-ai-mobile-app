import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ArrowForwardIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import ResizeIcon from '@/components/atoms/ResizeIcon';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { OptionBarColorModes, OptionBarModes, OptionBarProps } from './types.ts';

const OptionBar = ({
  title,
  subtitle,
  mode = OptionBarModes.Simple,
  colorMode = OptionBarColorModes.Default,
  leftIcon,
  rightComponent,
  onPress,
}: OptionBarProps) => {
  const { colors } = useTheme();

  const localColors = useMemo(
    () =>
      ({
        [OptionBarColorModes.Default]: {
          title: colors.textPrimary,
          subtitle: colors.textSecondary,
          icon: colors.primary80,
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
      <PressableCustom onPress={onPress} style={styles.complexContainer}>
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
  complexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingLeft: SPACING.xs,
  },
});

export default OptionBar;
