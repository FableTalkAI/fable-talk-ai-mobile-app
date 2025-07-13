import { AgentsState } from '@/store/agents/types.ts';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersTypes = {
  agents: Reducer<AgentsState>;
};

export type ReducersKeys = keyof ReducersTypes;
