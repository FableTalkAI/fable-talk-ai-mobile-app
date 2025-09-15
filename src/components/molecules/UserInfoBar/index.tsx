import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { PencilIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import DatePicker from '@/components/molecules/DatePicker';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { BOX_SHADOW } from '@/core/constants/styles.ts';
import { formatDateCombined } from '@/core/utils/date.ts';
import useTheme from '@/hooks/useTheme.ts';
import useUserStore from '@/hooks/useUserStore.ts';

import { TITLES } from './constants.ts';
import { UserInfoBarProps } from './types.ts';

const UserInfoBar = ({ field }: UserInfoBarProps) => {
  const inputRef = useRef<TextInput>(null);

  const { t } = useTranslation();
  const { colors } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { profile, setProfileHandler } = useUserStore();

  const displayValue = field === 'dateOfBirth' ? formatDateCombined(profile[field]!) : profile[field]!;

  const startEditing = () => {
    if (field === 'dateOfBirth') {
      setDatePickerVisibility(true);
    } else {
      setIsEditing(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleConfirm = (date: Date) => {
    setProfileHandler({ ...profile, dateOfBirth: date.toISOString() });
    setDatePickerVisibility(false);
  };

  const handleOnChangeText = (result: string) => {
    setProfileHandler({ ...profile, [field]: result.trim() });
  };

  const handleSubmit = () => {
    setIsEditing(false);
    Keyboard.dismiss();
  };

  const computedStyles = StyleSheet.create({
    wrapper: {
      backgroundColor: colors.backgroundBase,
    },
    title: {
      color: colors.textSecondary,
    },
    content: {
      color: colors.textPrimary,
    },
  });

  return (
    <PressableCustom style={[computedStyles.wrapper, styles.wrapper]} onPress={startEditing}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <TextCustom text={t(TITLES[field])} mode={TextModes.Caption} style={computedStyles.title} />

          {!isEditing && (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <PencilIcon fill={colors.textSecondary} />
            </Animated.View>
          )}
        </View>

        {isEditing ? (
          <TextInputCustom
            wrapperStyle={styles.textInputWrapper}
            style={styles.textInput}
            ref={inputRef}
            value={profile[field]!}
            onChangeText={handleOnChangeText}
            onBlur={() => setIsEditing(false)}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
          />
        ) : (
          <TextCustom text={displayValue} mode={TextModes.Base} style={computedStyles.content} />
        )}
      </View>

      <DatePicker
        isVisible={isDatePickerVisible}
        handleConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderRadius: RADIUS.medium,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    boxShadow: BOX_SHADOW.base,
  },
  contentContainer: {
    flex: 1,
    gap: SPACING.xxs,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    paddingTop: 1,
  },
  textInputWrapper: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
});

export default UserInfoBar;
