import { forwardRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import useTheme from '@/shared/hooks/useTheme';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import ResizeIcon from '@/shared/ui/ResizeIcon';
import TextCustom from '@/shared/ui/TextCustom';

import { TextInputCustomProps } from './types.ts';

const TextInputCustom = forwardRef<TextInput, TextInputCustomProps>(
  (
    {
      leftIcon,
      wrapperStyle,
      style,
      withCharCount,
      borderRadius = RADIUS.large,
      withShadow = true,
      height = 24,
      ...textInputProps
    },
    ref,
  ) => {
    const { colors } = useTheme();

    const computedStyles = StyleSheet.create({
      wrapper: {
        backgroundColor: colors.backgroundSecondary,
        borderRadius,
        boxShadow: withShadow ? BOX_SHADOW.base : 'none',
        paddingBottom: withCharCount ? SPACING.xl : undefined,
      },
      textInput: {
        color: colors.textPrimary,
        height,
      },
    });

    const resizeIconOption = {
      width: 24,
      maxHeight: 24,
    };

    return (
      <View style={[computedStyles.wrapper, styles.wrapper, wrapperStyle]}>
        <ResizeIcon icon={leftIcon} containerStyle={styles.iconContainer} cloneElementProps={resizeIconOption} />

        <TextInput
          ref={ref}
          placeholderTextColor={colors.gray50}
          style={[computedStyles.textInput, styles.textInput, style]}
          textAlignVertical="top"
          {...textInputProps}
        />

        {withCharCount && textInputProps.maxLength && (
          <TextCustom
            text={`${(textInputProps.value ?? '').length}/${textInputProps.maxLength}`}
            style={styles.charCount}
          />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    gap: SPACING.xs,
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  charCount: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingRight: 12,
    paddingBottom: 12,
  },
});

export default TextInputCustom;
