import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import useAgentsStore from '@/features/agents/hooks/useAgentsStore.ts';
import useBottomWindow from '@/features/bottomWindow/hooks/useBottomWindow';
import { BottomWindowModes } from '@/features/bottomWindow/hooks/useBottomWindow/types.ts';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import AgentList from '@/features/home/ui/AgentList/AgentList.tsx';
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

  const {
    agents,
    isLoading,
    getAgentsHandler,
    agentsPagination,
    getMyAgentsHandler,
    myAgents,
    myAgentsPagination,
    isRefreshingAgents,
    isRefreshingMyAgents,
    hasModerationLimit,
  } = useAgentsStore();

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

  const onChatOpenHandler = (agentId: string) => async () => {
    await getChatByIdHandler(agentId);
    navigation.navigate('ChatScreen');
  };

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
                <AgentList
                  data={agents}
                  isLoading={isLoading.agents}
                  isRefreshing={isRefreshingAgents}
                  hasMore={agentsPagination.hasMore}
                  onRefresh={getAgentsHandler}
                  onLoadMore={getAgentsHandler}
                  onAgentPress={onChatOpenHandler}
                />
              ),
            },
            {
              icon: <AddAgentIcon fill={colors.iconPrimary} />,
              name: t('home.my'),
              content: (
                <AgentList
                  data={myAgents}
                  isLoading={isLoading.myAgents}
                  isRefreshing={isRefreshingMyAgents}
                  hasMore={myAgentsPagination.hasMore}
                  onRefresh={getMyAgentsHandler}
                  onLoadMore={getMyAgentsHandler}
                  onAgentPress={onChatOpenHandler}
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

      <CreateAgentButton
        withArrow={!myAgents.length}
        style={styles.createAgentButton}
        hasModerationLimit={hasModerationLimit}
      />
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
  createAgentButton: {
    position: 'absolute',
    bottom: SPACING.m,
    right: SPACING.m,
  },
});

export default HomeScreen;
