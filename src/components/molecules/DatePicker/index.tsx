import { StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { IS_IOS } from '@/core/constants/device.ts';
import { SPACING } from '@/core/constants/sizes.ts';

import { DatePickerProps } from './types.ts';

const DatePicker = ({ isVisible, onCancel, handleConfirm, defaultDate }: DatePickerProps) => {
  const computedStyles = StyleSheet.create({
    modalStyleIOS: {
      marginBottom: SPACING.xl,
    },
  });

  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode="date"
      display={IS_IOS ? 'spinner' : 'calendar'}
      maximumDate={new Date()}
      minimumDate={new Date(1900, 0, 1)}
      date={defaultDate ? new Date(defaultDate) : new Date()}
      pickerStyleIOS={style.pickerStyleIOS}
      modalStyleIOS={computedStyles.modalStyleIOS}
      onConfirm={handleConfirm}
      onCancel={onCancel}
    />
  );
};

const style = StyleSheet.create({
  pickerStyleIOS: {
    alignItems: 'center',
  },
});

export default DatePicker;
