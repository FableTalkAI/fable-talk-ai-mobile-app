import { createStackNavigator } from '@react-navigation/stack';

import Man from '@/screens/Man.tsx';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Test" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Test" component={Man} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
