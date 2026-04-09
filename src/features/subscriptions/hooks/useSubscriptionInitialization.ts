import { useEffect, useState } from 'react';
import Purchases, { CustomerInfo } from 'react-native-purchases';

import { setCustomerInfo, setPackages } from '@/features/subscriptions/store/subscriptions';
import { useAppDispatch } from '@/shared/hooks/reduxHooks.ts';
import { IS_IOS } from '@/shared/model/device.ts';

const useSubscriptionInitialization = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);

    if (IS_IOS) {
      Purchases.configure({ apiKey: 'appl_bAYQuLrKcpXzukxnxBqjJuMDeXa' });
    } else {
      Purchases.configure({ apiKey: 'goog_QYhkUeYjuampyvfMebfmyDxlgkB' });
    }

    const initializeData = async () => {
      try {
        const [offerings, customerInfo] = await Promise.all([Purchases.getOfferings(), Purchases.getCustomerInfo()]);

        if (offerings.current?.availablePackages.length) {
          dispatch(setPackages(offerings.current.availablePackages));
        }

        dispatch(setCustomerInfo(customerInfo));
      } catch (e) {
        console.error('RevenueCat initialization failed:', e);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData().catch(console.error);

    const customerInfoListener = (info: CustomerInfo) => {
      dispatch(setCustomerInfo(info));
    };

    Purchases.addCustomerInfoUpdateListener(customerInfoListener);
  }, [dispatch]);

  return { isLoading };
};

export default useSubscriptionInitialization;
