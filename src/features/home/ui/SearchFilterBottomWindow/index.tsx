import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import useAgentsStore from '@/features/agents/hooks/useAgentsStore.ts';
import TagsSelector from '@/features/home/ui/TagsSelector';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import useUserStore from '@/features/profile/hooks/useUserStore.ts';
import { SortByFilter, SortFilter } from '@/features/profile/store/user/types.ts';
import { SortAscendingIcon, SortDescendingIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme';
import { SCREEN_WIDTH } from '@/shared/model/constants.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import Button from '@/shared/ui/Button';
import { ButtonModes } from '@/shared/ui/Button/types.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import Select from '@/shared/ui/Select';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { SearchFilterBottomWindowProps } from './types.ts';

const SearchFilterBottomWindow = ({ close }: SearchFilterBottomWindowProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { getAgentsHandler, getMyAgentsHandler } = useAgentsStore();
  const { profile } = useProfileStore();
  const { filter, setFilterSortByHandler, setFilterSortHandler, setFilterTagsHandler, clearFilterHandler } =
    useUserStore();

  const [selectedTags, setSelectedTags] = useState(filter.tags);

  const selectOptions = useMemo(
    () =>
      (Object.keys(SortByFilter) as Array<keyof typeof SortByFilter>).map(option => ({
        value: SortByFilter[option],
        title: t(`common.${SortByFilter[option]}`),
      })),
    [t],
  );

  const getAgents = () => {
    getAgentsHandler().catch(console.error);
    if (profile?.isCreatedAgent) getMyAgentsHandler().catch(console.error);
    close();
  };

  const onApply = () => {
    setFilterTagsHandler(selectedTags);
    getAgents();
  };

  const onClear = () => {
    clearFilterHandler();
    getAgents();
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <TextCustom style={styles.title} text={t('bottomWindows.searchFilter.sort')} mode={TextModes.Subtitle} />

        <View style={styles.sortContainer}>
          <Select
            options={selectOptions}
            width={SCREEN_WIDTH - SPACING.lg - 20 - SPACING.xl}
            defaultValue={filter.sortBy}
            onChange={setFilterSortByHandler}
          />

          <PressableCustom
            onPress={() => setFilterSortHandler(filter.sort === SortFilter.ASC ? SortFilter.DESC : SortFilter.ASC)}
            hitSlop={5}
          >
            <Animated.View exiting={FadeOut} entering={FadeIn} key={`sort-ascending-${filter.sort}`}>
              {filter.sort === SortFilter.ASC ? (
                <SortAscendingIcon fill={colors.iconPrimary} />
              ) : (
                <SortDescendingIcon fill={colors.iconPrimary} />
              )}
            </Animated.View>
          </PressableCustom>
        </View>
      </View>

      <View>
        <TextCustom style={styles.title} text={t('bottomWindows.searchFilter.filter')} mode={TextModes.Subtitle} />
        <TagsSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title={t('actions.clear')}
          mode={ButtonModes.Ghost}
          containerStyle={styles.buttonContainer}
          onPress={onClear}
        />
        <Button
          title={t('actions.apply')}
          mode={ButtonModes.Success}
          containerStyle={styles.buttonContainer}
          onPress={onApply}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: SPACING.m,
  },
  sortContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    flex: 1,
    gap: SPACING.xs,
  },
  buttonContainer: {
    paddingTop: SPACING.lg,
    flex: 1,
  },
  title: {
    marginBottom: SPACING.xs,
  },
});

export default SearchFilterBottomWindow;
