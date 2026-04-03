import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@/features/locales/i18n.ts';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import BottomWindowProvider from '@/app/providers/BottomWindowProvider';
import FirebaseProvider from '@/app/providers/FirebaseProvider/index.tsx';
import InitialSetup from '@/app/providers/InitialSetup/index.tsx';
import * as Sentry from '@sentry/react-native';
import { toastConfig } from '@/shared/lib/toast/config.tsx';
import RootNavigator from '@/features/navigation/ui/RootNavigator';
import { persistor, store } from '@/app/store';
import { flushPendingNavigation, navigationRef } from '@/features/navigation/lib/navigationRef.ts';
import { useLayoutEffect } from 'react';
import useSubscriptionInitialization from '@/features/subscriptions/hooks/useSubscriptionInitialization.ts';

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
  useLayoutEffect(() => StatusBar.setTranslucent(true), []);

  return (
    <FirebaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={styles.flex1}>
            <BottomSheetModalProvider>
              <SafeAreaProvider>
                <NavigationContainer ref={navigationRef} onReady={flushPendingNavigation}>
                  <BottomWindowProvider>
                    <InitialSetup>
                      <RootNavigator />
                    </InitialSetup>
                  </BottomWindowProvider>
                </NavigationContainer>

                <Toast config={toastConfig} />
              </SafeAreaProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
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
