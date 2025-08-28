export type SelectProps<T extends string> = {
  options: T[];
  width?: number;
  defaultOption?: T;
  onChange?: (value: T) => void;
};

export type SelectRef = {
  close: () => void;
};
