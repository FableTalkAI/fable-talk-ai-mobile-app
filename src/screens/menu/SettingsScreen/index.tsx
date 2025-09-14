import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import {
  HeadphonesIcon,
  MailDotIcon,
  NotificationBellIcon,
  PaletteIcon,
  PaperInfoIcon,
  ShieldUserIcon,
  TrashBinIcon,
  XMarkIcon,
} from '@/assets/icons';
import Select from '@/components/atoms/Select';
import Toggle from '@/components/atoms/Toggle';
import Header from '@/components/molecules/Header';
import OptionBar from '@/components/molecules/OptionBar';
import { OptionBarColorModes, OptionBarModes } from '@/components/molecules/OptionBar/types.ts';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import SettingsContainer from '@/components/molecules/SettingsContainer';
import { SPACING } from '@/core/constants/sizes.ts';
import useBottomWindow from '@/hooks/useBottomWindow';
import { BottomWindowModes } from '@/hooks/useBottomWindow/types.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';
import useNotificationPermission from '@/hooks/useNotificationPermission.ts';
import useUserStore from '@/hooks/useUserStore.ts';
import { Theme } from '@/store/user/types.ts';

const SettingsScreen = () => {
  const { t } = useTranslation();
  const { navigation } = useNavigationRoutes();

  const { notifications, theme, setEmailNotificationHandler, setThemeHandler } = useUserStore();

  const { BottomWindow, open } = useBottomWindow({ mode: BottomWindowModes.DeleteAccount });
  const { authorizeHandler } = useNotificationPermission();

  const selectOptions = useMemo(() => Object.values(Theme).map(option => t(`theme.${option}`)), [t]);

  return (
    <>
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
              subtitle={t('common.disable')}
              leftIcon={<NotificationBellIcon />}
              rightComponent={<Toggle isActive={notifications.push} />}
              mode={OptionBarModes.Complex}
            />
            <OptionBar
              onPress={() => setEmailNotificationHandler(!notifications.email)}
              title={t('common.email')}
              subtitle={t('common.enable')}
              leftIcon={<MailDotIcon />}
              rightComponent={<Toggle isActive={notifications.email} />}
              mode={OptionBarModes.Complex}
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
              rightComponent={
                <Select onChange={setThemeHandler} options={selectOptions} defaultOption={t(`theme.${theme}`)} />
              }
            />
            <OptionBar
              onPress={open}
              title={t('common.delete')}
              subtitle={t('settings.removeYourAccount')}
              colorMode={OptionBarColorModes.Red}
              leftIcon={<TrashBinIcon />}
              rightComponent={<XMarkIcon />}
              mode={OptionBarModes.Complex}
            />
          </SettingsContainer>
        </ScrollView>
      </SafeAreaViewCustom>

      <BottomWindow />
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    gap: SPACING.m,
  },
});

export default SettingsScreen;
