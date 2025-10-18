import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { GoogleLogoIcon } from '@/assets/icons/index.ts';
import PressableCustom from '@/components/atoms/PressableCustom/index.tsx';
import useNavigationRoutes from '@/hooks/useNavigationRoutes/index.ts';
import useProfileStore from '@/hooks/useProfileStore.ts';
import useUserStore from '@/hooks/useUserStore.ts';

const GoogleButton = () => {
  const { navigation } = useNavigationRoutes();
  const { isOnboardingDone } = useUserStore();
  const { getUserProfileHandler } = useProfileStore();

  const onGoogleButtonPress = async () => {
    await GoogleSignin.signOut();

    const googleSighInResponse = await GoogleSignin.signIn();
    if (googleSighInResponse.type === 'cancelled') return;

    const googleCredential = auth.GoogleAuthProvider.credential(googleSighInResponse.data.idToken);
    await auth().signInWithCredential(googleCredential);
    await getUserProfileHandler();

    if (isOnboardingDone) {
      return navigation.reset({
        index: 0,
        routes: [{ name: 'TabBarNavigator', params: { screen: 'Home' } }],
      });
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Onboarding' }],
    });
  };

  return (
    <PressableCustom onPress={onGoogleButtonPress}>
      <GoogleLogoIcon />
    </PressableCustom>
  );
};

export default GoogleButton;
