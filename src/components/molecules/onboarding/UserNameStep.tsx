import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { UserIcon } from '@/assets/icons/index.ts';
import TextCustom from '@/components/atoms/TextCustom/index.tsx';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import TextInputCustom from '@/components/atoms/TextInputCustom/index.tsx';
import ComponentLoader from '@/components/molecules/ComponentLoader/index.tsx';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useProfileStore from '@/hooks/useProfileStore.ts';
import useTheme from '@/hooks/useTheme.ts';

import { nameSchema } from './schemas.ts';
import { NameSchema } from './types.ts';

const UserNameStep = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { profile, updateUserProfileHandler, isLoading } = useProfileStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NameSchema>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: profile ? profile.name : '' },
  });

  const computedStyles = StyleSheet.create({
    errorText: {
      color: colors.errorDark,
    },
  });

  return (
    <Controller
      control={control}
      name="name"
      render={({ field: { onChange, value } }) => (
        <View style={styles.inputContainer}>
          <TextInputCustom
            value={value}
            maxLength={20}
            onChangeText={onChange}
            onBlur={handleSubmit(data => updateUserProfileHandler(data))}
            placeholder={t('common.name')}
            leftIcon={<UserIcon />}
          />
          <ComponentLoader isVisible={isLoading.updateProfile} />
          {errors.name && (
            <TextCustom style={computedStyles.errorText} text={errors.name.message || ''} mode={TextModes.Caption} />
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    gap: SPACING.xxs,
    overflow: 'hidden',
    borderRadius: RADIUS.medium,
  },
});

export default UserNameStep;
