export type SelectProps = {
  options: string[];
  width?: number;
  defaultOption?: string;
};

export type SelectRef = {
  close: () => void;
};
