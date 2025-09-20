import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BottomWindowModes } from '@/hooks/useBottomWindow/types.ts';

import { UISliceName } from './thunks.ts';
import { UIState } from './types.ts';

const initialState: UIState = {
  bottomWindowMode: null,
};

const userSlice = createSlice({
  name: UISliceName,
  initialState,
  reducers: {
    setBottomWindowMode: (state, action: PayloadAction<BottomWindowModes | null>) => {
      state.bottomWindowMode = action.payload;
    },
  },
});

export const { setBottomWindowMode } = userSlice.actions;

export default userSlice.reducer;
