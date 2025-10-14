import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import Button from '@/components/atoms/Button';
import TextCustom from '@/components/atoms/TextCustom';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import Header from '@/components/molecules/Header';
import KeyboardAvoidingViewCustom from '@/components/molecules/KeyboardAvoidingViewCustom';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import { SPACING } from '@/core/constants/sizes.ts';
import useProfileStore from '@/hooks/useProfileStore.ts';

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
    <SafeAreaViewCustom>
      <Header title={t('contactUs.header')} />

      <TextCustom text={t('contactUs.description')} style={styles.text} />

      <KeyboardAvoidingViewCustom>
        <TextInputCustom
          placeholder={t('contactUs.placeholder')}
          multiline
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
        isDisable={!message.length}
      />
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: SPACING.xl,
  },
  button: {
    marginTop: SPACING.m,
  },
});

export default ContactUsScreen;
