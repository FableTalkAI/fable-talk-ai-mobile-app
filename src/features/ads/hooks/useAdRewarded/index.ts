import { useCallback, useEffect, useRef } from 'react';
import { useRewardedAd } from 'react-native-google-mobile-ads';

import { AD_UNITS } from '@/features/ads/model/constants.ts';

import { UseAdRewardedProps } from './types.ts';

const useAdRewarded = ({ onRewardEarned, onClosed }: UseAdRewardedProps) => {
  const rewardHandledRef = useRef(true);
  const loadedRef = useRef(false);

  const { isLoaded, isEarnedReward, load, show, isClosed } = useRewardedAd(AD_UNITS.REWARDED, {
    requestNonPersonalizedAdsOnly: false,
  });

  useEffect(() => {
    loadedRef.current = isLoaded;
  }, [isLoaded]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isEarnedReward && !rewardHandledRef.current) {
      rewardHandledRef.current = true;
      onRewardEarned?.();
    }
  }, [isEarnedReward, onRewardEarned]);

  useEffect(() => {
    if (isClosed && rewardHandledRef.current) {
      onClosed?.();
    }
  }, [isClosed, onClosed]);

  const showRewardedAd = useCallback(() => {
    if (loadedRef.current) {
      rewardHandledRef.current = false;
      show();
      return;
    }

    load();
  }, [show, load]);

  return {
    isAdReady: loadedRef.current,
    showRewardedAd,
    reloadAd: load,
  };
};

export default useAdRewarded;
