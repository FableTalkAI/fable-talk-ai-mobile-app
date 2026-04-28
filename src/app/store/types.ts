import { Reducer } from '@reduxjs/toolkit';
import { PersistPartial } from 'redux-persist/lib/persistReducer';

import { AgentsState } from '@/features/agents/store/agents/types.ts';
import { AuthState } from '@/features/auth/store/auth/types.ts';
import { ChatState } from '@/features/chat/store/chat/types.ts';
import { CustomizationState } from '@/features/customization/store/customization/types.ts';
import { OverlayState } from '@/features/overlay/store/overlay/types.ts';
import { ProfileState } from '@/features/profile/store/profile/types.ts';
import { UserState } from '@/features/profile/store/user/types.ts';
import { SubscriptionState } from '@/features/subscriptions/store/subscriptions/types.ts';

export type ReducersTypes = {
  agents: Reducer<AgentsState>;
  user: Reducer<UserState>;
  overlay: Reducer<OverlayState>;
  chat: Reducer<ChatState & PersistPartial>;
  profile: Reducer<ProfileState & PersistPartial>;
  auth: Reducer<AuthState>;
  subscription: Reducer<SubscriptionState>;
  customization: Reducer<CustomizationState>;
};

export type ReducersKeys = keyof ReducersTypes;
