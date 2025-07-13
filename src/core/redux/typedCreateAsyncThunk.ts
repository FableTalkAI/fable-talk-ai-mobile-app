import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';

import { AppDispatch, AppState } from '../../store';

const baseTypedCreateAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  rejectValue: AxiosError;
}>();

type PayloadCreator<Returned, ThunkArg> = AsyncThunkPayloadCreator<
  Returned,
  ThunkArg,
  {
    state: AppState;
    dispatch: AppDispatch;
    rejectValue: AxiosError;
  }
>;

export function createAxiosAsyncThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: PayloadCreator<Returned, ThunkArg>,
) {
  return baseTypedCreateAsyncThunk<Returned, ThunkArg>(typePrefix, (arg, thunkAPI) => {
    return Promise.resolve(payloadCreator(arg, thunkAPI)).catch(error => {
      return thunkAPI.rejectWithValue(error as AxiosError);
    });
  });
}
