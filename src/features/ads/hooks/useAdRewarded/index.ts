import { useCallback, useEffect } from 'react';
import { useRewardedAd } from 'react-native-google-mobile-ads';

import { AD_UNITS } from '@/features/ads/model/constants.ts';

import { UseAdRewardedProps } from './types.ts';

const useAdRewarded = ({ onRewardEarned }: UseAdRewardedProps) => {
  const { isLoaded, isEarnedReward, reward, load, show } = useRewardedAd(AD_UNITS.REWARDED, {
    requestNonPersonalizedAdsOnly: false,
  });

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isEarnedReward && reward) {
      onRewardEarned({
        amount: reward.amount,
        type: reward.type,
      });
    }
  }, [isEarnedReward, reward, onRewardEarned]);

  const showRewardedAd = useCallback(() => {
    if (isLoaded) {
      show();
    } else {
      console.error('Failed to show rewarded ad: ad is not loaded');
      load();
    }
  }, [isLoaded, show, load]);

  return {
    isAdReady: isLoaded,
    showRewardedAd,
    reloadAd: load,
  };
};

export default useAdRewarded;
