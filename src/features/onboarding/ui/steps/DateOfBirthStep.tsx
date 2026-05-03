import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { TriangleIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme';
import { formatDateSeparated } from '@/shared/lib/date.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import DatePicker from '@/shared/ui/DatePicker';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';

const DateOfBirthStep = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const { profile, updateUserProfileHandler } = useProfileStore();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const computedStyles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: colors.backgroundHover,
    },
    text: {
      color: profile && profile.dateOfBirth ? colors.textPrimary : colors.gray50,
    },
  });

  const dateOfBirth = useMemo(() => {
    if (!profile || !profile.dateOfBirth) {
      return [t('common.day'), t('common.month'), t('common.year')];
    }

    const formattedDate = formatDateSeparated(profile.dateOfBirth);
    return [formattedDate.day, formattedDate.month, formattedDate.year];
  }, [profile, t]);

  const handleConfirm = (date: Date) => {
    if (profile) {
      updateUserProfileHandler({ dateOfBirth: date.toISOString() }).catch(console.error);
    }
    setDatePickerVisibility(false);
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: 3 }).map((_, index) => (
        <PressableCustom
          onPress={() => setDatePickerVisibility(true)}
          key={index}
          style={styles.button}
          containerStyle={[styles.buttonContainer, computedStyles.buttonContainer]}
        >
          <TextCustom style={[styles.text, computedStyles.text]} numberOfLines={1} text={dateOfBirth[index]} />
          <TriangleIcon />
        </PressableCustom>
      ))}

      <DatePicker
        isVisible={isDatePickerVisible}
        handleConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        defaultDate={profile ? profile.dateOfBirth : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.m,
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: RADIUS.small,
    padding: SPACING.s,
    flex: 1,
  },
  text: {
    flex: 1,
    paddingRight: SPACING.xxs,
  },
});

export default DateOfBirthStep;
