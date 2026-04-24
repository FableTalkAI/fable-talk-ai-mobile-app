import appleAuth from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { jwtDecode } from 'jwt-decode';

import useAuthStore from './useAuthStore.ts';

const useThirdPartyAuth = () => {
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

  async function onAppleButtonPress() {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

      if (credentialState === appleAuth.State.REVOKED || credentialState === appleAuth.State.AUTHORIZED) {
        const { identityToken, nonce } = appleAuthRequestResponse;
        const credential = auth.AppleAuthProvider.credential(identityToken, nonce);

        if (!identityToken) {
          throw new Error('Apple Auth Error: identityToken is required');
        }

        const decodedToken: any = jwtDecode(identityToken);
        const emailFromToken = decodedToken.email;

        const data = {
          email: appleAuthRequestResponse.email || emailFromToken,
          name:
            `${appleAuthRequestResponse.fullName?.givenName || ''} ${
              appleAuthRequestResponse.fullName?.familyName || ''
            }`.trim() || 'NoName',
          photo: null,
        };

        await upsertGoogleHandler({ data, credential });
      }
    } catch (error) {
      console.error('Apple Auth Error:', error);
    }
  }

  return {
    onGoogleButtonPress,
    onAppleButtonPress,
  };
};

export default useThirdPartyAuth;
