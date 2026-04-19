import { useCallback, useState } from 'react';
import * as checkVersion from 'react-native-check-version';

const useAppVersionCheck = () => {
  const [isChecking, setIsChecking] = useState(false);

  const checkUpdate = useCallback(async () => {
    setIsChecking(true);
    try {
      const version = await checkVersion.checkVersion();

      return {
        needsUpdate: !!version?.needsUpdate,
        url: version?.url || '',
      };
    } catch (error) {
      return { needsUpdate: false, url: '' };
    } finally {
      setIsChecking(false);
    }
  }, []);

  return {
    checkUpdate,
    isChecking,
  };
};

export default useAppVersionCheck;
