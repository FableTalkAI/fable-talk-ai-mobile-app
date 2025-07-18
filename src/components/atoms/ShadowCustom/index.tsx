import { Shadow } from 'react-native-shadow-2';
import { SHADOW_STYLES } from '@/components/atoms/ShadowCustom/constants.ts';
import { ShadowCustomProps } from '@/components/atoms/ShadowCustom/types.ts';

const ShadowCustom = ({ mode = 'none', style, children }: ShadowCustomProps) => {
  return (
    <Shadow {...SHADOW_STYLES[mode]} style={style}>
      {children}
    </Shadow>
  );
};

export default ShadowCustom;
