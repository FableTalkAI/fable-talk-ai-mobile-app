import { useRef, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { PencilIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import { ShadowCustomModes } from '@/components/atoms/ShadowCustom/types.ts';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import DatePicker from '@/components/molecules/DatePicker';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { formatDateCombined } from '@/core/utils/date.ts';
import useTheme from '@/hooks/useTheme.ts';
import useUserStore from '@/hooks/useUserStore.ts';

import { UserInfoBarProps } from './types.ts';

const UserInfoBar = ({ title, field }: UserInfoBarProps) => {
  const inputRef = useRef<TextInput>(null);

  const { colors } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { profile, setProfileHandler } = useUserStore();

  const displayValue = field === 'dateOfBirth' ? formatDateCombined(profile[field] || '') : profile[field] || '';

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
    shadowStyle: {
      backgroundColor: colors.backgroundBase,
      borderRadius: RADIUS.medium,
      paddingHorizontal: SPACING.m,
      paddingVertical: SPACING.s,
    },
    title: {
      color: colors.textSecondary,
    },
    content: {
      color: colors.textPrimary,
    },
  });

  return (
    <PressableCustom onPress={startEditing}>
      <ShadowCustom mode={ShadowCustomModes.Base} style={[computedStyles.shadowStyle, styles.shadowStyle]}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <TextCustom text={title} mode={TextModes.Caption} style={computedStyles.title} />

            {!isEditing && (
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                <PencilIcon />
              </Animated.View>
            )}
          </View>

          {isEditing ? (
            <TextInputCustom
              ref={inputRef}
              value={profile[field] || ''}
              onChangeText={handleOnChangeText}
              onBlur={() => setIsEditing(false)}
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
            />
          ) : (
            <TextCustom text={displayValue} mode={TextModes.Base} style={computedStyles.content} />
          )}
        </View>
      </ShadowCustom>

      <DatePicker
        isVisible={isDatePickerVisible}
        handleConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  shadowStyle: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default UserInfoBar;
