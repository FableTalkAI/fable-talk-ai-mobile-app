import { createSlice } from '@reduxjs/toolkit';

import { agentsSliceName, getAllUniqueTags, getFilteredAgents, getResultsOfSearch } from './thunks.ts';
import { AgentsState } from './types.ts';

const initialState: AgentsState = {
  tags: [],
  agents: [],
  pagination: {
    hasMore: true,
  },
  searchResults: [],
  loading: {
    agents: false,
    tags: false,
    searchResults: false,
  },
};

const agentsSlice = createSlice({
  name: agentsSliceName,
  initialState,
  reducers: {
    clearSearchResults: state => {
      state.searchResults = initialState.searchResults;
    },
  },
  extraReducers: builder => {
    builder
      //getAllUniqueTags
      .addCase(getAllUniqueTags.pending, state => {
        state.loading.tags = true;
      })
      .addCase(getAllUniqueTags.fulfilled, (state, action) => {
        state.loading.tags = false;
        state.tags = action.payload;
      })
      .addCase(getAllUniqueTags.rejected, state => {
        state.loading.tags = false;
      })

      //getFilteredAgents
      .addCase(getFilteredAgents.pending, state => {
        state.loading.agents = true;
      })
      .addCase(getFilteredAgents.fulfilled, (state, action) => {
        state.loading.agents = false;
        const { data, nextCursor, hasMore } = action.payload;
        const loadMore = action.meta.arg;

        state.agents = loadMore ? [...state.agents, ...data] : data;
        state.pagination = { hasMore, nextCursor };
      })
      .addCase(getFilteredAgents.rejected, state => {
        state.loading.agents = false;
      })

      //getResultsOfSearch
      .addCase(getResultsOfSearch.pending, state => {
        state.loading.searchResults = true;
      })
      .addCase(getResultsOfSearch.fulfilled, (state, action) => {
        state.loading.searchResults = false;
        state.searchResults = action.payload;
      })
      .addCase(getResultsOfSearch.rejected, state => {
        state.loading.searchResults = false;
      });
  },
});

export const { clearSearchResults } = agentsSlice.actions;

export default agentsSlice.reducer;
