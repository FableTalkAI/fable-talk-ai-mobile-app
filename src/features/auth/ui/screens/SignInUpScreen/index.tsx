import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import useAuthStore from '@/features/auth/hooks/useAuthStore.ts';
import { getAuthSchema } from '@/features/auth/lib/zod/schema.ts';
import { AuthSchema } from '@/features/auth/lib/zod/types.ts';
import { SendOtpLanguages } from '@/features/auth/store/auth/types.ts';
import GoogleButton from '@/features/auth/ui/GoogleButton';
import { MailIcon, SignInIcon, SignUpIcon, UserIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { getDeviceLanguage } from '@/shared/lib/device.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import Button from '@/shared/ui/Button';
import KeyboardAvoidingViewCustom from '@/shared/ui/KeyboardAvoidingViewCustom';
import PressableCustom from '@/shared/ui/PressableCustom';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';
import TextInputCustom from '@/shared/ui/TextInputCustom';

import { AuthScreenMode, SignInUpRouteProp } from './types.ts';

const SignInUpScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const route = useRoute<SignInUpRouteProp>();
  const { sendOtpHandler, setVerifyDataHandler, isLoading } = useAuthStore();
  const { mode } = route.params;

  const [screenMode, setScreenMode] = useState<AuthScreenMode>(mode);

  const authSchema = getAuthSchema(screenMode);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: { name: '', email: '' },
  });

  const computedStyles = StyleSheet.create({
    continueWithText: {
      color: colors.gray40,
    },
    belowButtonText: {
      color: colors.textSecondary,
    },
    textLink: {
      color: colors.link,
    },
    errorText: {
      color: colors.errorDark,
    },
  });

  const onSubmit = () => {
    handleSubmit(async (data: AuthSchema) => {
      const lang: SendOtpLanguages = getDeviceLanguage() === 'uk' ? 'uk' : 'en';
      const dataOptions = {
        email: data.email,
        lang,
        ...(screenMode === AuthScreenMode.SignUp && { name: data.name }),
      };

      setVerifyDataHandler(data);
      await sendOtpHandler(dataOptions);
    })();
  };

  return (
    <SafeAreaViewCustom>
      <Animated.View style={styles.wrapper} exiting={FadeOut} entering={FadeIn} key={screenMode}>
        <KeyboardAvoidingViewCustom>
          <View style={styles.iconContainer}>{screenMode === 'signIn' ? <SignInIcon /> : <SignUpIcon />}</View>

          <View>
            <TextCustom text={t(`auth.${screenMode}.header`)} mode={TextModes.Title} />
            <TextCustom text={t(`auth.${screenMode}.subheader`)} mode={TextModes.Caption} style={styles.subheader} />

            {screenMode === 'signUp' && (
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={[styles.inputContainer, styles.firstTextInput]}>
                    <TextInputCustom
                      value={value || ''}
                      maxLength={20}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder={t('common.name')}
                      leftIcon={<UserIcon />}
                    />
                    {errors.name && (
                      <TextCustom
                        style={computedStyles.errorText}
                        text={errors.name.message || ''}
                        mode={TextModes.Caption}
                      />
                    )}
                  </View>
                )}
              />
            )}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInputCustom
                    value={value}
                    onChangeText={text => onChange(text.toLowerCase())}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="email"
                    textContentType="emailAddress"
                    autoCorrect={false}
                    placeholder={t('common.email')}
                    leftIcon={<MailIcon />}
                  />
                  {errors.email && (
                    <TextCustom
                      style={computedStyles.errorText}
                      text={errors.email.message || ''}
                      mode={TextModes.Caption}
                    />
                  )}
                </View>
              )}
            />
          </View>

          <View style={styles.continueWithContainer}>
            <TextCustom
              text={t('auth.continueWith')}
              mode={TextModes.Caption}
              style={computedStyles.continueWithText}
            />

            <GoogleButton isLoading={isLoading.login} />
          </View>
        </KeyboardAvoidingViewCustom>

        <View style={styles.buttonAndTextContainer}>
          <Button title={t(`auth.${screenMode}Button`)} onPress={onSubmit} isLoading={isLoading.login} />

          <View style={styles.belowButtonContainer}>
            <TextCustom
              text={t(`auth.${screenMode}.belowButton`)}
              mode={TextModes.Caption}
              style={computedStyles.belowButtonText}
            />
            <PressableCustom
              onPress={() =>
                setScreenMode(screenMode === AuthScreenMode.SignUp ? AuthScreenMode.SignIn : AuthScreenMode.SignUp)
              }
            >
              <TextCustom
                text={screenMode === 'signIn' ? t('auth.signUpButton') : t('auth.signInButton')}
                mode={TextModes.Caption}
                style={computedStyles.textLink}
              />
            </PressableCustom>
          </View>
        </View>
      </Animated.View>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
    paddingBottom: SPACING.lg,
  },
  subheader: {
    paddingBottom: SPACING.s,
  },
  continueWithContainer: {
    alignItems: 'center',
    paddingTop: SPACING.m,
    gap: SPACING.xs,
  },
  buttonAndTextContainer: {
    paddingTop: SPACING.s,
    gap: SPACING.xs,
  },
  belowButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  firstTextInput: {
    marginBottom: SPACING.lg,
  },
  inputContainer: {
    gap: SPACING.xxs,
  },
});

export default SignInUpScreen;
