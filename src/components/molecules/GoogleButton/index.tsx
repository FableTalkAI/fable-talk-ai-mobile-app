import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { GoogleLogoIcon } from '@/assets/icons/index.ts';
import PressableCustom from '@/components/atoms/PressableCustom/index.tsx';
import useAuthStore from '@/hooks/useAuthStore.ts';

const GoogleButton = () => {
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
    <PressableCustom onPress={onGoogleButtonPress}>
      <GoogleLogoIcon />
    </PressableCustom>
  );
};

export default GoogleButton;
