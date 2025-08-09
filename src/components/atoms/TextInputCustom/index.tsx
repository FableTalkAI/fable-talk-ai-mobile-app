import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TextInput, View } from 'react-native';

import { ArrowForwardIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import ResizeIcon from '@/components/atoms/ResizeIcon';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { TextInputCustomProps } from './types.ts';

const TextInputCustom = ({
  placeholder,
  placeholderTextColor,
  shadowMode,
  leftIcon,
  withBackArrow,
  containerStyle,
  style,
  value,
  onChangeText,
  numberOfLines = 1,
}: TextInputCustomProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const computedStyles = StyleSheet.create({
    wrapper: {
      gap: SPACING.m,
    },
    container: {
      borderRadius: RADIUS.large,
      paddingHorizontal: SPACING.m,
      backgroundColor: colors.backgroundAlt,
      gap: SPACING.xs,
      paddingVertical: SPACING.s,
    },
    textInput: {
      color: colors.textPrimary,
    },
  });

  const resizeIconOption = {
    width: 24,
  };

  return (
    <View style={[styles.wrapper, computedStyles.wrapper]}>
      {withBackArrow && (
        <PressableCustom onPress={navigation.goBack} style={styles.backIcon}>
          <ArrowForwardIcon />
        </PressableCustom>
      )}

      <ShadowCustom
        mode={shadowMode}
        style={[computedStyles.container, styles.container, containerStyle]}
        containerStyle={styles.shadowContainer}
      >
        <ResizeIcon icon={leftIcon} containerStyle={styles.iconContainer} cloneElementProps={resizeIconOption} />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor ?? 'black'}
          style={[computedStyles.textInput, styles.textInput, style]}
          numberOfLines={numberOfLines}
        />
      </ShadowCustom>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadowContainer: {
    flex: 1,
  },
  backIcon: {
    transform: [{ rotate: '180deg' }],
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 16,
    minHeight: 24,
  },
});

export default TextInputCustom;
