import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ArrowLinkIcon, PremiumAgentIcon, RedFireIcon, SearchIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme';
import { SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';

import { SearchBarProps } from './types.ts';

const SearchBar = ({ title, onPress, isPremiumAgent, isTrending }: SearchBarProps) => {
  const { colors } = useTheme();

  const renderIcon = useMemo(() => {
    if (isTrending) return <RedFireIcon />;
    if (isPremiumAgent) return <PremiumAgentIcon fill={colors.premium} width={16} height={16} />;
    return <SearchIcon width={16} height={16} />;
  }, [colors.premium, isPremiumAgent, isTrending]);

  return (
    <PressableCustom hitSlop={5} style={styles.wrapper} onPress={onPress}>
      <View style={styles.container}>
        {renderIcon}

        <TextCustom style={styles.text} numberOfLines={1} text={title} />
      </View>

      <ArrowLinkIcon
        fill={isPremiumAgent ? colors.premium : colors.textSecondary}
        style={styles.arrowIcon}
        width={10}
        height={10}
      />
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  text: {
    flexShrink: 1,
    marginBottom: 2,
  },
  arrowIcon: {
    marginLeft: SPACING.xxs,
  },
});

export default SearchBar;
