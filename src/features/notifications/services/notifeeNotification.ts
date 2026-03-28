import notifee, { AndroidImportance } from '@notifee/react-native';
import { RemoteMessage } from '@react-native-firebase/messaging';

export const notifeeNotification = async (remoteMessage: RemoteMessage) => {
  const { notification, data } = remoteMessage;

  if (notification) {
    await notifee.displayNotification({
      title: notification.title,
      body: notification.body,
      data,
      android: {
        channelId: 'fable_talk_default_channel',
        importance: AndroidImportance.HIGH,
        smallIcon: 'ic_stat_ic_notification',
        color: '#412668',
      },
    });
  }
};
