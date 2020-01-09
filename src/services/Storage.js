import {AsyncStorage} from 'react-native';
const storage = {
  setItem: async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {}
  },
  getItem: async key => {
    let res = '';
    try {
      res = await AsyncStorage.getItem(key);
    } catch (error) {}
    return res;
  },
  removeItem: async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {}
  },
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {}
  },
};
export default storage;
