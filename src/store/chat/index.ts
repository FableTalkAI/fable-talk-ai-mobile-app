import { createSlice } from '@reduxjs/toolkit';

import { chatSliceName } from './thunks.ts';
import { ChatState } from './types.ts';

const initialState: ChatState = {};

const chatSlice = createSlice({
  name: chatSliceName,
  initialState,
  reducers: {},
});

export const {} = chatSlice.actions;

export default chatSlice.reducer;
