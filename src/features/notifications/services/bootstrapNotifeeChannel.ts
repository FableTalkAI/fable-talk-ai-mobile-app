import notifee, { AndroidImportance } from '@notifee/react-native';

export const bootstrapNotifeeChannel = async () => {
  await notifee.createChannel({
    id: 'fable_talk_default_channel',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
};
