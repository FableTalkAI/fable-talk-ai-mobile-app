import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Button from '@/components/atoms/Button';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import { RootStackParamList } from '@/navigation/RootNavigator/types.ts';

const SignInUpScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaViewCustom isTransparent style={styles.safeAreaView}>
      <Button title="SignInUpScreen" onPress={() => navigation.navigate('OnboardingScreen')} />
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SignInUpScreen;
