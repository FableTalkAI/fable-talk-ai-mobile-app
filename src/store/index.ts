import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import persistConfig from '@/core/configs/persist.ts';
import { ReducersTypes } from '@/core/redux/types.ts';

import agentsReducer from './agents';
import uiReducer from './ui';
import userReducer from './user';

const rootReducer = combineReducers<ReducersTypes>({
  agents: agentsReducer,
  user: userReducer,
  ui: uiReducer,
});

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
