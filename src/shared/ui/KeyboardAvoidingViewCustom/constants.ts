import { IS_IOS } from '@/shared/model/device.ts';
import { SPACING } from '@/shared/model/sizes.ts';

import { Options } from './types.ts';

const OPTIONS: Options = {
  behavior: IS_IOS ? 'padding' : 'height',
  contentInset: {
    bottom: SPACING.lg,
  },
};

export { OPTIONS };
