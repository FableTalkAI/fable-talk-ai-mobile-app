import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';

const HomeScreen = () => {
  const { navigation } = useNavigationRoutes();

  return (
    <>
      <SafeAreaViewCustom>
        <PressableCustom onPress={navigation.goBack}>
          <TextCustom text="sadasda" />
        </PressableCustom>
      </SafeAreaViewCustom>
    </>
  );
};

export default HomeScreen;
