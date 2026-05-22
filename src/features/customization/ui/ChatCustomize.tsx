import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

import { Bubble, Composer, InputToolbar, Message, Send } from '@/features/chat/ui/giftedChat';
import useCustomizationStore from '@/features/customization/hooks/useCustomizationStore.ts';
import { getMockChatMessages } from '@/features/customization/services/getMockChatMessages.ts';
import useUserStore from '@/features/profile/hooks/useUserStore.ts';
import { Theme } from '@/features/profile/store/user/types.ts';
import { useImagePick } from '@/shared/hooks/useImagePick';
import useTheme from '@/shared/hooks/useTheme';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import Button from '@/shared/ui/Button';
import { ButtonModes } from '@/shared/ui/Button/types.ts';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';
import Toggle from '@/shared/ui/Toggle';

const ChatCustomize = () => {
  const { theme: userTheme } = useUserStore();
  const { t } = useTranslation();

  const { chatBackground, setChatBackgroundHandler } = useCustomizationStore();

  const [themeMode, setThemeMode] = useState<Theme>(userTheme);

  const { colors } = useTheme({ themeMode });
  const { pickImage } = useImagePick({
    onSuccess: uri => {
      setChatBackgroundHandler(uri);
    },
  });

  const computedStyles = StyleSheet.create({
    messagesContainer: {
      backgroundColor: colors.backgroundTertiary,
      borderColor: colors.primary30,
    },
    textTimeBubblesLeft: {
      color: colors.textPrimary,
    },
    textTimeBubblesRight: {
      color: colors.textPrimary,
    },
    toggleLeftText: {
      fontWeight: themeMode === 'light' ? '600' : '400',
    },
    toggleRightText: {
      fontWeight: themeMode === 'dark' ? '600' : '400',
    },
  });

  const onTogglePress = () => {
    setThemeMode(themeMode === Theme.Dark ? Theme.Light : Theme.Dark);
  };

  const onChatBackgroundClear = () => {
    setChatBackgroundHandler(undefined);
  };

  return (
    <View style={styles.flex1}>
      <View style={styles.chatWrapper}>
        <View style={styles.toggleContainer}>
          <TextCustom text={t('theme.light')} style={[styles.toggleLeftText, computedStyles.toggleLeftText]} />
          <Toggle isActive={themeMode === Theme.Dark} setIsActive={onTogglePress} />
          <TextCustom text={t('theme.dark')} style={[styles.flex1, computedStyles.toggleRightText]} />
        </View>

        <View style={styles.flex1} pointerEvents="none">
          <ImageBackground
            source={{ uri: chatBackground }}
            style={[styles.messagesContainer, computedStyles.messagesContainer]}
          >
            <GiftedChat
              messagesContainerStyle={styles.chat}
              messages={getMockChatMessages(t) as IMessage[]}
              onSend={() => {}}
              user={{ _id: 1 }}
              timeFormat="HH:mm"
              renderAvatar={() => null}
              renderDay={() => null}
              timeTextStyle={{ left: computedStyles.textTimeBubblesLeft, right: computedStyles.textTimeBubblesRight }}
              renderBubble={props => <Bubble {...props} themeMode={themeMode} />}
              renderMessage={props => <Message {...props} />}
              renderInputToolbar={props => <InputToolbar withSuggestions={false} {...props} themeMode={themeMode} />}
              renderComposer={props => <Composer {...props} themeMode={themeMode} />}
              renderSend={props => <Send {...props} themeMode={themeMode} />}
            />
          </ImageBackground>
        </View>
      </View>

      <TextCustom mode={TextModes.Subtitle} text={t('customization.wallpaper')} style={styles.buttonTitle} />

      <View style={styles.buttonContainer}>
        <Button
          onPress={onChatBackgroundClear}
          mode={ButtonModes.Ghost}
          title={t('actions.clear')}
          containerStyle={styles.button}
        />
        <Button onPress={pickImage} title={t('actions.select')} containerStyle={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  chat: {
    paddingBottom: 86,
  },
  chatWrapper: {
    flex: 1,
    gap: SPACING.xs,
    paddingBottom: SPACING.lg,
  },
  messagesContainer: {
    flex: 1,
    borderRadius: RADIUS.large,
    borderWidth: 2,
    overflow: 'hidden',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.s,
  },
  toggleLeftText: {
    flex: 1,
    textAlign: 'right',
  },
  buttonTitle: {
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '49%',
  },
});

export default ChatCustomize;
