import AsyncStorage from '@react-native-async-storage/async-storage';

import { ReducersKeys } from '../../../app/store/types.ts';

const whitelist: ReducersKeys[] = ['user', 'customization'];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist,
};

export default persistConfig;
