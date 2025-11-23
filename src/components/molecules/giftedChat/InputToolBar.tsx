import { StyleSheet, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import { InputToolbar as GiftedChatInputToolBar } from 'react-native-gifted-chat';
import Animated, { FadeIn } from 'react-native-reanimated';

import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { InputToolbarProps } from './types.ts';

const InputToolbar = ({ messageLoading, ...props }: InputToolbarProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    loadingContainer: {
      backgroundColor: colors.gray70,
    },
  });

  return (
    <View>
      {messageLoading && (
        <Animated.View entering={FadeIn} style={[styles.loadingContainer, computedStyles.loadingContainer]}>
          <Flow size={36} color="#fff" />
        </Animated.View>
      )}

      <GiftedChatInputToolBar {...props} containerStyle={styles.inputToolbar} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputToolbar: {
    borderTopWidth: 0,
  },
  loadingContainer: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: RADIUS.small,
    marginLeft: SPACING.m + 32,
    width: 68,
  },
});

export default InputToolbar;
