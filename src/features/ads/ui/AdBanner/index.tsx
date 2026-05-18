import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

import { AD_UNITS } from '@/features/ads/model/constants.ts';
import { SPACING } from '@/shared/model/sizes.ts';

import { AdBannerProps } from './types.ts';

const AdBanner = ({ size = BannerAdSize.INLINE_ADAPTIVE_BANNER }: AdBannerProps) => {
  const [isAdVisible, setIsAdVisible] = useState(true);

  if (!isAdVisible) return null;

  return (
    <View style={styles.container}>
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
    paddingVertical: SPACING.xxs,
  },
});

export default AdBanner;
