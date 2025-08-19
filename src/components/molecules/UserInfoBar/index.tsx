import { useRef, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { PencilIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import { ShadowCustomModes } from '@/components/atoms/ShadowCustom/types.ts';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { UserInfoBarProps } from './types.ts';

const UserInfoBar = ({ title = '', value = '', onChange, isDate = false }: UserInfoBarProps) => {
  const { colors } = useTheme();

  const inputRef = useRef<TextInput>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const startEditing = () => {
    if (isDate) {
      setDatePickerVisibility(true);
    } else {
      setIsEditing(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const saveAndClose = () => {
    setIsEditing(false);
    onChange?.(text.trim());
  };

  const handleConfirm = (date: Date) => {
    setText(date.toLocaleDateString('en-GB'));
    onChange?.(date.toLocaleDateString('en-GB'));
    setDatePickerVisibility(false);
  };

  const handleSubmit = () => {
    saveAndClose();
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

            {!isEditing && <PencilIcon />}
          </View>

          {isEditing ? (
            <TextInputCustom
              ref={inputRef}
              value={text}
              onChangeText={setText}
              onBlur={saveAndClose}
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
            />
          ) : (
            <TextCustom text={text} mode={TextModes.Base} style={computedStyles.content} />
          )}
        </View>
      </ShadowCustom>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        display="calendar"
        onConfirm={handleConfirm}
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
