import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { TriangleIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import DatePicker from '@/components/molecules/DatePicker';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { formatDateSeparated } from '@/core/utils/date.ts';
import useTheme from '@/hooks/useTheme.ts';
import useUserStore from '@/hooks/useUserStore.ts';

const DateOfBirthStep = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const { profile, setProfileHandler } = useUserStore();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const computedStyles = StyleSheet.create({
    container: {
      gap: SPACING.m,
    },
    buttonContainer: {
      borderRadius: RADIUS.small,
      padding: SPACING.s,
      backgroundColor: colors.backgroundHover,
    },
    text: {
      paddingRight: SPACING.xxs,
      color: profile.dateOfBirth ? colors.textPrimary : colors.gray50,
    },
  });

  const dateOfBirth = useMemo(() => {
    if (!profile.dateOfBirth) {
      return [t('common.day'), t('common.month'), t('common.year')];
    }

    const formattedDate = formatDateSeparated(profile.dateOfBirth);
    return [formattedDate.day, formattedDate.month, formattedDate.year];
  }, [profile, t]);

  const handleConfirm = (date: Date) => {
    setProfileHandler({ ...profile, dateOfBirth: date.toISOString() });
    setDatePickerVisibility(false);
  };

  return (
    <View style={[styles.container, computedStyles.container]}>
      {Array.from({ length: 3 }).map((_, index) => (
        <PressableCustom
          onPress={() => setDatePickerVisibility(true)}
          key={index}
          style={styles.button}
          containerStyle={[styles.flex1, computedStyles.buttonContainer]}
        >
          <TextCustom style={[styles.flex1, computedStyles.text]} numberOfLines={1} text={dateOfBirth[index]} />
          <TriangleIcon />
        </PressableCustom>
      ))}

      <DatePicker
        isVisible={isDatePickerVisible}
        handleConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        defaultDate={profile.dateOfBirth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex1: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DateOfBirthStep;
