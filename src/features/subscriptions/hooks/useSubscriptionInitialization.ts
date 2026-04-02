import { useEffect } from 'react';
import Purchases from 'react-native-purchases';

import { IS_IOS } from '@/shared/model/device.ts';

const useSubscriptionInitialization = () => {
  useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);

    if (IS_IOS) {
      Purchases.configure({ apiKey: 'appl_bAYQuLrKcpXzukxnxBqjJuMDeXa' });
    } else {
      Purchases.configure({ apiKey: 'goog_QYhkUeYjuampyvfMebfmyDxlgkB' });
    }
  }, []);
};

export default useSubscriptionInitialization;
