import { forwardRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import ResizeIcon from '@/components/atoms/ResizeIcon';
import TextCustom from '@/components/atoms/TextCustom';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { BOX_SHADOW } from '@/core/constants/styles.ts';
import useTheme from '@/hooks/useTheme.ts';

import { TextInputCustomProps } from './types.ts';

const TextInputCustom = forwardRef<TextInput, TextInputCustomProps>(
  ({ leftIcon, wrapperStyle, style, withCharCount, ...textInputProps }, ref) => {
    const { colors } = useTheme();

    const computedStyles = StyleSheet.create({
      wrapper: {
        borderRadius: RADIUS.large,
        paddingHorizontal: SPACING.m,
        backgroundColor: colors.backgroundAlt,
        gap: SPACING.xs,
        paddingVertical: SPACING.s,
        boxShadow: BOX_SHADOW.base,
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
