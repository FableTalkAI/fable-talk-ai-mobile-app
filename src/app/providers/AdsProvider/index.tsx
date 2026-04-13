import { APPODEAL_ANDROID_KEY, APPODEAL_IOS_KEY } from '@env';
import { useEffect } from 'react';
import Appodeal, { AppodealAdType, AppodealLogLevel } from 'react-native-appodeal';

import { IS_IOS } from '@/shared/model/device.ts';

import { AdsProviderProps } from './types.ts';

const AdsProvider = ({ children }: AdsProviderProps) => {
  useEffect(() => {
    Appodeal.setTesting(__DEV__);
    Appodeal.setLogLevel(AppodealLogLevel.DEBUG);
    Appodeal.setChildDirectedTreatment(false);

    Appodeal.setTabletBanners(false);
    Appodeal.setSmartBanners(true);

    const adKey = IS_IOS ? APPODEAL_IOS_KEY : APPODEAL_ANDROID_KEY;

    Appodeal.initialize(
      adKey,
      AppodealAdType.INTERSTITIAL | AppodealAdType.REWARDED_VIDEO | AppodealAdType.BANNER | AppodealAdType.MREC,
    );
  }, []);

  return <>{children}</>;
};

export default AdsProvider;
