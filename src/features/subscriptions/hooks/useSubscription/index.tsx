import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Purchases, { PurchasesPackage } from 'react-native-purchases';

import useModal from '@/features/overlay/hooks/useModal.ts';
import { showToast } from '@/features/overlay/services/showToast.ts';
import { customerInfoSelector, packagesSelector } from '@/features/subscriptions/store/subscriptions/selectors.ts';
import PremiumModal from '@/features/subscriptions/ui/PremiumModal';
import { useAppSelector } from '@/shared/hooks/reduxHooks.ts';

import { CheckPremiumHandlerParams } from './types.ts';

const useSubscription = () => {
  const { t } = useTranslation();

  const packages = useAppSelector(packagesSelector);
  const customerInfo = useAppSelector(customerInfoSelector);

  const { openModal } = useModal();

  const [isLoading, setIsLoading] = useState(false);

  const isPremium = !!customerInfo?.activeSubscriptions.length;
  const discount = useMemo(() => {
    if (packages.length <= 1) return null;

    const prices = packages.map(p => ({
      identifier: p.identifier,
      monthlyPrice: p.product.pricePerMonth || 0,
    }));
    const baseRate = Math.max(...prices.map(p => p.monthlyPrice));

    if (baseRate <= 0) return null;

    const cheapest = prices.reduce((min, curr) => (curr.monthlyPrice < min.monthlyPrice ? curr : min));
    const discountValue = Math.round((1 - cheapest.monthlyPrice / baseRate) * 100);

    return discountValue > 0 ? { identifier: cheapest.identifier, value: discountValue } : null;
  }, [packages]);

  const subscribe = async (pack: PurchasesPackage) => {
    setIsLoading(true);
    try {
      await Purchases.purchasePackage(pack);
    } catch (e: any) {
      console.error('Purchase error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const restorePurchase = async () => {
    try {
      await Purchases.restorePurchases();
      showToast({
        type: 'success',
        text2: t('subscription.successfullyRestored'),
      });
    } catch (e) {
      console.error('Restore error:', e);
      showToast({
        type: 'error',
        text2: t('subscription.failedRestored'),
      });
    }
  };

  const showPremiumModal = useCallback(
    (modalTitleKey: string, withAds: boolean = false) => {
      openModal(<PremiumModal withAds={withAds} titleKey={modalTitleKey} />);
    },
    [openModal],
  );

  const checkPremiumHandler = useCallback(
    async ({ func, withAds, modalTitleKey, skipCheck }: CheckPremiumHandlerParams) => {
      if (isPremium || skipCheck) {
        try {
          await func();
        } catch (error: any) {
          if (error?.messageKey === 'limitExceeded') {
            openModal(<PremiumModal withAds={withAds} titleKey="limitExceeded" />);
          }
        }
        return;
      }

      showPremiumModal(modalTitleKey, withAds);
    },
    [isPremium, openModal, showPremiumModal],
  );

  return {
    isPremium,
    isLoading,
    packages,
    discount,

    subscribe,
    restorePurchase,
    checkPremiumHandler,
    showPremiumModal,
  };
};

export default useSubscription;
