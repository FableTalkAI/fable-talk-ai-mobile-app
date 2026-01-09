import { Dimensions, Platform } from 'react-native';

import { getDeviceLanguage } from '@/shared/lib/device.ts';

const IS_IOS = Platform.OS === 'ios';
const IS_ANDROID = Platform.OS === 'android';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const DEVICE_LANGUAGE = getDeviceLanguage();

export { DEVICE_LANGUAGE, IS_ANDROID, IS_IOS, WINDOW_HEIGHT, WINDOW_WIDTH };
