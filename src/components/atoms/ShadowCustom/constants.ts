import { ShadowCustomModes } from '@/components/atoms/ShadowCustom/types.ts';
import { ShadowProps } from 'react-native-shadow-2';

const SHADOW_STYLES: Record<ShadowCustomModes, ShadowProps> = {
  none: {
    disabled: true,
  },
  light: {
    distance: 4,
    startColor: '#00000019',
    endColor: '#00000000',
  },
  medium: {
    distance: 8,
    startColor: '#00000026',
    endColor: '#00000000',
  },
  strong: {
    distance: 16,
    startColor: '#00000033',
    endColor: '#00000000',
  },
};

export { SHADOW_STYLES };
