import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import useBottomWindow from '@/features/bottomWindow/hooks/useBottomWindow';
import { BottomWindowModes } from '@/features/bottomWindow/hooks/useBottomWindow/types.ts';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import useAgentsStore from '@/features/home/hooks/useAgentsStore.ts';
import AgentBar from '@/features/home/ui/AgentBar';
import CreateAgentButton from '@/features/home/ui/CreateAgentButton';
import SearchInput from '@/features/home/ui/SearchInput';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useUserStore from '@/features/profile/hooks/useUserStore.ts';
import { FilterIcon, PlusIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import ScreenLoader from '@/shared/ui/ScreenLoader';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

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
      <SafeAreaViewCustom edges={['top', 'right', 'left']} withHorizontalPadding={false} withGradientBackground>
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
          columnWrapperStyle={styles.flatListColumnWrapper}
          contentContainerStyle={styles.flatListContentContainer}
          keyExtractor={item => item.id}
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

      <CreateAgentButton style={styles.createAgentButton} />
      <ScreenLoader isLoading={isLoadingChat.selectedChat} />
    </>
  );
};

const styles = StyleSheet.create({
  searchAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.lg,
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
    marginTop: SPACING.lg,
  },
  flatListColumnWrapper: {
    gap: SPACING.lg,
  },
  flatListContentContainer: {
    gap: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  listFooterComponentContainer: {
    padding: SPACING.m,
  },
  createAgentButton: {
    position: 'absolute',
    bottom: SPACING.m,
    right: SPACING.m,
  },
});

export default HomeScreen;
