import { ShadowProps } from 'react-native-shadow-2';

import { ShadowCustomModes } from '@/components/atoms/ShadowCustom/types.ts';

const SHADOW_STYLES: Record<ShadowCustomModes, ShadowProps> = {
  none: {
    disabled: true,
  },
  base: {
    distance: 3,
    startColor: '#00000005',
    offset: [2, 2],
  },
  medium: {
    distance: 12,
    startColor: '#00000005',
    offset: [2, 2],
  },
  alt: {
    distance: 24,
    startColor: '#0000000A',
    offset: [2, 2],
  },
};

export { SHADOW_STYLES };
