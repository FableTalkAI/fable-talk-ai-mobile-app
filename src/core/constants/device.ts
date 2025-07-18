import { Dimensions, Platform } from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const IS_ANDROID = Platform.OS === 'android';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export { IS_IOS, IS_ANDROID, WINDOW_WIDTH, WINDOW_HEIGHT };
