import { cloneElement, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ArrowForwardIcon, ToggleFalseIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { OptionBarColorModes, OptionBarModes, OptionBarProps } from '@/components/molecules/OptionBar/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

const OptionBar = ({
  title,
  subtitle = '',
  mode = OptionBarModes.Simple,
  colorMode = OptionBarColorModes.Default,
  leftIcon,
  rightComponent,
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
      borderRadius: RADIUS.small,
    },
    icon: {},
    textContainer: {
      paddingLeft: SPACING.xs,
    },
    title: {
      color: localColors.title,
    },
    subtitle: {
      color: localColors.subtitle,
    },
  });

  const resizeLeftIcon = useMemo(
    () =>
      leftIcon ? (
        <View style={[styles.iconContainer, computedStyles.iconContainer]}>
          {cloneElement(leftIcon, { width: 18, fill: localColors.icon })}
        </View>
      ) : null,
    [leftIcon],
  );

  if (mode === OptionBarModes.Simple) {
    return (
      <View style={styles.simpleContainer}>
        <TextCustom text={title} />

        <PressableCustom>
          <ArrowForwardIcon />
        </PressableCustom>
      </View>
    );
  }

  if (mode === OptionBarModes.Complex) {
    return (
      <PressableCustom style={styles.complexContainer}>
        {resizeLeftIcon}

        <View style={[computedStyles.textContainer, styles.textContainer]}>
          <TextCustom text={title} mode="secondary" style={computedStyles.title} />
          <TextCustom text={subtitle} mode="extra-small" style={computedStyles.subtitle} />
        </View>

        {rightComponent ?? <ArrowForwardIcon fill={localColors.icon} />}
      </PressableCustom>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  simpleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  complexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
});

export default OptionBar;
