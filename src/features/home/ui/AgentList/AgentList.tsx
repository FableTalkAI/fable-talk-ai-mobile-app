import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import { AgentAccessLevel, AgentModerationStatus } from '@/features/agents/store/agents/types.ts';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import { getAgentBarMode } from '@/features/home/services/getAgentBarMode.ts';
import AgentBar from '@/features/home/ui/AgentBar';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useTheme from '@/shared/hooks/useTheme.ts';
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
  const { colors } = useTheme();
  const { navigation } = useNavigationRoutes();

  const { getChatByIdHandler } = useChatStore();

  const onEndReached = () => {
    if (!hasMore || isLoading) return;
    onLoadMore(true).catch(console.error);
  };

  const onChatOpenHandler = (agentId: string, moderationStatus: AgentModerationStatus) => async () => {
    if (moderationStatus === 'rejected') {
      return navigation.navigate('CreateAgent', { id: agentId });
    }

    await getChatByIdHandler(agentId);
    navigation.navigate('ChatScreen');
  };

  const renderFooter = () => {
    if (isLoading && hasMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color={colors.iconPrimary} />
        </View>
      );
    }
    return null;
  };

  return (
    <FlatList
      style={styles.container}
      data={data}
      numColumns={2}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={ListEmptyComponent}
      refreshControl={
        <RefreshControl
          tintColor={colors.iconPrimary}
          progressBackgroundColor={colors.iconPrimary}
          refreshing={isRefreshing}
          onRefresh={() => onRefresh()}
        />
      }
      renderItem={({ item }) => (
        <AgentBar
          mode={getAgentBarMode({
            isPremium: item.accessLevel === AgentAccessLevel.Premium,
            moderationStatus: item.moderationStatus,
          })}
          name={item.name}
          description={item.description}
          tags={item.tags}
          avatarSource={item.avatarUrl}
          onPress={onChatOpenHandler(item.id, item.moderationStatus)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.m,
  },
  columnWrapper: {
    gap: SPACING.lg,
  },
  contentContainer: {
    gap: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.m,
    minHeight: '100%',
  },
  footer: {
    padding: SPACING.m,
  },
});

export default AgentList;
