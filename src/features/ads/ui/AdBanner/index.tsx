import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

import { AD_UNITS } from '@/features/ads/model/constants.ts';
import useSubscription from '@/features/subscriptions/hooks/useSubscription';

import { AdBannerProps } from './types.ts';

const AdBanner = ({ size = BannerAdSize.FULL_BANNER, style }: AdBannerProps) => {
  const { isPremium } = useSubscription();

  const [isAdVisible, setIsAdVisible] = useState(true);

  if (!isAdVisible || isPremium) return null;

  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={AD_UNITS.BANNER}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
        onAdFailedToLoad={error => {
          console.log('Banner failed to load:', error);
          setIsAdVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default AdBanner;
