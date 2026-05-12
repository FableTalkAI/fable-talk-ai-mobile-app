import {  StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@/features/locales/i18n.ts';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FirebaseProvider from '@/app/providers/FirebaseProvider/index.tsx';
import InitialSetup from '@/app/providers/InitialSetup/index.tsx';
import * as Sentry from '@sentry/react-native';
import { toastConfig } from '@/features/overlay/lib/toastConfig';
import RootNavigator from '@/features/navigation/ui/RootNavigator';
import { persistor, store } from '@/app/store';
import OverlayProvider from '@/app/providers/OverlayProvider';
import NavigationProvider from '@/app/providers/NavigationProvider/index.tsx';
import AdsProvider from '@/app/providers/AdsProvider';


Sentry.init({
  dsn: 'https://4ffe32896b7fe3269b6f735bd476bbca@o4510449626578944.ingest.de.sentry.io/4510449632411728',
  sendDefaultPii: true,
  enableLogs: true,
});

function App() {
  return (
    <FirebaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={styles.flex1}>
            <BottomSheetModalProvider>
              <SafeAreaProvider>
                <NavigationProvider>
                  <OverlayProvider>
                    <InitialSetup>
                      <AdsProvider>
                        <RootNavigator />
                      </AdsProvider>
                    </InitialSetup>
                  </OverlayProvider>
                </NavigationProvider>

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
