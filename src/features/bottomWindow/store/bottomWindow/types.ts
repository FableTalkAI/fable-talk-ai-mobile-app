import { ReactElement } from 'react';

import { BottomWindowModes } from '@/features/bottomWindow/hooks/useBottomWindow/types.ts';

export type CustomRender = ((close: () => void) => ReactElement) | null;

export type BottomWindowState = {
  bottomWindowMode: BottomWindowModes | null;
  customContent?: CustomRender;
};
