import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Linking, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import useAuthStore from '@/features/auth/hooks/useAuthStore.ts';
import useThirdPartyAuth from '@/features/auth/hooks/useThirdPartyAuth.ts';
import { getAuthSchema } from '@/features/auth/lib/zod/schema.ts';
import { AuthSchema } from '@/features/auth/lib/zod/types.ts';
import { SendOtpLanguages } from '@/features/auth/store/auth/types.ts';
import ThirdPartyAuthButton from '@/features/auth/ui/ThirdPartyAuthButton';
import { AppleLogoIcon, GoogleLogoIcon, MailIcon, SignInIcon, SignUpIcon, UserIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme';
import { IS_IOS } from '@/shared/model/device.ts';
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from '@/shared/model/links.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import Button from '@/shared/ui/Button';
import FieldInput from '@/shared/ui/FieldInput';
import KeyboardAvoidingViewCustom from '@/shared/ui/KeyboardAvoidingViewCustom';
import PressableCustom from '@/shared/ui/PressableCustom';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { AuthScreenMode, SignInUpRouteProp } from './types.ts';

const SignInUpScreen = () => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();

  const route = useRoute<SignInUpRouteProp>();
  const { sendOtpHandler, setVerifyDataHandler, isLoading } = useAuthStore();
  const { onGoogleButtonPress, onAppleButtonPress } = useThirdPartyAuth();
  const { mode } = route.params;

  const [screenMode, setScreenMode] = useState<AuthScreenMode>(mode);

  const authSchema = getAuthSchema(screenMode);

  const { control, handleSubmit } = useForm<AuthSchema>({
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
    tosText: {
      color: colors.textSecondary,
    },
    textLink: {
      color: colors.link,
    },
    line: {
      backgroundColor: colors.textSecondary,
    },
  });

  const onSubmit = () => {
    handleSubmit(async (data: AuthSchema) => {
      const lang: SendOtpLanguages = i18n.resolvedLanguage === 'uk' ? 'uk' : 'en';
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
    <SafeAreaViewCustom withHorizontalPadding={false}>
      <Animated.View style={styles.wrapper} exiting={FadeOut} entering={FadeIn} key={screenMode}>
        <KeyboardAvoidingViewCustom scrollContentStyle={styles.scrollContentStyle}>
          <View style={styles.iconContainer}>{screenMode === 'signIn' ? <SignInIcon /> : <SignUpIcon />}</View>
          <View>
            <TextCustom text={t(`auth.${screenMode}.header`)} mode={TextModes.Title} />
            <TextCustom text={t(`auth.${screenMode}.subheader`)} mode={TextModes.Caption} style={styles.subheader} />

            <View style={styles.inputContainer}>
              {screenMode === 'signUp' && (
                <FieldInput
                  name="name"
                  control={control}
                  placeholder={t('common.name')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  maxLength={20}
                  leftIcon={<UserIcon />}
                />
              )}

              <FieldInput
                name="email"
                control={control}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
                autoCorrect={false}
                placeholder={t('common.email')}
                leftIcon={<MailIcon />}
                onChangeHandler={text => text.toLowerCase()}
              />
            </View>

            <TextCustom
              numberOfLines={2}
              adjustsFontSizeToFit
              mode={TextModes.Caption}
              style={[styles.tosText, computedStyles.tosText]}
            >
              {t('auth.agreement')}
              <TextCustom
                suppressHighlighting={true}
                android_hyphenationFrequency="none"
                onPress={() => Linking.openURL(TERMS_OF_SERVICE)}
                mode={TextModes.Caption}
                style={[styles.tosText, computedStyles.textLink]}
              >
                {t('auth.termsOfService')}
              </TextCustom>
              {t('auth.and')}
              <TextCustom
                suppressHighlighting={true}
                android_hyphenationFrequency="none"
                onPress={() => Linking.openURL(PRIVACY_POLICY)}
                mode={TextModes.Caption}
                style={[styles.tosText, computedStyles.textLink]}
              >
                {t('auth.privacyPolicy')}
              </TextCustom>
            </TextCustom>
          </View>

          <View style={styles.continueWithContainer}>
            <View style={styles.separatorContainer}>
              <View style={[styles.line, computedStyles.line]} />

              <TextCustom
                text={t('auth.continueWith')}
                mode={TextModes.Caption}
                style={computedStyles.continueWithText}
              />

              <View style={[styles.line, computedStyles.line]} />
            </View>

            <View style={styles.thirdPartyAuthContainer}>
              <ThirdPartyAuthButton
                onPress={onGoogleButtonPress}
                icon={<GoogleLogoIcon />}
                isLoading={isLoading.login}
              />

              {IS_IOS && (
                <ThirdPartyAuthButton
                  onPress={onAppleButtonPress}
                  icon={<AppleLogoIcon width={34} height={34} />}
                  isLoading={isLoading.login}
                />
              )}
            </View>
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
  scrollContentStyle: {
    paddingHorizontal: SPACING.xl,
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
    paddingBottom: SPACING.s,
    gap: SPACING.xs,
  },
  buttonAndTextContainer: {
    paddingTop: SPACING.s,
    paddingHorizontal: SPACING.xl,
    gap: SPACING.xs,
  },
  belowButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputContainer: {
    gap: SPACING.m,
  },
  tosText: {
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: SPACING.s,
  },
  line: {
    flex: 1,
    height: 1,
  },
  thirdPartyAuthContainer: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
});

export default SignInUpScreen;
