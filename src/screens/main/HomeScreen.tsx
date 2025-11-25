import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { FilterIcon, PlusIcon } from '@/assets/icons/index.ts';
import PressableCustom from '@/components/atoms/PressableCustom/index.tsx';
import ScreenLoader from '@/components/atoms/ScreenLoader';
import TextCustom from '@/components/atoms/TextCustom/index.tsx';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import AgentBar from '@/components/molecules/AgentBar/index.tsx';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom/index.tsx';
import SearchInput from '@/components/molecules/SearchInput/index.tsx';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useAgentsStore from '@/hooks/useAgentsStore.ts';
import useBottomWindow from '@/hooks/useBottomWindow/index.tsx';
import { BottomWindowModes } from '@/hooks/useBottomWindow/types.ts';
import useChatStore from '@/hooks/useChatStore.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes/index.ts';
import useProfileStore from '@/hooks/useProfileStore.ts';
import useTheme from '@/hooks/useTheme.ts';
import useUserStore from '@/hooks/useUserStore.ts';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { navigation } = useNavigationRoutes();

  const { agents, isLoading, getAgentsHandler, pagination } = useAgentsStore();
  const { filter } = useUserStore();
  const { open } = useBottomWindow(BottomWindowModes.SearchFilter);
  const { getChatByIdHandler, isLoading: isLoadingChat } = useChatStore();

  const computedStyles = StyleSheet.create({
    selectedTagsContainer: {
      backgroundColor: colors.errorDark,
    },
    text: {
      color: colors.gray10,
    },
  });

  const onEndReachedHandler = () => {
    if (!pagination.hasMore || isLoading.agents) return;
    getAgentsHandler(true).catch(console.error);
  };

  const onChatOpenHandler = (agentId: string) => async () => {
    await getChatByIdHandler(agentId);
    navigation.navigate('ChatScreen');
  };

  const listFooterComponent = useMemo(() => {
    return isLoading.agents ? (
      <View style={styles.listFooterComponentContainer}>
        <ActivityIndicator size="small" />
      </View>
    ) : null;
  }, [isLoading.agents]);

  return (
    <>
      <SafeAreaViewCustom withGradientBackground>
        <View style={styles.searchAndIconContainer}>
          <PressableCustom onPress={() => navigation.navigate('SearchScreen')} containerStyle={styles.search}>
            <SearchInput placeholder={t('home.searchInput')} isDisabled onStop={() => null} />
          </PressableCustom>

          <PressableCustom onPress={open}>
            <FilterIcon />

            {!!filter.tags.length && (
              <View style={[computedStyles.selectedTagsContainer, styles.selectedTagsContainer]}>
                <TextCustom
                  text={filter.tags.length > 9 ? 9 : filter.tags.length}
                  mode={TextModes.ExtraSmall}
                  style={computedStyles.text}
                />

                {filter.tags.length > 9 && <PlusIcon style={styles.plusIcon} />}
              </View>
            )}
          </PressableCustom>
        </View>

        <FlatList
          style={styles.flatListContainer}
          data={agents}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.flatListContentContainer}
          contentContainerStyle={styles.flatListContentContainer}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <AgentBar
              name={item.name}
              description={item.description}
              tags={item.tags}
              avatarSource={item.avatarUrl}
              onPress={onChatOpenHandler(item.id)}
            />
          )}
          onEndReached={onEndReachedHandler}
          onEndReachedThreshold={0.3}
          ListFooterComponent={listFooterComponent}
        />
      </SafeAreaViewCustom>

      <ScreenLoader isLoading={isLoadingChat.selectedChat} />
    </>
  );
};

const styles = StyleSheet.create({
  searchAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  search: {
    flex: 1,
  },
  selectedTagsContainer: {
    position: 'absolute',
    right: -8,
    top: -8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.circle,
    width: 18,
    height: 18,
  },
  plusIcon: {
    position: 'absolute',
    top: 3,
    right: 2,
  },
  flatListContainer: {
    marginTop: SPACING.xl,
  },
  flatListContentContainer: {
    gap: SPACING.lg,
  },
  listFooterComponentContainer: {
    padding: SPACING.m,
  },
});

export default HomeScreen;
