import Toast from 'react-native-toast-message';

import { ShowToastParams } from '../model/types.ts';

export const showToast = (params: ShowToastParams) => {
  Toast.show({
    ...params,
  });
};
