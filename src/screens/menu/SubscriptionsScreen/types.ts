import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

export type Subscription = {
  name: string;
  price: string;
  pros: string[];
  cons: string[];
  icon: FC<SvgProps>;
  gradientKey: SubscriptionPlans;
};

export enum SubscriptionPlans {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
}
