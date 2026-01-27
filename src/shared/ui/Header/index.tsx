import { StyleSheet, View } from 'react-native';

import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import { ArrowForwardIcon, TrashBinIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { HeaderProps } from './types.ts';

const Header = ({ title, onPress, style, withDeleteIcon, chatId }: HeaderProps) => {
  const { navigation } = useNavigationRoutes();
  const { colors } = useTheme();
  const { deleteChatHandler } = useChatStore();

  const deleteChatButtonHandler = async (selectedChatId: string) => {
    await deleteChatHandler([selectedChatId]);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, style]}>
      <PressableCustom
        containerStyle={[styles.side, styles.leftSide]}
        onPress={onPress ?? navigation.goBack}
        hitSlop={10}
      >
        <ArrowForwardIcon fill={colors.iconPrimary} />
      </PressableCustom>

      <View style={styles.center}>{title && <TextCustom text={title} mode={TextModes.Title} />}</View>

      <View style={styles.side}>
        {withDeleteIcon && chatId && (
          <PressableCustom onPress={() => deleteChatButtonHandler(chatId)}>
            <TrashBinIcon />
          </PressableCustom>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: SPACING.lg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  side: {
    width: 12,
    justifyContent: 'center',
  },
  leftSide: {
    transform: [{ rotate: '180deg' }],
  },
});

export default Header;
