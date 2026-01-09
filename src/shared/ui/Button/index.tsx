import { StyleSheet } from 'react-native';

import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import ComponentLoader from '@/shared/ui/ComponentLoader';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

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

      <ComponentLoader isVisible={isLoading} />
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
});

export default Button;
