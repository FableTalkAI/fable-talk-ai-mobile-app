import { I18nextProvider } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import i18n from '@/core/configs/i18n.ts';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';
import RootNavigator from '@/navigation/RootNavigator';
import BottomWindowProvider from '@/core/providers/BottomWindowProvider';
import FirebaseProvider from '@/core/providers/FirebaseProvider/index.tsx';
import InitialSetup from '@/core/providers/InitialSetup/index.tsx';
import { toastConfig } from '@/core/configs/toast.tsx';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://4ffe32896b7fe3269b6f735bd476bbca@o4510449626578944.ingest.de.sentry.io/4510449632411728',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

function App() {
  return (
    <FirebaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <GestureHandlerRootView style={styles.flex1}>
              <BottomSheetModalProvider>
                <SafeAreaProvider>
                  <BottomWindowProvider>
                    <NavigationContainer>
                      <InitialSetup>
                        <RootNavigator />
                      </InitialSetup>
                    </NavigationContainer>
                  </BottomWindowProvider>

                  <Toast config={toastConfig} />
                </SafeAreaProvider>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </FirebaseProvider>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

export default Sentry.wrap(App);
