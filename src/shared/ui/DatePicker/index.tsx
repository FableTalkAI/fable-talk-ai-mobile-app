import { StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { IS_IOS } from '@/shared/model/device.ts';
import { SPACING } from '@/shared/model/sizes.ts';

import { DatePickerProps } from './types.ts';

const DatePicker = ({ isVisible, onCancel, handleConfirm, defaultDate }: DatePickerProps) => {
  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode="date"
      display={IS_IOS ? 'spinner' : 'calendar'}
      maximumDate={new Date()}
      minimumDate={new Date(1930, 0, 1)}
      date={defaultDate ? new Date(defaultDate) : new Date()}
      pickerStyleIOS={styles.pickerStyleIOS}
      modalStyleIOS={styles.modalStyleIOS}
      onConfirm={handleConfirm}
      onCancel={onCancel}
    />
  );
};

const styles = StyleSheet.create({
  pickerStyleIOS: {
    alignItems: 'center',
  },
  modalStyleIOS: {
    marginBottom: SPACING.xl,
  },
});

export default DatePicker;
