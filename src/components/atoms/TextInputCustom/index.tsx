import { forwardRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import ResizeIcon from '@/components/atoms/ResizeIcon';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import { ShadowCustomModes } from '@/components/atoms/ShadowCustom/types.ts';
import TextCustom from '@/components/atoms/TextCustom';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { TextInputCustomProps } from './types.ts';

const TextInputCustom = forwardRef<TextInput, TextInputCustomProps>(
  ({ leftIcon, shadowStyle, wrapperStyle, style, withCharCount, ...textInputProps }, ref) => {
    const { colors } = useTheme();

    const computedStyles = StyleSheet.create({
      shadow: {
        borderRadius: RADIUS.large,
        paddingHorizontal: SPACING.m,
        backgroundColor: colors.backgroundAlt,
        gap: SPACING.xs,
        paddingVertical: SPACING.s,
      },
      textInput: {
        color: colors.textPrimary,
        minHeight: withCharCount ? 200 : 24,
      },
    });

    const resizeIconOption = {
      width: 24,
      maxHeight: 24,
    };

    return (
      <ShadowCustom
        mode={ShadowCustomModes.Base}
        style={[computedStyles.shadow, styles.shadow, shadowStyle]}
        containerStyle={wrapperStyle}
      >
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
      </ShadowCustom>
    );
  },
);

const styles = StyleSheet.create({
  shadow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 16,
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
