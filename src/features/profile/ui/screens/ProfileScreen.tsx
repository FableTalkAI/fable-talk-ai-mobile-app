import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useBottomWindow from '@/features/overlay/hooks/useBottomWindow.ts';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import AvatarFrameSelectorBottomWindow from '@/features/profile/ui/AvatarFrameSelectorBottomWindow/index.tsx';
import OptionBar from '@/features/profile/ui/OptionBar';
import { OptionBarModes } from '@/features/profile/ui/OptionBar/types.ts';
import UserAvatar from '@/features/profile/ui/UserAvatar';
import UserInfoBar from '@/features/profile/ui/UserInfoBar';
import ActiveSubscriptionBar from '@/features/subscriptions/ui/ActiveSubscriptionBar.tsx';
import { LogoutIcon } from '@/shared/assets/icons/index.ts';
import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigation } = useNavigationRoutes();
  const { isLoading, getAvatarFramesHandler } = useProfileStore();
  const { open } = useBottomWindow();

  const computedStyles = StyleSheet.create({
    separator: {
      backgroundColor: colors.gray20,
    },
  });

  const openAvatarFrameBottomWindow = () => {
    open(close => <AvatarFrameSelectorBottomWindow close={close} />);
    getAvatarFramesHandler();
  };

  return (
    <SafeAreaViewCustom edges={['top']} withHorizontalPadding={false} withGradientBackground>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} bounces={false}>
        <UserAvatar style={styles.avatar} />

        <View style={styles.userInfoContainer}>
          <ActiveSubscriptionBar />

          <UserInfoBar field="name" isLoading={isLoading.updateProfile} />
          <UserInfoBar field="dateOfBirth" isLoading={isLoading.updateProfile} />
          <OptionBar
            onPress={openAvatarFrameBottomWindow}
            title="Select Avatar Frame"
            subtitle="Customize your Avatar with our cool Frames"
            leftIcon={<LogoutIcon />}
            mode={OptionBarModes.Complex}
          />
        </View>

        <View style={[styles.separator, computedStyles.separator]} />

        <View style={styles.optionsContainer}>
          <OptionBar title={t('common.subscription')} onPress={() => navigation.navigate('Subscriptions')} />

          <OptionBar
            title={t('common.settings')}
            onPress={() => navigation.navigate('SettingsStack', { screen: 'Settings' })}
          />
        </View>
      </ScrollView>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    gap: SPACING.m,
    marginTop: SPACING.xl,
  },
  contentContainer: {
    paddingHorizontal: SPACING.xl,
  },
  avatar: {
    alignSelf: 'center',
  },
  separator: {
    height: 1,
    marginVertical: SPACING.lg,
  },
  optionsContainer: {
    gap: SPACING.m,
  },
});

export default ProfileScreen;
