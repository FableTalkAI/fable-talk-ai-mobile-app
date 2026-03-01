import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import Button from '@/shared/ui/Button';
import Header from '@/shared/ui/Header';
import KeyboardAvoidingViewCustom from '@/shared/ui/KeyboardAvoidingViewCustom';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import TextCustom from '@/shared/ui/TextCustom';
import TextInputCustom from '@/shared/ui/TextInputCustom';

const ContactUsScreen = () => {
  const { t } = useTranslation();
  const { sendSupportMessageHandler, isLoading } = useProfileStore();

  const [message, setMessage] = useState('');

  const onSend = async () => {
    try {
      await sendSupportMessageHandler(message);
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaViewCustom withHorizontalPadding={false}>
      <Header title={t('contactUs.header')} />

      <TextCustom text={t('contactUs.description')} style={styles.text} />

      <KeyboardAvoidingViewCustom scrollContentStyle={styles.scrollContent}>
        <TextInputCustom
          placeholder={t('contactUs.placeholder')}
          multiline
          height={180}
          maxLength={250}
          withCharCount
          value={message}
          onChangeText={setMessage}
        />
      </KeyboardAvoidingViewCustom>

      <Button
        onPress={onSend}
        title={t('actions.send')}
        style={styles.button}
        isLoading={isLoading.contactUs}
        isDisable={!message.trim().length}
      />
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: SPACING.xl,
    marginHorizontal: SPACING.xl,
  },
  button: {
    marginTop: SPACING.m,
    marginHorizontal: SPACING.xl,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
  },
});

export default ContactUsScreen;
