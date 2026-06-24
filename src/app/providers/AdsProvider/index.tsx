import { useEffect } from 'react';
import mobileAds, { AdsConsent, AdsConsentStatus } from 'react-native-google-mobile-ads';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

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
        } else {
          const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
          if (result === RESULTS.DENIED) {
            await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
          }
        }

        await mobileAds().initialize();
      } catch (error) {
        console.error('Initialize Ads failed:', error);
      }
    };

    initAds().catch(console.error);
  }, []);

  return <>{children}</>;
};

export default AdsProvider;
