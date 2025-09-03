import TextCustom from '@/components/atoms/TextCustom';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';

const HomeScreen = () => {
  return (
    <SafeAreaViewCustom withGradientBackground>
      <TextCustom text="Open" />
    </SafeAreaViewCustom>
  );
};

export default HomeScreen;
