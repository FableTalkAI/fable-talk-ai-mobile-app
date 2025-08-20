export type AlertProps = {
  title: string;
  subtitle: string;
  onConfirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
};
