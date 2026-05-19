import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { ActivityIndicator, FlexAlignType, RefreshControl, StyleSheet, View } from 'react-native';

import { AgentAccessLevel, AgentModerationStatus } from '@/features/agents/store/agents/types.ts';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import { getAgentBarMode } from '@/features/home/services/getAgentBarMode.ts';
import AgentBar from '@/features/home/ui/AgentBar';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useSubscription from '@/features/subscriptions/hooks/useSubscription';
import useTheme from '@/shared/hooks/useTheme';
import { SCREEN_WIDTH } from '@/shared/model/constants.ts';
import { SPACING } from '@/shared/model/sizes.ts';

import { AgentListProps } from './types.ts';

const AgentList = ({
  data,
  isLoading,
  isRefreshing,
  hasMore,
  onRefresh,
  onLoadMore,
  ListEmptyComponent,
}: AgentListProps) => {
  const { colors, getInvertedColor } = useTheme();
  const { navigation } = useNavigationRoutes();
  const { checkPremiumHandler } = useSubscription();

  const { getChatByIdHandler } = useChatStore();

  const computedStyles = StyleSheet.create({
    agentBarWrapper: {
      width: (SCREEN_WIDTH - SPACING.xl * 2 - SPACING.m) / 2,
    },
  });

  const getAgentBarAlignSelf = (index: number): { alignSelf: FlexAlignType } => ({
    alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
  });

  const onEndReached = () => {
    if (!hasMore || isLoading || !data.length) return;
    onLoadMore?.(true).catch(console.error);
  };

  const onChatOpenHandler = useCallback(
    (agentId: string, moderationStatus: AgentModerationStatus, isPremiumAgent: boolean) => async () => {
      await checkPremiumHandler({
        skipCheck: !isPremiumAgent,
        modalTitleKey: 'openPremiumAgent',
        func: async () => {
          if (moderationStatus === 'rejected') {
            return navigation.navigate('CreateAgent', { id: agentId });
          }

          getChatByIdHandler(agentId).catch(console.error);
          navigation.navigate('Chat');
        },
      });
    },
    [checkPremiumHandler, getChatByIdHandler, navigation],
  );

  const renderFooter = () => {
    if (isLoading && hasMore && data.length) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color={colors.iconPrimary} />
        </View>
      );
    }
    return null;
  };

  return (
    <FlashList
      style={styles.container}
      data={data}
      numColumns={2}
      drawDistance={500}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={ListEmptyComponent}
      refreshControl={
        <RefreshControl
          tintColor={colors.iconPrimary}
          progressBackgroundColor={colors.iconPrimary}
          colors={[getInvertedColor('iconPrimary')]}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
      renderItem={({ item, index }) => (
        <AgentBar
          mode={getAgentBarMode({
            isPremium: item.accessLevel === AgentAccessLevel.Premium,
            moderationStatus: item.moderationStatus,
          })}
          name={item.name}
          description={item.description}
          tags={item.tags}
          avatarSource={item.avatarUrl}
          onPress={onChatOpenHandler(item.id, item.moderationStatus, item.accessLevel === AgentAccessLevel.Premium)}
          wrapperStyle={[styles.agentBarWrapper, computedStyles.agentBarWrapper, getAgentBarAlignSelf(index)]}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.xs,
  },
  agentBarWrapper: {
    marginBottom: SPACING.m,
  },
  contentContainer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.m,
    minHeight: '100%',
  },
  footer: {
    padding: SPACING.m,
  },
});

export default AgentList;
