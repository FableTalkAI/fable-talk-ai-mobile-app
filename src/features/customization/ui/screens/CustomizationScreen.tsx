import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import AvatarFrameCustomize from '@/features/customization/ui/AvatarFrameCustomize';
import ChatCustomize from '@/features/customization/ui/ChatCustomize.tsx';
import { ChatGearIcon, UserGearIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme';
import { SPACING } from '@/shared/model/sizes.ts';
import Header from '@/shared/ui/Header';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import TabToggle from '@/shared/ui/TabToggle';

const CustomizationScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [activeTab, setActiveTab] = useState(0);

  return (
    <SafeAreaViewCustom>
      <Header title={t('common.customization')} />

      <TabToggle
        contentPosition="top"
        activeTab={activeTab}
        onChange={setActiveTab}
        buttonStyle={styles.buttonStyle}
        tabs={[
          {
            name: t('customization.avatar'),
            icon: <UserGearIcon fill={colors.iconPrimary} />,
            content: <AvatarFrameCustomize />,
          },
          {
            name: t('customization.chat'),
            icon: <ChatGearIcon fill={colors.iconPrimary} />,
            content: <ChatCustomize />,
          },
        ]}
      />
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: SPACING.m,
  },
});

export default CustomizationScreen;
