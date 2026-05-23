import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import useAgentsStore from '@/features/agents/hooks/useAgentsStore.ts';
import { AgentAccessLevel } from '@/features/agents/store/agents/types.ts';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import SearchBar from '@/features/home/ui/SearchBar';
import SearchInput from '@/features/home/ui/SearchInput';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import { RobotIcon } from '@/shared/assets/icons';
import { SPACING } from '@/shared/model/sizes.ts';
import EmptyStub from '@/shared/ui/EmptyStub';
import KeyboardAvoidingViewCustom from '@/shared/ui/KeyboardAvoidingViewCustom';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import SearchResultsSkeleton from '@/shared/ui/Skeleton/templates/SearchResultsSkeleton.tsx';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

const SearchScreen = () => {
  const inputRef = useRef<TextInput>(null);

  const { t } = useTranslation();
  const { navigation } = useNavigationRoutes();
  const { getSearchResultsHandler, searchResults, popularAgents, clearSearchResultsHandler, isLoading } =
    useAgentsStore();
  const { getChatByIdHandler } = useChatStore();

  const [searchValueLength, setSearchValueLength] = useState(0);

  const onStopHandler = useCallback(
    async (value: string) => {
      setSearchValueLength(value.length);
      await getSearchResultsHandler(value);
    },
    [getSearchResultsHandler],
  );

  const onChatOpenHandler = useCallback(
    (agentId: string) => () => {
      getChatByIdHandler(agentId).catch(console.error);
      navigation.navigate('Chat');
    },
    [getChatByIdHandler, navigation],
  );

  useEffect(() => {
    return () => {
      Keyboard.dismiss();
      clearSearchResultsHandler();
    };
  }, [clearSearchResultsHandler]);

  const content = useMemo(() => {
    if (isLoading.searchResults) {
      return <SearchResultsSkeleton />;
    }

    return (
      <FlatList
        ListHeaderComponent={
          searchValueLength ? null : (
            <View>
              <TextCustom mode={TextModes.Subtitle} text={'Trending Agents'} />
            </View>
          )
        }
        data={searchValueLength ? searchResults : popularAgents}
        scrollEnabled={false}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <SearchBar
            isTrending={!searchValueLength}
            isPremiumAgent={item.accessLevel === AgentAccessLevel.Premium}
            title={item.name}
            onPress={onChatOpenHandler(item.id)}
          />
        )}
        ListEmptyComponent={
          <EmptyStub
            icon={<RobotIcon />}
            title={t('empty.agentSearch.title')}
            subtitle={t('empty.agentSearch.subtitle')}
          />
        }
      />
    );
  }, [isLoading.searchResults, onChatOpenHandler, popularAgents, searchResults, searchValueLength, t]);

  return (
    <SafeAreaViewCustom>
      <SearchInput
        placeholder={t('search.placeholder')}
        autoFocus
        ref={inputRef}
        navigation={navigation}
        onStop={onStopHandler}
      />

      <KeyboardAvoidingViewCustom>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          key={+isLoading.searchResults}
          style={styles.animatedViewContainer}
        >
          {content}
        </Animated.View>
      </KeyboardAvoidingViewCustom>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  animatedViewContainer: {
    flex: 1,
  },
  flatList: {
    marginTop: SPACING.m,
  },
  flatListContainer: {
    gap: SPACING.m,
    flex: 1,
  },
});

export default SearchScreen;
