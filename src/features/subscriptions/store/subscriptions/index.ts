import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerInfo, PurchasesPackage } from 'react-native-purchases';

import { SubscriptionState } from './types.ts';

const subscriptionSliceName = 'subscriptions';

const initialState: SubscriptionState = {
  customerInfo: null,
  packages: [],
};

const subscriptionSlice = createSlice({
  name: subscriptionSliceName,
  initialState,
  reducers: {
    setPackages: (state, action: PayloadAction<PurchasesPackage[]>) => {
      state.packages = action.payload;
    },
    setCustomerInfo: (state, action: PayloadAction<CustomerInfo>) => {
      state.customerInfo = action.payload;
    },
  },
});

export const { setPackages, setCustomerInfo } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
