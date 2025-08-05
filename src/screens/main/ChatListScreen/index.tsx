import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import useNavigationRoutes from '@/hooks/useNavigationRoutes.ts';

const ChatListScreen = () => {
  const { chatNavigation } = useNavigationRoutes();

  return (
    <>
      <SafeAreaViewCustom>
        <PressableCustom onPress={chatNavigation.goBack}>
          <TextCustom text="sdasda" />
        </PressableCustom>
      </SafeAreaViewCustom>
    </>
  );
};

export default ChatListScreen;
