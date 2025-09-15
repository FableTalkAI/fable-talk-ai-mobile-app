import { Dispatch, SetStateAction } from 'react';

export type ToggleProps = {
  isActive: boolean;
  setIsActive?: Dispatch<SetStateAction<boolean>>;
};
