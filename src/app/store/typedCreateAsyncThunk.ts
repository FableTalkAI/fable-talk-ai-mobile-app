import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { type AxiosError } from 'axios';

import { UserLimits } from '@/features/profile/store/profile/types.ts';

import { type AppDispatch, type AppState } from './index.ts';

type DefaultThunkError = {
  messageKey: string;
  details: string;
  remainingAttempts: number;
  limits: UserLimits;
};

const baseTypedCreateAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  rejectValue: unknown;
}>();

type PayloadCreator<Returned, ThunkArg, ThunkError> = AsyncThunkPayloadCreator<
  Returned,
  ThunkArg,
  {
    state: AppState;
    dispatch: AppDispatch;
    rejectValue: ThunkError;
  }
>;

export function createAxiosAsyncThunk<Returned, ThunkArg = void, ThunkError = DefaultThunkError>(
  typePrefix: string,
  payloadCreator: PayloadCreator<Returned, ThunkArg, ThunkError>,
) {
  return baseTypedCreateAsyncThunk<Returned, ThunkArg, { rejectValue: ThunkError }>(typePrefix, (arg, thunkAPI) => {
    return Promise.resolve(payloadCreator(arg, thunkAPI)).catch((error: unknown) => {
      const axiosError = error as AxiosError<ThunkError>;
      const data = axiosError?.response?.data;

      return thunkAPI.rejectWithValue(data || ({ messageKey: 'serverError' } as ThunkError));
    });
  });
}
