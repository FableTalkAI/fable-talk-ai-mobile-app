import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import useCustomizationStore from '@/features/customization/hooks/useCustomizationStore.ts';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import OptionBar from '@/features/profile/ui/OptionBar';
import UserAvatar from '@/features/profile/ui/UserAvatar';
import UserInfoBar from '@/features/profile/ui/UserInfoBar';
import useSubscription from '@/features/subscriptions/hooks/useSubscription';
import ActiveSubscriptionBar from '@/features/subscriptions/ui/ActiveSubscriptionBar.tsx';
import useTheme from '@/shared/hooks/useTheme';
import { SPACING } from '@/shared/model/sizes.ts';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigation } = useNavigationRoutes();
  const { checkPremiumHandler } = useSubscription();

  const { isLoading } = useProfileStore();
  const { getAvatarFramesHandler } = useCustomizationStore();

  const computedStyles = StyleSheet.create({
    separator: {
      backgroundColor: colors.gray20,
    },
  });

  const onCustomizationNavigateHandler = async () => {
    await checkPremiumHandler({
      modalTitleKey: 'customization',
      func: async () => {
        getAvatarFramesHandler().catch(console.error);
        navigation.navigate('Customization');
      },
    });
  };

  return (
    <SafeAreaViewCustom edges={['top']} withBottomPadding={false} withHorizontalPadding={false} withGradientBackground>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} bounces={false}>
        <UserAvatar style={styles.avatar} />

        <View style={styles.userInfoContainer}>
          <ActiveSubscriptionBar />

          <UserInfoBar field="name" isLoading={isLoading.updateProfile} />
          <UserInfoBar field="dateOfBirth" isLoading={isLoading.updateProfile} />
        </View>

        <View style={[styles.separator, computedStyles.separator]} />

        <View style={styles.optionsContainer}>
          <OptionBar title={t('common.subscription')} onPress={() => navigation.navigate('Subscriptions')} />
          <OptionBar title={t('common.customization')} onPress={onCustomizationNavigateHandler} />
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
