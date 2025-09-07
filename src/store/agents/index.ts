import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { agentsSliceName } from './thunks.ts';
import { AgentsState, OrderFilter, SortFilter } from './types.ts';

const initialState: AgentsState = {
  tags: ['Hone', 'Sssad', 'Ssad11'],
  agents: [],
  filter: {
    tags: [],
    sort: SortFilter.Alphabetically,
    order: OrderFilter.ASC,
  },
};

const agentsSlice = createSlice({
  name: agentsSliceName,
  initialState,
  reducers: {
    setFilterTags: (state, action: PayloadAction<string[]>) => {
      state.filter.tags = action.payload;
    },
    setFilterSort: (state, action: PayloadAction<SortFilter>) => {
      state.filter.sort = action.payload;
    },
    setFilterOrder: (state, action: PayloadAction<OrderFilter>) => {
      state.filter.order = action.payload;
    },
    clearFilter: state => {
      state.filter = initialState.filter;
    },
  },
});

export const { setFilterTags, setFilterSort, setFilterOrder, clearFilter } = agentsSlice.actions;

export default agentsSlice.reducer;
