import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';
import TextInputCustom from '@/shared/ui/TextInputCustom';
import { TextInputCustomProps } from '@/shared/ui/TextInputCustom/types.ts';

export type FieldInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  containerStyle?: object;
  onChangeHandler?: (text: string) => string;
} & TextInputCustomProps;

const FieldInput = <T extends FieldValues>({
  control,
  name,
  label,
  containerStyle,
  style,
  onChangeHandler,
  ...textInputProps
}: FieldInputProps<T>) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const computedStyles = StyleSheet.create({
    inputWrapper: {
      borderColor: colors.errorBase,
    },
    container: {
      gap: SPACING.xxs / 2,
    },
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={[computedStyles.container, containerStyle]}>
          {label && <TextCustom mode={TextModes.Base} text={label} />}

          <TextInputCustom
            borderRadius={label ? RADIUS.medium : RADIUS.large}
            wrapperStyle={[error ? computedStyles.inputWrapper : undefined, style]}
            onBlur={onBlur}
            onChangeText={text => {
              onChange(onChangeHandler ? onChangeHandler(text) : text);
            }}
            value={value}
            {...textInputProps}
          />

          {error?.message && (
            <TextCustom mode={TextModes.Caption} textColor={colors.errorBase} text={t(error.message)} />
          )}
        </View>
      )}
    />
  );
};

export default FieldInput;
