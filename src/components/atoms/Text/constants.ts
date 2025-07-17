import { TextStyle } from 'react-native';
import { TextModes } from '@/components/atoms/Text/types.ts';

const TEXT_STYLES: Record<TextModes, TextStyle> = {
  base: {
    fontSize: 12,
    lineHeight: 24,
    fontWeight: 400,
  },
  'extra-small': {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: 400,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 600,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 500,
  },
  secondary: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 400,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 400,
  },
  tag: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 500,
  },
  xxl: {
    fontSize: 48,
    lineHeight: 52,
    fontWeight: 700,
  },
};

export { TEXT_STYLES };
