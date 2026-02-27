import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, RefreshControl, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import useAgentsStore from '@/features/agents/hooks/useAgentsStore.ts';
import { AgentAccessLevel, AgentModerationStatus } from '@/features/agents/store/agents/types.ts';
import useBottomWindow from '@/features/bottomWindow/hooks/useBottomWindow';
import { BottomWindowModes } from '@/features/bottomWindow/hooks/useBottomWindow/types.ts';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import { getAgentBarMode } from '@/features/home/services/getAgentBarMode.ts';
import AgentBar from '@/features/home/ui/AgentBar';
import CreateAgentButton from '@/features/home/ui/CreateAgentButton';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useUserStore from '@/features/profile/hooks/useUserStore.ts';
import { AddAgentIcon, FilterIcon, PlusIcon, RobotFilledIcon, SearchIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { WINDOW_WIDTH } from '@/shared/model/device.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import EmptyStub from '@/shared/ui/EmptyStub';
import PressableCustom from '@/shared/ui/PressableCustom';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import ScreenLoader from '@/shared/ui/ScreenLoader';
import TabToggle from '@/shared/ui/TabToggle';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { navigation } = useNavigationRoutes();

  const { agents, isLoading, getAgentsHandler, agentsPagination, getMyAgentsHandler, myAgents, myAgentsPagination } =
    useAgentsStore();
  const { filter } = useUserStore();
  const { open } = useBottomWindow(BottomWindowModes.SearchFilter);
  const { getChatByIdHandler, isLoading: isLoadingChat } = useChatStore();

  const [activeTab, setActiveTab] = useState(0);

  const computedStyles = StyleSheet.create({
    selectedTagsContainer: {
      backgroundColor: colors.errorDark,
    },
    text: {
      color: colors.gray10,
    },
  });

  const onEndReachedHandler =
    (hasMore: boolean, loading: boolean, handler: (loadMore?: boolean) => Promise<void>) => () => {
      if (!hasMore || loading) return;
      handler(true).catch(console.error);
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
        <TabToggle
          leftIcon={
            <PressableCustom onPress={() => navigation.navigate('SearchScreen')}>
              <SearchIcon width={30} height={30} fill={colors.primary100} />
            </PressableCustom>
          }
          rightIcon={
            <PressableCustom onPress={() => open()}>
              <FilterIcon width={24} />

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
          }
          activeTab={activeTab}
          onChange={setActiveTab}
          style={styles.tabToggle}
          tabContainerWidth={WINDOW_WIDTH - SPACING.xl * 2 - 24 - 32}
          tabs={[
            {
              icon: <RobotFilledIcon fill={colors.iconPrimary} />,
              name: t('home.all'),
              content: (
                <FlatList
                  refreshControl={
                    <RefreshControl
                      tintColor={colors.iconPrimary}
                      progressBackgroundColor={colors.iconPrimary}
                      refreshing={isLoading.agents}
                      onRefresh={getAgentsHandler}
                    />
                  }
                  style={styles.flatListContainer}
                  data={agents}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  columnWrapperStyle={styles.flatListColumnWrapper}
                  contentContainerStyle={styles.flatListContentContainer}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <AgentBar
                      mode={getAgentBarMode({
                        isPremium: item.accessLevel === AgentAccessLevel.Premium,
                        onModeration: item.moderationStatus === AgentModerationStatus.OnModeration,
                      })}
                      name={item.name}
                      description={item.description}
                      tags={item.tags}
                      avatarSource={item.avatarUrl}
                      onPress={onChatOpenHandler(item.id)}
                    />
                  )}
                  onEndReached={onEndReachedHandler(agentsPagination.hasMore, isLoading.agents, getAgentsHandler)}
                  onEndReachedThreshold={0.3}
                  ListFooterComponent={listFooterComponent}
                />
              ),
            },
            {
              icon: <AddAgentIcon fill={colors.iconPrimary} />,
              name: t('home.my'),
              content: (
                <FlatList
                  refreshControl={
                    <RefreshControl
                      tintColor={colors.iconPrimary}
                      progressBackgroundColor={colors.iconPrimary}
                      refreshing={isLoading.myAgents}
                      onRefresh={getMyAgentsHandler}
                    />
                  }
                  style={styles.flatListContainer}
                  data={myAgents}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  columnWrapperStyle={styles.flatListColumnWrapper}
                  contentContainerStyle={styles.flatListContentContainer}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <AgentBar
                      mode={getAgentBarMode({
                        isPremium: item.accessLevel === AgentAccessLevel.Premium,
                        onModeration: item.moderationStatus === AgentModerationStatus.OnModeration,
                      })}
                      name={item.name}
                      description={item.description}
                      tags={item.tags}
                      avatarSource={item.avatarUrl}
                      onPress={onChatOpenHandler(item.id)}
                    />
                  )}
                  onEndReached={onEndReachedHandler(myAgentsPagination.hasMore, isLoading.myAgents, getMyAgentsHandler)}
                  onEndReachedThreshold={0.3}
                  ListFooterComponent={listFooterComponent}
                  ListEmptyComponent={
                    <EmptyStub
                      subtitle={t('empty.myAgentsList.subtitle')}
                      title={t('empty.myAgentsList.title')}
                      icon={<RobotFilledIcon />}
                    />
                  }
                />
              ),
            },
          ]}
        />
      </SafeAreaViewCustom>

      <CreateAgentButton withArrow={!myAgents.length} style={styles.createAgentButton} />
      <ScreenLoader isLoading={isLoadingChat.selectedChat} />
    </>
  );
};

const styles = StyleSheet.create({
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
  tabToggle: {
    marginTop: SPACING.xs,
  },
  flatListContainer: {
    marginTop: SPACING.m,
  },
  flatListColumnWrapper: {
    gap: SPACING.lg,
  },
  flatListContentContainer: {
    gap: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.m,
    minHeight: '100%',
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
