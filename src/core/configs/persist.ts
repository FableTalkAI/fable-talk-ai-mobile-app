import AsyncStorage from '@react-native-async-storage/async-storage';

import { ReducersKeys } from '@/core/redux/types.ts';

const whitelist: ReducersKeys[] = ['user'];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist,
};

export default persistConfig;
