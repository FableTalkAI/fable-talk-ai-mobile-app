import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { overlaySliceName } from './thunks.ts';
import { CustomRender, ModalCustomContent, OverlayState } from './types.ts';

const initialState: OverlayState = {
  bottomWindow: {
    customContent: null,
    isLocked: false,
  },
  modal: {
    customContent: null,
  },
};

const overlaySlice = createSlice({
  name: overlaySliceName,
  initialState,
  reducers: {
    // BottomWindow
    setBottomWindowCustomContent: (state, action: PayloadAction<CustomRender>) => {
      state.bottomWindow.customContent = action.payload;
    },
    setBottomWindowIsLocked: (state, action: PayloadAction<boolean>) => {
      state.bottomWindow.isLocked = action.payload;
    },

    // Modal
    setModalCustomContent: (state, action: PayloadAction<ModalCustomContent>) => {
      state.modal.customContent = action.payload;
    },
  },
});

export const { setBottomWindowCustomContent, setBottomWindowIsLocked, setModalCustomContent } = overlaySlice.actions;

export default overlaySlice.reducer;
