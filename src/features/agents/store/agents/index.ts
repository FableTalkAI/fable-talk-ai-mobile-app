import { createSlice } from '@reduxjs/toolkit';
import i18n from 'i18next';

import { showToast } from '@/shared/lib/toast';

import {
  agentsSliceName,
  createAgent,
  getAllUniqueTags,
  getFilteredAgents,
  getMyAgents,
  getResultsOfSearch,
  updateAgent,
} from './thunks.ts';
import { AgentsState } from './types.ts';

const initialState: AgentsState = {
  tags: [],
  agents: [],
  myAgents: [],
  hasModerationLimit: false,
  pagination: {
    agents: {
      hasMore: true,
    },
    myAgents: {
      hasMore: true,
    },
  },
  searchResults: [],
  loading: {
    myAgents: false,
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

      //getMyAgents
      .addCase(getMyAgents.pending, state => {
        state.loading.myAgents = true;
      })
      .addCase(getMyAgents.fulfilled, (state, action) => {
        state.loading.myAgents = false;
        const { data, nextCursor, hasMore, hasModerationLimit } = action.payload;
        const loadMore = action.meta.arg;

        state.myAgents = loadMore ? [...state.agents, ...data] : data;
        state.pagination.myAgents = { hasMore, nextCursor };
        state.hasModerationLimit = hasModerationLimit;
      })
      .addCase(getMyAgents.rejected, state => {
        state.loading.myAgents = false;
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
        state.pagination.agents = { hasMore, nextCursor };
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
      })

      //createAgent
      .addCase(createAgent.rejected, (state, action) => {
        showToast({
          type: 'error',
          text2: i18n.t(`serverResponses.${action.payload?.messageKey}`),
        });
      })

      //createAgent
      .addCase(updateAgent.rejected, (state, action) => {
        showToast({
          type: 'error',
          text2: i18n.t(`serverResponses.${action.payload?.messageKey}`),
        });
      });
  },
});

export const { clearSearchResults } = agentsSlice.actions;

export default agentsSlice.reducer;
