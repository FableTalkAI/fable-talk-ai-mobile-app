import { useNavigation } from '@react-navigation/native';

import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaViewCustom>
        <PressableCustom onPress={() => navigation.navigate()}>
          <TextCustom text="sadasda" />
        </PressableCustom>
      </SafeAreaViewCustom>
    </>
  );
};

export default HomeScreen;
