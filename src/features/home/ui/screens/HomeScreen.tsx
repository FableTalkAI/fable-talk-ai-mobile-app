import { RouteProp, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import useAgentsStore from '@/features/agents/hooks/useAgentsStore.ts';
import AgentList from '@/features/home/ui/AgentList/AgentList.tsx';
import CreateAgentButton from '@/features/home/ui/CreateAgentButton';
import SearchFilterBottomWindow from '@/features/home/ui/SearchFilterBottomWindow';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import { TabBarNavigatorParamList } from '@/features/navigation/ui/TabBarNavigator/types.ts';
import useBottomWindow from '@/features/overlay/hooks/useBottomWindow';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import useUserStore from '@/features/profile/hooks/useUserStore.ts';
import { AddAgentIcon, FilterIcon, PlusIcon, RobotFilledIcon, SearchIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { WINDOW_WIDTH } from '@/shared/model/device.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import EmptyStub from '@/shared/ui/EmptyStub';
import PressableCustom from '@/shared/ui/PressableCustom';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import TabToggle from '@/shared/ui/TabToggle';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { navigation } = useNavigationRoutes();
  const route = useRoute<RouteProp<TabBarNavigatorParamList, 'Home'>>();

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
  const { profile } = useProfileStore();
  const { open } = useBottomWindow();

  const [activeTab, setActiveTab] = useState(route.params?.tabIndex || 0);

  const openSearchFilterBottomWindow = () => {
    open(close => <SearchFilterBottomWindow close={close} />);
  };

  const computedStyles = StyleSheet.create({
    selectedTagsContainer: {
      backgroundColor: colors.errorDark,
    },
    text: {
      color: colors.gray10,
    },
  });

  return (
    <>
      <SafeAreaViewCustom withBottomPadding={false} withHorizontalPadding={false} withGradientBackground>
        <TabToggle
          leftIcon={
            <PressableCustom onPress={() => navigation.navigate('SearchScreen')}>
              <SearchIcon width={30} height={30} fill={colors.primary100} />
            </PressableCustom>
          }
          rightIcon={
            <PressableCustom needsOffscreenAlphaCompositing={false} onPress={openSearchFilterBottomWindow}>
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
          tabContainerWidth={WINDOW_WIDTH - SPACING.xl * 2 - 24 - 32}
          tabs={[
            {
              icon: <RobotFilledIcon fill={colors.iconPrimary} />,
              name: t('home.all'),
              content: (
                <AgentList
                  data={[...agents, ...agents]}
                  isLoading={isLoading.agents}
                  isRefreshing={isRefreshingAgents}
                  hasMore={agentsPagination.hasMore}
                  onRefresh={getAgentsHandler}
                  onLoadMore={getAgentsHandler}
                  ListEmptyComponent={
                    <EmptyStub
                      subtitle={t('empty.allAgentsList.subtitle')}
                      title={t('empty.allAgentsList.title')}
                      icon={<RobotFilledIcon />}
                    />
                  }
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
        withArrow={!profile?.isCreatedAgent && activeTab === 1}
        style={styles.createAgentButton}
        hasModerationLimit={hasModerationLimit}
      />
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
  createAgentButton: {
    position: 'absolute',
    bottom: SPACING.m,
    right: SPACING.m,
  },
});

export default HomeScreen;
