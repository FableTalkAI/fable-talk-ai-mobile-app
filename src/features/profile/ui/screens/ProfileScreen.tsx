import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import Avatar from '@/features/profile/ui/Avatar';
import OptionBar from '@/features/profile/ui/OptionBar';
import UserInfoBar from '@/features/profile/ui/UserInfoBar';
import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigation } = useNavigationRoutes();
  const { isLoading } = useProfileStore();

  const computedStyles = StyleSheet.create({
    separator: {
      backgroundColor: colors.gray20,
    },
  });

  return (
    <SafeAreaViewCustom withGradientBackground>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Avatar style={styles.avatar} />

        <View style={styles.userInfoContainer}>
          <UserInfoBar field="name" isLoading={isLoading.updateProfile} />
          <UserInfoBar field="dateOfBirth" isLoading={isLoading.updateProfile} />
        </View>

        <View style={[styles.separator, computedStyles.separator]} />

        <View style={styles.optionsContainer}>
          <OptionBar
            title={t('common.settings')}
            onPress={() => navigation.navigate('SettingsStack', { screen: 'Settings' })}
          />
          <OptionBar title={t('common.subscription')} onPress={() => navigation.navigate('Subscriptions')} />
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
