import { useEffect } from 'react';
import mobileAds, { AdsConsent, AdsConsentStatus } from 'react-native-google-mobile-ads';
import { PERMISSIONS, request } from 'react-native-permissions';

import { IS_IOS } from '@/shared/model/device.ts';

import { AdsProviderProps } from './types.ts';

const AdsProvider = ({ children }: AdsProviderProps) => {
  useEffect(() => {
    const initAds = async () => {
      try {
        await mobileAds().setRequestConfiguration({
          testDeviceIdentifiers: ['CFA6618D-7F2B-42CE-9CB5-073F9737475D'],
        });

        const consentInfo = await AdsConsent.requestInfoUpdate();

        if (consentInfo.isConsentFormAvailable && consentInfo.status === AdsConsentStatus.REQUIRED) {
          await AdsConsent.showForm();
        }

        if (IS_IOS) {
          const result = await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
          console.log('ATT Permission Status:', result);
        }

        await mobileAds().initialize();
      } catch (error) {
        console.error('Initialize Ads failed:', error);
        await mobileAds().initialize();
      }
    };

    const timer = setTimeout(() => {
      initAds().catch(console.error);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
};

export default AdsProvider;
