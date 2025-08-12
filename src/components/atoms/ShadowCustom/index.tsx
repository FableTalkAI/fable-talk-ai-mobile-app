import { Shadow } from 'react-native-shadow-2';

import { SHADOW_STYLES } from './constants.ts';
import { ShadowCustomModes, ShadowCustomProps } from './types.ts';

const ShadowCustom = ({ mode = ShadowCustomModes.None, style, containerStyle, children }: ShadowCustomProps) => {
  return (
    <Shadow {...SHADOW_STYLES[mode]} style={style} containerStyle={containerStyle}>
      {children}
    </Shadow>
  );
};

export default ShadowCustom;
