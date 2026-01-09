import { forwardRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import ResizeIcon from '@/shared/ui/ResizeIcon';
import TextCustom from '@/shared/ui/TextCustom';

import { TextInputCustomProps } from './types.ts';

const TextInputCustom = forwardRef<TextInput, TextInputCustomProps>(
  ({ leftIcon, wrapperStyle, style, withCharCount, ...textInputProps }, ref) => {
    const { colors } = useTheme();

    const computedStyles = StyleSheet.create({
      wrapper: {
        backgroundColor: colors.backgroundSecondary,
      },
      textInput: {
        color: colors.textPrimary,
        minHeight: withCharCount ? 180 : 24,
        paddingBottom: withCharCount ? SPACING.lg : undefined,
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
    borderRadius: RADIUS.large,
    paddingHorizontal: SPACING.m,
    gap: SPACING.xs,
    paddingVertical: SPACING.s,
    boxShadow: BOX_SHADOW.base,
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
