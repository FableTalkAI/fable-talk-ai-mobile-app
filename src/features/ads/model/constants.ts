import { TestIds } from 'react-native-google-mobile-ads';

import { IS_IOS } from '@/shared/model/device.ts';

const REAL_AD_UNITS = {
  BANNER: IS_IOS ? 'ca-app-pub-4742473274098229/1860340176' : 'ca-app-pub-4742473274098229/2008662378',
  REWARDED: IS_IOS ? 'ca-app-pub-4742473274098229/6090166162' : 'ca-app-pub-4742473274098229/1593583615',
};

const TEST_AD_UNITS = {
  BANNER: TestIds.BANNER,
  REWARDED: TestIds.REWARDED,
};

export const AD_UNITS = __DEV__ ? TEST_AD_UNITS : REAL_AD_UNITS;
