import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { MailIcon, SignInIcon, SignUpIcon, UserIcon } from '@/assets/icons';
import Button from '@/components/atoms/Button';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import GoogleButton from '@/components/molecules/GoogleButton/index.tsx';
import KeyboardAvoidingViewCustom from '@/components/molecules/KeyboardAvoidingViewCustom';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import { SPACING } from '@/core/constants/sizes.ts';
import { getDeviceLanguage } from '@/core/utils/device.ts';
import { getAuthSchema } from '@/core/utils/zod/schema.ts';
import { AuthSchema } from '@/core/utils/zod/types.ts';
import useAuthStore from '@/hooks/useAuthStore.ts';
import useTheme from '@/hooks/useTheme.ts';
import { SendOtpLanguages } from '@/store/auth/types.ts';

import { AuthScreenMode, SignInUpRouteProp } from './types.ts';

const SignInUpScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const route = useRoute<SignInUpRouteProp>();
  const { sendOtpHandler, setVerifyDataHandler } = useAuthStore();
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
                    onChangeText={onChange}
                    onBlur={onBlur}
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

            <GoogleButton />
          </View>
        </KeyboardAvoidingViewCustom>

        <View style={styles.buttonAndTextContainer}>
          <Button title={t(`auth.${screenMode}Button`)} onPress={onSubmit} />

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
