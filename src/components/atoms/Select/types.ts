export type SelectProps<T> = {
  options: {
    title: string;
    value: T;
  }[];
  onChange: (value: T) => void;
  width?: number;
  defaultValue?: T;
};
