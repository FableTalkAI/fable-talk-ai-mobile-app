import { Reducer } from '@reduxjs/toolkit';

import { AgentsState } from '@/store/agents/types.ts';

export type ReducersTypes = {
  agents: Reducer<AgentsState>;
};

export type ReducersKeys = keyof ReducersTypes;
