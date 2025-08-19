export type DatePickerProps = {
  isVisible: boolean;
  onCancel: () => void;
  handleConfirm: (date: Date) => void;
  defaultDate?: string | Date;
};
