import { StyleSheet, View } from 'react-native';

import { ArrowLinkIcon, SearchIcon } from '@/shared/assets/icons';
import { SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { SearchBarProps } from './types.ts';

const SearchBar = ({ title, onPress }: SearchBarProps) => {
  return (
    <PressableCustom hitSlop={5} style={styles.wrapper} onPress={onPress}>
      <View style={styles.container}>
        <SearchIcon width={12} height={12} />
        <TextCustom mode={TextModes.Secondary} style={styles.text} numberOfLines={1} text={title} />
      </View>

      <ArrowLinkIcon style={styles.arrowIcon} />
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
