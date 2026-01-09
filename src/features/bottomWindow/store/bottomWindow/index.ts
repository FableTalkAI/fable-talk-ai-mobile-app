import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BottomWindowModes } from '@/features/bottomWindow/hooks/useBottomWindow/types.ts';

import { bottomWindowSliceName } from './thunks.ts';
import { BottomWindowState } from './types.ts';

const initialState: BottomWindowState = {
  bottomWindowMode: null,
};

const bottomWindowSlice = createSlice({
  name: bottomWindowSliceName,
  initialState,
  reducers: {
    setBottomWindowMode: (state, action: PayloadAction<BottomWindowModes | null>) => {
      state.bottomWindowMode = action.payload;
    },
  },
});

export const { setBottomWindowMode } = bottomWindowSlice.actions;

export default bottomWindowSlice.reducer;
