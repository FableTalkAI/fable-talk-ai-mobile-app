import { useCallback, useEffect, useRef } from 'react';
import { useRewardedAd } from 'react-native-google-mobile-ads';

import { AD_UNITS } from '@/features/ads/model/constants.ts';

import { UseAdRewardedProps } from './types.ts';

const useAdRewarded = ({ onRewardEarned, onClosed }: UseAdRewardedProps) => {
  const rewardHandledRef = useRef(true);
  const loadedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);

  const { isLoaded, isEarnedReward, load, show, isClosed } = useRewardedAd(AD_UNITS.REWARDED, {
    requestNonPersonalizedAdsOnly: false,
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
      retryCountRef.current = 0;
      show();
      return;
    }

    if (retryCountRef.current < 10) {
      retryCountRef.current += 1;

      if (retryCountRef.current === 1) {
        load();
      }

      timeoutRef.current = setTimeout(() => {
        showRewardedAd();
      }, 500);
    } else {
      retryCountRef.current = 0;
      console.warn('Rewarded ad failed to load within timeout');
    }
  }, [show, load]);

  return {
    isAdReady: loadedRef.current,
    showRewardedAd,
    reloadAd: load,
  };
};

export default useAdRewarded;
