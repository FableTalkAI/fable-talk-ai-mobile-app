import { useMemo, useState } from 'react';
import Purchases, { PurchasesPackage } from 'react-native-purchases';

import { customerInfoSelector, packagesSelector } from '@/features/subscriptions/store/subscriptions/selectors.ts';
import { useAppSelector } from '@/shared/hooks/reduxHooks.ts';

const useSubscription = () => {
  const packages = useAppSelector(packagesSelector);
  const customerInfo = useAppSelector(customerInfoSelector);

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

  const restorePurchases = async () => {
    try {
      await Purchases.restorePurchases();
    } catch (e) {
      console.error('Restore error:', e);
    }
  };

  return {
    isPremium,
    isLoading,
    packages,
    discount,

    subscribe,
    restorePurchases,
  };
};

export default useSubscription;
