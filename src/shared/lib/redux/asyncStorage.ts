import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorage = {
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null; // Parse the JSON string
  },
  setItem: async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value)); // Stringify the value
  },
  removeItem: async (key: string) => AsyncStorage.removeItem(key),
};

export default asyncStorage;
