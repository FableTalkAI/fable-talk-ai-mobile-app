import { ReactElement } from 'react';

export type OverlayState = {
  bottomWindow: {
    customContent?: CustomRender;
    isLocked: boolean;
  };
  modal: {
    customContent?: ModalCustomContent;
  };
};

export type CustomRender = ((close: () => void) => ReactElement) | null;

export type ModalCustomContent = ReactElement | null;
