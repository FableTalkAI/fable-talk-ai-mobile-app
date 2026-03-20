import { ReactElement } from 'react';

export type CustomRender = ((close: () => void) => ReactElement) | null;

export type BottomWindowState = {
  customContent?: CustomRender;
  isLocked: boolean;
};
