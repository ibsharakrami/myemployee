import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFromCache = async (key) => {
  try {
    const cachedData = await AsyncStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error('Error getting data from cache:', error);
    return null;
  }
};

export const saveToCache = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to cache:', error);
  }
};
