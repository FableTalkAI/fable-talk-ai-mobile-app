import { Reducer } from '@reduxjs/toolkit';

import { AgentsState } from '@/store/agents/types.ts';
import { UIState } from '@/store/ui/types.ts';
import { UserState } from '@/store/user/types.ts';

export type ReducersTypes = {
  agents: Reducer<AgentsState>;
  user: Reducer<UserState>;
  ui: Reducer<UIState>;
};

export type ReducersKeys = keyof ReducersTypes;
