import { createSlice } from '@reduxjs/toolkit';

import { authSliceName } from './thunks.ts';
import { AuthState } from './types.ts';

const initialState: AuthState = {};

const authSlice = createSlice({
  name: authSliceName,
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
