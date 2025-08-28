export type SelectProps = {
  options: string[];
  width?: number;
  defaultOption?: string;
  // TODO: any
  onChange?: (value: any) => void;
};

export type SelectRef = {
  close: () => void;
};
