import { Reducer } from '@reduxjs/toolkit';

import { AgentsState } from '@/store/agents/types.ts';
import { UserState } from '@/store/user/types.ts';

export type ReducersTypes = {
  agents: Reducer<AgentsState>;
  user: Reducer<UserState>;
};

export type ReducersKeys = keyof ReducersTypes;
