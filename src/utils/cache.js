import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFromCache = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error('Error getting data from cache', error);
  }
  return null;
};

export const saveToCache = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving data to cache', error);
  }
};
