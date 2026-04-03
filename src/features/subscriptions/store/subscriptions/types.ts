import { CustomerInfo, PurchasesPackage } from 'react-native-purchases';

export type SubscriptionState = {
  customerInfo: CustomerInfo | null;
  packages: PurchasesPackage[];
};
