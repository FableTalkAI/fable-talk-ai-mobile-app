import { Reducer } from '@reduxjs/toolkit';

import { AgentsState } from '@/store/agents/types.ts';
import { AuthState } from '@/store/auth/types.ts';
import { ChatState } from '@/store/chat/types.ts';
import { ProfileState } from '@/store/profile/types.ts';
import { UIState } from '@/store/ui/types.ts';
import { UserState } from '@/store/user/types.ts';

export type ReducersTypes = {
  agents: Reducer<AgentsState>;
  user: Reducer<UserState>;
  ui: Reducer<UIState>;
  chat: Reducer<ChatState>;
  profile: Reducer<ProfileState>;
  auth: Reducer<AuthState>;
};

export type ReducersKeys = keyof ReducersTypes;
