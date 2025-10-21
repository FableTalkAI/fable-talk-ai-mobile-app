import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StyleSheet } from 'react-native';

import { GoogleLogoIcon } from '@/assets/icons/index.ts';
import PressableCustom from '@/components/atoms/PressableCustom/index.tsx';
import ComponentLoader from '@/components/molecules/ComponentLoader/index.tsx';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useAuthStore from '@/hooks/useAuthStore.ts';

import { GoogleButtonProps } from './types.ts';

const GoogleButton = ({ isLoading }: GoogleButtonProps) => {
  const { upsertGoogleHandler } = useAuthStore();

  const onGoogleButtonPress = async () => {
    await GoogleSignin.signOut();

    const googleSighInResponse = await GoogleSignin.signIn();
    if (googleSighInResponse.type === 'cancelled') return;

    const { idToken, user } = googleSighInResponse.data;
    const credential = auth.GoogleAuthProvider.credential(idToken);

    const data = {
      email: user.email,
      name: user.name,
      photo: user.photo,
    };

    await upsertGoogleHandler({ data, credential });
  };

  return (
    <PressableCustom onPress={onGoogleButtonPress} disabled={isLoading} style={styles.container}>
      <GoogleLogoIcon />
      <ComponentLoader isVisible={isLoading} />
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: RADIUS.circle,
    padding: SPACING.xxs,
  },
});

export default GoogleButton;
