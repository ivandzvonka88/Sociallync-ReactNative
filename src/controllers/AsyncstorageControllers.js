import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorage = async (key, value, isObject = false) => {
  try {
    await AsyncStorage.setItem(key, isObject ? JSON.stringify(value) : value);
  } catch (e) {}
};

export const getAsyncStorage = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {}
};

export const clearAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {}
};




