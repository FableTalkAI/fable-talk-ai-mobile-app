import { Tooltip } from '@/features/overlay/ui/Tooltip';
import { InfoIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme';

import { InfoTooltipProps } from './types.ts';

const InfoTooltip = ({ text, style }: InfoTooltipProps) => {
  const { colors } = useTheme();

  return (
    <Tooltip style={style} content={text}>
      <InfoIcon fill={colors.gray40} width={14} height={14} />
    </Tooltip>
  );
};

export default InfoTooltip;
