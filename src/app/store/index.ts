import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import overlayReducer from '@/features/overlay/store/overlay';
import persistConfig from '@/shared/lib/redux/persist.ts';

import agentsReducer from '../../features/agents/store/agents';
import authReducer from '../../features/auth/store/auth';
import chatReducer, { chatPersistConfig } from '../../features/chat/store/chat';
import customizationReducer from '../../features/customization/store/customization';
import profileReducer, { profilePersistConfig } from '../../features/profile/store/profile';
import userReducer from '../../features/profile/store/user';
import subscriptionReducer from '../../features/subscriptions/store/subscriptions';
import { ReducersTypes } from './types.ts';

const appReducer = combineReducers<ReducersTypes>({
  agents: agentsReducer,
  user: userReducer,
  overlay: overlayReducer,
  chat: persistReducer(chatPersistConfig, chatReducer),
  profile: persistReducer(profilePersistConfig, profileReducer),
  auth: authReducer,
  subscription: subscriptionReducer,
  customization: customizationReducer,
});

export const rootReducer = (state: any, action: Action) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const resetApp = () => ({ type: 'RESET_APP' });
