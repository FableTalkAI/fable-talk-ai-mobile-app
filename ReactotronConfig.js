import Reactotron from 'reactotron-react-native';
import { NativeModules } from 'react-native';

let scriptHostname = 'localhost';

if (__DEV__) {
  const scriptURL = NativeModules.SourceCode?.scriptURL;
  if (scriptURL) {
    scriptHostname = scriptURL.split('://')[1].split(':')[0];
  }
}

Reactotron.configure({
  name: 'FableTalkAI',
  host: scriptHostname,
})
  .useReactNative({
    asyncStorage: true,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    errors: { veto: stackFrame => false },
    overlay: false,
  })
  .connect();

console.tron = Reactotron;
Reactotron.clear?.();

export default Reactotron;
