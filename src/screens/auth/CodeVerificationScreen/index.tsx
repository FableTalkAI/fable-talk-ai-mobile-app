import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import {
  CodeField,
  RenderCellOptions,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { VerifyCodeIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import KeyboardAvoidingViewCustom from '@/components/molecules/KeyboardAvoidingViewCustom';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import { SPACING } from '@/core/constants/sizes.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';
import useTheme from '@/hooks/useTheme.ts';
import useUserStore from '@/hooks/useUserStore.ts';

import { CELL_COUNT } from './constants.ts';

const CodeVerificationScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigation } = useNavigationRoutes();

  const { profile } = useUserStore();

  const [value, setValue] = useState('');

  const codeRef = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const computedStyles = StyleSheet.create({
    resendText: {
      color: colors.link,
    },
    codeContainer: {
      marginTop: SPACING.xl * 2,
    },
  });

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    }
  }, [navigation, value]);

  if (!profile.email) return null;

  const renderCodeField = ({ index, symbol, isFocused }: RenderCellOptions) => {
    const localStyles = {
      borderBottomColor: isFocused ? colors.link : colors.textPrimary,
    };

    return (
      <View onLayout={getCellOnLayoutHandler(index)} key={index} style={[styles.cell, localStyles]}>
        <TextCustom mode={TextModes.Title} text={symbol} />
      </View>
    );
  };

  return (
    <SafeAreaViewCustom>
      <KeyboardAvoidingViewCustom>
        <VerifyCodeIcon style={styles.icon} />

        <TextCustom mode={TextModes.Title} text={t('auth.verify.header')} />

        <View style={styles.subtitleContainer}>
          <TextCustom mode={TextModes.Caption} text={t('auth.verify.subheader')} />
          <TextCustom mode={TextModes.Tag} text={profile.email} />
        </View>

        <View style={[styles.codeContainer, computedStyles.codeContainer]}>
          <CodeField
            ref={codeRef}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            renderCell={renderCodeField}
          />

          <PressableCustom hitSlop={8} onPress={() => console.log('resend')}>
            <TextCustom mode={TextModes.Caption} style={computedStyles.resendText} text={t('auth.verify.resendCode')} />
          </PressableCustom>
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
  },
  cell: {
    width: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    marginLeft: SPACING.xs,
  },
});

export default CodeVerificationScreen;
