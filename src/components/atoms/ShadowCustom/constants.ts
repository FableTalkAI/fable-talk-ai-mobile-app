import { ShadowCustomModes } from '@/components/atoms/ShadowCustom/types.ts';
import { ShadowProps } from 'react-native-shadow-2';

const SHADOW_STYLES: Record<ShadowCustomModes, ShadowProps> = {
  none: {
    disabled: true,
  },
  light: {
    distance: 3,
    startColor: 'rgba(0,0,0,0.10)',
    endColor: 'rgba(0,0,0,0)',
  },
  medium: {
    distance: 8,
    startColor: 'rgba(0,0,0,0.15)',
    endColor: 'rgba(0,0,0,0)',
  },
  strong: {
    distance: 16,
    startColor: 'rgba(0,0,0,0.20)',
    endColor: 'rgba(0,0,0,0)',
  },
};

export { SHADOW_STYLES };
