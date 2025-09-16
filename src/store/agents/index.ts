import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChatGPTLogo } from '@/assets/images';

import { agentsSliceName } from './thunks.ts';
import { Agent, AgentsState, OrderFilter, SortFilter } from './types.ts';

const initialState: AgentsState = {
  tags: ['Home', 'Test', 'Home1', 'Test2', 'Home2', 'Test3', 'Home4', 'Test6'],
  agents: [
    {
      name: 'Jonh7',
      description: 'Jonh devs ass dd ss sda ss sadas s',
      tags: ['Home', 'Test', 'Home1', 'Test1'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh6',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh5',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh4',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh3',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh2',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh1',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh55',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh44',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh33',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh22',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh11',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
  ],
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
    setAgents: (state, action: PayloadAction<Agent[]>) => {
      state.agents = action.payload;
    },
    clearAgents: state => {
      state.agents = initialState.agents;
    },
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

export const { setAgents, clearAgents, setFilterTags, setFilterSort, setFilterOrder, clearFilter } =
  agentsSlice.actions;

export default agentsSlice.reducer;
