import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgentsState } from '@/store/agents/types.ts';
import { getAmount } from '@/store/agents/thunks.ts';

export const agentsSliceName = 'agents';

const initialState: AgentsState = {
  amount: 0,
};

const agentsSlice = createSlice({
  name: agentsSliceName,
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAmount.pending, (state, action) => {
        state.amount = 0;
      })
      .addCase(getAmount.fulfilled, (state, action) => {
        state.amount = action.payload;
      })
      .addCase(getAmount.rejected, (state, action) => {
        state.amount = 0;
      });
  },
});

export const { setAmount } = agentsSlice.actions;

export default agentsSlice.reducer;
