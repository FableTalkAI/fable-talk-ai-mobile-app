import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';

import { SubscriptionBasicIcon, SubscriptionFreeIcon, SubscriptionPremiumIcon } from '@/assets/icons';

import { Subscription, SubscriptionPlans } from './types.ts';

export const SUBSCRIPTIONS: Subscription[] = [
  {
    name: 'subscription.free.name',
    price: '0$',
    pros: [
      'subscription.free.pros.0',
      'subscription.free.pros.1',
      'subscription.free.pros.2',
      'subscription.free.pros.3',
    ],
    cons: [
      'subscription.free.cons.0',
      'subscription.free.cons.1',
      'subscription.free.cons.2',
      'subscription.free.cons.3',
    ],
    icon: SubscriptionFreeIcon,
    gradientKey: SubscriptionPlans.Free,
  },
  {
    name: 'subscription.basic.name',
    price: '5$',
    pros: [
      'subscription.basic.pros.0',
      'subscription.basic.pros.1',
      'subscription.basic.pros.2',
      'subscription.basic.pros.3',
    ],
    cons: ['subscription.basic.cons.0', 'subscription.basic.cons.1'],
    icon: SubscriptionBasicIcon,
    gradientKey: SubscriptionPlans.Basic,
  },
  {
    name: 'subscription.premium.name',
    price: '12$',
    pros: [
      'subscription.premium.pros.0',
      'subscription.premium.pros.1',
      'subscription.premium.pros.2',
      'subscription.premium.pros.3',
    ],
    cons: [],
    icon: SubscriptionPremiumIcon,
    gradientKey: SubscriptionPlans.Premium,
  },
];

export const CARD_WIDTH = SCREEN_WIDTH - 32 * 2;
export const CARD_HEIGHT = SCREEN_HEIGHT * 0.7;
