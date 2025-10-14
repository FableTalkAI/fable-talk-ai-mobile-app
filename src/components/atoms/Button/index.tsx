import { ActivityIndicator, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { ButtonModes, ButtonModesObject, ButtonProps, ButtonRadius } from './types.ts';

const Button = ({
  title,
  mode = ButtonModes.Primary,
  radius = ButtonRadius.Medium,
  isLoading,
  isDisable,
  style,
  containerStyle,
  ...pressableProps
}: ButtonProps) => {
  const { colors, setColorOpacity } = useTheme();

  const localeMode: ButtonModes = isDisable ? ButtonModes.Disabled : mode;

  const buttonModes: Record<ButtonModes, ButtonModesObject> = {
    primary: {
      backgroundColor: colors.primary80,
      color: colors.textLight,
    },
    disabled: {
      backgroundColor: colors.grayDisabled,
      color: colors.textSecondary,
    },
    transparent: {
      backgroundColor: setColorOpacity(colors.accentLight, 0.22),
      color: colors.textLight,
    },
    light: {
      backgroundColor: colors.primary30,
      color: colors.textLight,
    },
    success: {
      backgroundColor: colors.successBase,
      color: colors.textLight,
    },
    reject: {
      backgroundColor: colors.errorDark,
      color: colors.textLight,
    },
    link: {
      backgroundColor: colors.link,
      color: colors.textLight,
    },
  };

  const computedStyles = StyleSheet.create({
    container: {
      borderRadius: RADIUS[radius],
      backgroundColor: buttonModes[localeMode].backgroundColor,
    },
    text: {
      color: buttonModes[localeMode].color,
    },
    loadingContainer: {
      backgroundColor: setColorOpacity(colors.grayDisabled, 0.7),
    },
  });

  return (
    <PressableCustom
      key={localeMode}
      disabled={isDisable || isLoading}
      containerStyle={containerStyle}
      style={[computedStyles.container, styles.container, style]}
      {...pressableProps}
    >
      <TextCustom text={title} mode={TextModes.Subtitle} style={computedStyles.text} />

      {isLoading && (
        <Animated.View
          style={[computedStyles.loadingContainer, styles.loadingContainer]}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <ActivityIndicator color={colors.textSecondary} />
        </Animated.View>
      )}
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.s,
    overflow: 'hidden',
  },
  loadingContainer: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;
