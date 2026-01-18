import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import useBottomWindow from '@/features/bottomWindow/hooks/useBottomWindow';
import { BottomWindowModes } from '@/features/bottomWindow/hooks/useBottomWindow/types.ts';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useNotificationPermission from '@/features/notifications/hooks/useNotificationPermission.ts';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import useUserStore from '@/features/profile/hooks/useUserStore.ts';
import { Theme } from '@/features/profile/store/user/types.ts';
import OptionBar from '@/features/profile/ui/OptionBar';
import { OptionBarColorModes, OptionBarModes } from '@/features/profile/ui/OptionBar/types.ts';
import SettingsContainer from '@/features/profile/ui/SettingsContainer';
import {
  HeadphonesIcon,
  LogoutIcon,
  MailDotIcon,
  NotificationBellIcon,
  PaletteIcon,
  PaperInfoIcon,
  ShieldUserIcon,
  TrashBinIcon,
  XMarkIcon,
} from '@/shared/assets/icons';
import { SPACING } from '@/shared/model/sizes.ts';
import Header from '@/shared/ui/Header';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import Select from '@/shared/ui/Select';
import Toggle from '@/shared/ui/Toggle';

const SettingsScreen = () => {
  const { t } = useTranslation();
  const { navigation } = useNavigationRoutes();

  const { notifications, theme, setThemeHandler } = useUserStore();
  const { updateUserProfileHandler, profile, isLoading } = useProfileStore();

  const { open: openDeleteAcc } = useBottomWindow(BottomWindowModes.DeleteAccount);
  const { open: openLogoutAcc } = useBottomWindow(BottomWindowModes.Logout);
  const { authorizeHandler } = useNotificationPermission();

  const emailNotifications = profile ? profile.isEmailNotificationEnabled : false;

  const selectOptions = useMemo(
    () =>
      (Object.keys(Theme) as Array<keyof typeof Theme>).map(option => ({
        value: Theme[option],
        title: t(`theme.${option.toLowerCase()}`),
      })),
    [t],
  );

  return (
    <SafeAreaViewCustom>
      <Header title={t('common.settings')} />

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <SettingsContainer label={t('settings.notifications')}>
          <OptionBar
            onPress={authorizeHandler}
            title={t('settings.pushNotifications')}
            subtitle={t(`common.${notifications.push ? 'enabled' : 'disabled'}`)}
            leftIcon={<NotificationBellIcon />}
            rightComponent={<Toggle isActive={notifications.push} />}
            mode={OptionBarModes.Complex}
          />
          <OptionBar
            onPress={() =>
              updateUserProfileHandler({
                isEmailNotificationEnabled: profile ? !profile.isEmailNotificationEnabled : false,
              })
            }
            title={t('common.email')}
            subtitle={t(`common.${emailNotifications ? 'enabled' : 'disabled'}`)}
            leftIcon={<MailDotIcon />}
            rightComponent={<Toggle isActive={emailNotifications} />}
            mode={OptionBarModes.Complex}
            disabled={isLoading.updateProfile}
          />
        </SettingsContainer>

        <SettingsContainer label={t('settings.about')}>
          <OptionBar
            onPress={() => navigation.navigate('TermsAndConditions')}
            title={t('settings.termsAndConditions')}
            subtitle={t('settings.legalInformation')}
            leftIcon={<ShieldUserIcon />}
            mode={OptionBarModes.Complex}
          />
          <OptionBar
            onPress={() => navigation.navigate('PrivacyPolicy')}
            title={t('settings.privacyPolicy')}
            subtitle={t('settings.protectYourData')}
            leftIcon={<PaperInfoIcon />}
            mode={OptionBarModes.Complex}
          />
          <OptionBar
            onPress={() => navigation.navigate('ContactUs')}
            title={t('common.contactUs')}
            subtitle={t('settings.getHelp')}
            leftIcon={<HeadphonesIcon />}
            mode={OptionBarModes.Complex}
          />
        </SettingsContainer>

        <SettingsContainer label={t('settings.account')}>
          <OptionBar
            disabled
            title={t('settings.theme')}
            subtitle={t('settings.changeAppTheme')}
            leftIcon={<PaletteIcon />}
            mode={OptionBarModes.Complex}
            rightComponent={<Select onChange={setThemeHandler} options={selectOptions} defaultValue={theme} />}
          />
          <OptionBar
            onPress={openLogoutAcc}
            title={t('actions.logout')}
            subtitle={t('settings.exitFromAcc')}
            leftIcon={<LogoutIcon />}
            mode={OptionBarModes.Complex}
          />
          <OptionBar
            onPress={openDeleteAcc}
            title={t('actions.delete')}
            subtitle={t('settings.removeYourAccount')}
            colorMode={OptionBarColorModes.Red}
            leftIcon={<TrashBinIcon />}
            rightComponent={<XMarkIcon />}
            mode={OptionBarModes.Complex}
          />
        </SettingsContainer>
      </ScrollView>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    gap: SPACING.m,
  },
});

export default SettingsScreen;
