import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Avatar from '@/components/molecules/Avatar';
import OptionBar from '@/components/molecules/OptionBar';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import UserInfoBar from '@/components/molecules/UserInfoBar';
import { SPACING } from '@/core/constants/sizes.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';
import useProfileStore from '@/hooks/useProfileStore.ts';
import useTheme from '@/hooks/useTheme.ts';

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
          <UserInfoBar field="name" isLoading={isLoading.profile} />
          <UserInfoBar field="dateOfBirth" isLoading={isLoading.profile} />
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
