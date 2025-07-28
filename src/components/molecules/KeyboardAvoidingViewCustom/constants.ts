import { IS_IOS } from '@/core/constants/device.ts';

import { Options } from './types.ts';

const OPTIONS: Options = {
  behavior: IS_IOS ? 'padding' : 'height',
  keyboardVerticalOffset: IS_IOS ? 20 : 30,
};

export { OPTIONS };
