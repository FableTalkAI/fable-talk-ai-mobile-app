import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BottomWindowModes } from '@/features/bottomWindow/hooks/useBottomWindow/types.ts';

import { bottomWindowSliceName } from './thunks.ts';
import { BottomWindowState, CustomRender } from './types.ts';

const initialState: BottomWindowState = {
  bottomWindowMode: null,
  customContent: null,
};

const bottomWindowSlice = createSlice({
  name: bottomWindowSliceName,
  initialState,
  reducers: {
    setBottomWindowMode: (state, action: PayloadAction<BottomWindowModes | null>) => {
      state.bottomWindowMode = action.payload;
    },
    setCustomContent: (state, action: PayloadAction<CustomRender>) => {
      state.customContent = action.payload;
    },
  },
});

export const { setBottomWindowMode, setCustomContent } = bottomWindowSlice.actions;

export default bottomWindowSlice.reducer;
