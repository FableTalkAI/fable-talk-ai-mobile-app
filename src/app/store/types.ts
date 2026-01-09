import { Reducer } from '@reduxjs/toolkit';

import { AuthState } from '@/features/auth/store/auth/types.ts';
import { BottomWindowState } from '@/features/bottomWindow/store/bottomWindow/types.ts';
import { ChatState } from '@/features/chat/store/chat/types.ts';
import { AgentsState } from '@/features/home/store/agents/types.ts';
import { ProfileState } from '@/features/profile/store/profile/types.ts';
import { UserState } from '@/features/profile/store/user/types.ts';

export type ReducersTypes = {
  agents: Reducer<AgentsState>;
  user: Reducer<UserState>;
  bottomWindow: Reducer<BottomWindowState>;
  chat: Reducer<ChatState>;
  profile: Reducer<ProfileState>;
  auth: Reducer<AuthState>;
};

export type ReducersKeys = keyof ReducersTypes;
