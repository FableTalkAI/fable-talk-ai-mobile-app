import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { bottomWindowSliceName } from './thunks.ts';
import { BottomWindowState, CustomRender } from './types.ts';

const initialState: BottomWindowState = {
  customContent: null,
  isLocked: false,
};

const bottomWindowSlice = createSlice({
  name: bottomWindowSliceName,
  initialState,
  reducers: {
    setCustomContent: (state, action: PayloadAction<CustomRender>) => {
      state.customContent = action.payload;
    },
    setIsLocked: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action.payload;
    },
  },
});

export const { setCustomContent, setIsLocked } = bottomWindowSlice.actions;

export default bottomWindowSlice.reducer;
