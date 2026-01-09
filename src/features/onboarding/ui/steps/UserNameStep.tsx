import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { UserIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import ComponentLoader from '@/shared/ui/ComponentLoader';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';
import TextInputCustom from '@/shared/ui/TextInputCustom';

import { nameSchema } from '../../model/schemas.ts';
import { NameSchema } from '../../model/types.ts';

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
