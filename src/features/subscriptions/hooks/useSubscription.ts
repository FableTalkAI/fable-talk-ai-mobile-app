import { useEffect } from 'react';
import Purchases from 'react-native-purchases';

const useSubscription = () => {
  useEffect(() => {
    Purchases.getOfferings().then(info => {
      console.log(info);
    });
  }, []);

  return {};
};

export default useSubscription;
