import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StackNavigationProp } from '@react-navigation/stack';

import { resetApp, store } from '@/app/store';
import { AllNavigationParamList } from '@/features/navigation/hooks/useNavigationRoutes/types.ts';

export const logoutUser = async (navigation: StackNavigationProp<AllNavigationParamList>) => {
  await auth().signOut();
  await GoogleSignin.signOut();

  store.dispatch(resetApp());
  await AsyncStorage.clear();

  navigation.reset({
    index: 0,
    routes: [{ name: 'AuthStack', params: { screen: 'Splash' } }],
  });
};
