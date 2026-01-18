import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import bottomWindowReducer from '@/features/bottomWindow/store/bottomWindow';
import persistConfig from '@/shared/lib/redux/persist.ts';

import authReducer from '../../features/auth/store/auth';
import chatReducer from '../../features/chat/store/chat';
import agentsReducer from '../../features/home/store/agents';
import profileReducer from '../../features/profile/store/profile';
import userReducer from '../../features/profile/store/user';
import { ReducersTypes } from './types.ts';

const appReducer = combineReducers<ReducersTypes>({
  agents: agentsReducer,
  user: userReducer,
  bottomWindow: bottomWindowReducer,
  chat: chatReducer,
  profile: profileReducer,
  auth: authReducer,
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
