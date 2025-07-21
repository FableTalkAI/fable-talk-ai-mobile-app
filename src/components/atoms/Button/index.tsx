import { ButtonModes, ButtonModesObject, ButtonProps } from '@/components/atoms/Button/types.ts';
import { Pressable } from 'react-native-gesture-handler';
import Text from '../TextCustom';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';
import PressableCustom from '@/components/atoms/PressableCustom';

const Button = ({
  title,
  mode = 'primary',
  radius = 'medium',
  isLoading,
  isDisable,
  style,
  onPress,
  ...pressableProps
}: ButtonProps) => {
  const { colors, setColorOpacity } = useTheme();

  const localeMode: ButtonModes = isDisable || isLoading ? 'disabled' : mode;

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
      backgroundColor: setColorOpacity(colors.backgroundBase, 0.22),
      color: colors.textLight,
    },
    light: {
      backgroundColor: colors.primary30,
      color: colors.textLight,
    },
  };

  const computedStyles = StyleSheet.create({
    container: {
      borderRadius: RADIUS[radius],
      backgroundColor: buttonModes[localeMode].backgroundColor,
      padding: SPACING.s,
    },
    text: {
      color: buttonModes[localeMode].color,
    },
  });

  return (
    <PressableCustom
      onPress={onPress}
      disabled={isDisable || isLoading}
      style={[computedStyles.container, styles.container, style]}
      {...pressableProps}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.textSecondary} />
      ) : (
        <Text text={title} mode="subtitle" style={computedStyles.text} />
      )}
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;
