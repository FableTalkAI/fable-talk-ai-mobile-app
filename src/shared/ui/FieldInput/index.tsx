import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';
import TextInputCustom from '@/shared/ui/TextInputCustom';
import { TextInputCustomProps } from '@/shared/ui/TextInputCustom/types.ts';

export type FieldInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  containerStyle?: object;
} & TextInputCustomProps;

const FieldInput = <T extends FieldValues>({
  control,
  name,
  label,
  containerStyle,
  style,
  ...textInputProps
}: FieldInputProps<T>) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    inputWrapper: {
      borderColor: colors.errorBase,
    },
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={[styles.container, containerStyle]}>
          {label && <TextCustom mode={TextModes.Base} text={label} />}

          <TextInputCustom
            wrapperStyle={[error ? computedStyles.inputWrapper : undefined, style]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...textInputProps}
          />

          {error?.message && <TextCustom mode={TextModes.Caption} textColor={colors.errorBase} text={error.message} />}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xxs / 2,
  },
});

export default FieldInput;
