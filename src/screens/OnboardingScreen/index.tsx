import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Button from '@/components/atoms/Button';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import { RootStackParamList } from '@/navigation/RootNavigator/types.ts';

const OnboardingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaViewCustom isTransparent style={styles.safeAreaView}>
      <Button title="Onboarding" onPress={() => navigation.navigate('Main')} />
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default OnboardingScreen;
