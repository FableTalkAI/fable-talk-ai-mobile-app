import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

import useAuthStore from '@/features/auth/hooks/useAuthStore.ts';
import RenderCodeField from '@/features/auth/ui/RenderCodeField';
import { VerifyCodeIcon } from '@/shared/assets/icons';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import ComponentLoader from '@/shared/ui/ComponentLoader';
import Header from '@/shared/ui/Header';
import KeyboardAvoidingViewCustom from '@/shared/ui/KeyboardAvoidingViewCustom';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { CELL_COUNT } from './constants.ts';

const CodeVerificationScreen = () => {
  const { t } = useTranslation();
  const { verifyOtpHandler, verifyData, isLoading } = useAuthStore();

  const [value, setValue] = useState('');

  const codeRef = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const computedStyles = StyleSheet.create({
    codeContainer: {
      marginTop: SPACING.xl * 2,
    },
  });

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      if (!verifyData) return;
      verifyOtpHandler({ ...verifyData, code: value }).catch(console.error);
    }
  }, [value, verifyData, verifyOtpHandler]);

  if (verifyData === null) return null;

  return (
    <SafeAreaViewCustom>
      <Header />
      <KeyboardAvoidingViewCustom>
        <VerifyCodeIcon style={styles.icon} />

        <TextCustom mode={TextModes.Title} text={t('auth.verify.header')} />

        <View style={styles.subtitleContainer}>
          <TextCustom mode={TextModes.Caption} text={t('auth.verify.subheader')} />
          <TextCustom mode={TextModes.Tag} text={verifyData.email} />
        </View>

        <View style={[styles.codeContainer, computedStyles.codeContainer]}>
          <CodeField
            ref={codeRef}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            renderCell={options => (
              <RenderCodeField getCellOnLayoutHandler={getCellOnLayoutHandler} {...options} key={options.index} />
            )}
          />

          <ComponentLoader isVisible={isLoading.verifyOtp} />
        </View>
      </KeyboardAvoidingViewCustom>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    marginBottom: SPACING.xl,
  },
  subtitleContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    columnGap: SPACING.xxs,
  },
  codeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.lg,
    overflow: 'hidden',
    width: 250,
    padding: SPACING.xxs,
    borderRadius: RADIUS.large,
    alignSelf: 'center',
  },
});

export default CodeVerificationScreen;
