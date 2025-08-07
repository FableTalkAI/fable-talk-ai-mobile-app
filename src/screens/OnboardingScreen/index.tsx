import { StyleSheet } from 'react-native';

import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';

const OnboardingScreen = () => {
  return (
    <SafeAreaViewCustom isTransparent style={styles.safeAreaView}>
      <></>
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
