import DeviceInfo from 'react-native-device-info';

export const getDeviceInfo = async () => {
  const deviceId = await DeviceInfo.getUniqueId();
  const deviceName = await DeviceInfo.getDeviceName();

  return {
    deviceId,
    deviceName,
  };
};
