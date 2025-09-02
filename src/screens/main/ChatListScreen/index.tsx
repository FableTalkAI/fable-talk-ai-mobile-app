import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';

const ChatListScreen = () => {
  const { navigation } = useNavigationRoutes();

  return (
    <SafeAreaViewCustom withGradientBackground>
      <PressableCustom onPress={navigation.goBack}>
        <TextCustom text="sdasda" />
      </PressableCustom>
    </SafeAreaViewCustom>
  );
};

export default ChatListScreen;
