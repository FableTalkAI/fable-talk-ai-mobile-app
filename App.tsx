/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { I18nextProvider } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import RootNavigator from '@/navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import i18n from '@/core/configs/i18n.ts';

// TODO: separate to another directory
export type RootStackParamList = {
  Test: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <GestureHandlerRootView style={styles.flex1}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <RootNavigator />
            </NavigationContainer>

            <Toast />
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

export default App;
