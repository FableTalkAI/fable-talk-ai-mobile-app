export type TagProps = {
  title: string;
  forceActive?: boolean;
  isSelected?: boolean;
  onToggle?: (title: string) => void;
};

export enum TagColorModes {
  Inactive = 'inactive',
  Active = 'active',
}
