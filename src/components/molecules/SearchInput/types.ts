export type SearchInputProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  withBackArrow?: boolean;
  withFilter?: boolean;
  isDisabled?: boolean;
};
