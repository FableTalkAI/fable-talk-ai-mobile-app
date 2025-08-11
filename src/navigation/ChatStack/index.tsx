import { createStackNavigator } from '@react-navigation/stack';

import ChatListScreen from '@/screens/main/ChatListScreen';
import ChatScreen from '@/screens/main/ChatScreen';

import { ChatStackParamList } from './types.ts';

const Stack = createStackNavigator<ChatStackParamList>();

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="ChatListScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
