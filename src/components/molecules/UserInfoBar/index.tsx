import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { PencilIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import ComponentLoader from '@/components/molecules/ComponentLoader/index.tsx';
import DatePicker from '@/components/molecules/DatePicker';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { BOX_SHADOW } from '@/core/constants/styles.ts';
import { formatDateCombined } from '@/core/utils/date.ts';
import useProfileStore from '@/hooks/useProfileStore.ts';
import useTheme from '@/hooks/useTheme.ts';

import { TITLES } from './constants.ts';
import { UserInfoBarProps } from './types.ts';

const UserInfoBar = ({ field, isLoading }: UserInfoBarProps) => {
  const inputRef = useRef<TextInput>(null);

  const { t } = useTranslation();
  const { colors } = useTheme();
  const { profile, updateUserProfileHandler } = useProfileStore();

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(profile ? profile[field] : '');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    if (profile && text !== profile.name && field === 'name' && !!text.trim().length && !isEditing) {
      updateUserProfileHandler({ [field]: text }).catch(console.error);
    }
  }, [field, isEditing, profile, text, updateUserProfileHandler]);

  if (profile === null) return null;

  const displayValue = field === 'dateOfBirth' ? formatDateCombined(profile[field]) : profile[field];

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

  const handleConfirm = async (date: Date) => {
    setDatePickerVisibility(false);
    await updateUserProfileHandler({ dateOfBirth: date.toISOString() });
  };

  const handleSubmit = () => {
    setIsEditing(false);
    Keyboard.dismiss();
  };

  return (
    <PressableCustom style={[computedStyles.wrapper, styles.wrapper]} onPress={startEditing} disabled={isLoading}>
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
            value={isEditing ? text : profile[field]}
            onChangeText={setText}
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

      <ComponentLoader isVisible={isLoading} />
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
    overflow: 'hidden',
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
